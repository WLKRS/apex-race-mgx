import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CarNFT, Material, RaceType, RaceResult } from '@/types/game.types';
import { UserProfile, UserInventory, UserStats, StakingPosition } from '@/types/user.types';
import { Transaction, ReferralStats } from '@/types/economy.types';
import { MOCK_USER, MOCK_INVENTORY, MOCK_USER_STATS } from '@/lib/mockData';
import { calculateRaceReward, getTimeUntilReset } from '@/lib/calculations';
import { RACE_COOLDOWN_MINUTES, FUEL_COST_PER_REFILL } from '@/lib/constants';

interface GameState {
  // User Data
  user: UserProfile | null;
  inventory: UserInventory;
  stats: UserStats;
  transactions: Transaction[];
  stakingPositions: StakingPosition[];
  referralStats: ReferralStats | null;

  // Actions
  setUser: (user: UserProfile | null) => void;
  updateInventory: (inventory: Partial<UserInventory>) => void;
  
  // Race Actions
  startRace: (carId: string, raceType: RaceType) => Promise<RaceResult>;
  refuelCar: (carId: string) => boolean;
  performMaintenance: (carId: string) => boolean;
  
  // Crafting Actions
  craftMaterial: (inputMaterialId: string, outputTier: string) => boolean;
  
  // Garage Actions
  upgradeGarage: () => boolean;
  upgradeCarAttribute: (carId: string, attribute: string) => boolean;
  
  // Marketplace Actions
  listCarForSale: (carId: string, price: number) => boolean;
  buyCar: (carId: string) => boolean;
  
  // Staking Actions
  stakeTokens: (amount: number, lockPeriod: string) => boolean;
  unstakeTokens: (positionId: string) => boolean;
  
  // Utility
  addTransaction: (transaction: Transaction) => void;
  resetDailyStats: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Initial State
      user: MOCK_USER,
      inventory: MOCK_INVENTORY,
      stats: MOCK_USER_STATS,
      transactions: [],
      stakingPositions: [],
      referralStats: {
        code: MOCK_USER.referralCode,
        referrals: 12,
        totalCommissionRCN: 245.5,
        activeReferrals: 8,
      },

      // Set User
      setUser: (user) => set({ user }),

      // Update Inventory
      updateInventory: (updates) =>
        set((state) => ({
          inventory: { ...state.inventory, ...updates },
        })),

      // Start Race
      startRace: async (carId, raceType) => {
        const state = get();
        const car = state.inventory.cars.find((c) => c.id === carId);

        if (!car) throw new Error('Carro não encontrado');
        if (car.fuelLevel < 10) throw new Error('Combustível insuficiente');
        if (car.cooldownEndsAt && Date.now() < car.cooldownEndsAt) {
          throw new Error('Carro em cooldown');
        }

        // Calculate race result
        const result = calculateRaceReward(car, raceType);

        // Update car state
        const updatedCars = state.inventory.cars.map((c) => {
          if (c.id === carId) {
            return {
              ...c,
              fuelLevel: Math.max(0, c.fuelLevel - result.fuelConsumed),
              maintenanceDue: c.maintenanceDue + result.maintenanceAdded,
              lastRaceTime: Date.now(),
              cooldownEndsAt: Date.now() + RACE_COOLDOWN_MINUTES * 60 * 1000,
            };
          }
          return c;
        });

        // Update inventory
        set((state) => ({
          inventory: {
            ...state.inventory,
            cars: updatedCars,
            rcnBalance: state.inventory.rcnBalance + result.rcnEarned,
            materials: [...state.inventory.materials, ...result.materialsDropped],
          },
          stats: {
            ...state.stats,
            todayRaces: state.stats.todayRaces + 1,
            todayEarnings: state.stats.todayEarnings + result.rcnEarned,
          },
        }));

        // Add transaction
        get().addTransaction({
          id: `tx-${Date.now()}`,
          type: 'race',
          amount: result.rcnEarned,
          token: 'RCN',
          timestamp: Date.now(),
          description: `Corrida ${raceType} concluída`,
        });

        return result;
      },

      // Refuel Car
      refuelCar: (carId) => {
        const state = get();
        const car = state.inventory.cars.find((c) => c.id === carId);

        if (!car) return false;
        if (car.maintenanceDue > 0) return false; // Must do maintenance first
        if (state.stats.refillsUsed >= state.stats.refillsAvailable) return false;
        if (state.inventory.rcnBalance < FUEL_COST_PER_REFILL) return false;

        const updatedCars = state.inventory.cars.map((c) =>
          c.id === carId ? { ...c, fuelLevel: 100 } : c
        );

        set((state) => ({
          inventory: {
            ...state.inventory,
            cars: updatedCars,
            rcnBalance: state.inventory.rcnBalance - FUEL_COST_PER_REFILL,
          },
          stats: {
            ...state.stats,
            refillsUsed: state.stats.refillsUsed + 1,
          },
        }));

        get().addTransaction({
          id: `tx-${Date.now()}`,
          type: 'fuel',
          amount: FUEL_COST_PER_REFILL,
          token: 'RCN',
          timestamp: Date.now(),
          description: `Reabastecimento de ${car.name}`,
        });

        return true;
      },

      // Perform Maintenance
      performMaintenance: (carId) => {
        const state = get();
        const car = state.inventory.cars.find((c) => c.id === carId);

        if (!car || car.maintenanceDue === 0) return false;
        if (state.inventory.rcnBalance < car.maintenanceDue) return false;

        const updatedCars = state.inventory.cars.map((c) =>
          c.id === carId ? { ...c, maintenanceDue: 0 } : c
        );

        set((state) => ({
          inventory: {
            ...state.inventory,
            cars: updatedCars,
            rcnBalance: state.inventory.rcnBalance - car.maintenanceDue,
          },
        }));

        get().addTransaction({
          id: `tx-${Date.now()}`,
          type: 'maintenance',
          amount: car.maintenanceDue,
          token: 'RCN',
          timestamp: Date.now(),
          description: `Manutenção de ${car.name}`,
        });

        return true;
      },

      // Craft Material
      craftMaterial: (inputMaterialId, outputTier) => {
        // Simplified crafting logic
        const state = get();
        const material = state.inventory.materials.find((m) => m.id === inputMaterialId);

        if (!material || material.quantity < 5) return false;

        const rcnCost = 2; // Simplified
        if (state.inventory.rcnBalance < rcnCost) return false;

        // Update materials
        const updatedMaterials = state.inventory.materials.map((m) =>
          m.id === inputMaterialId ? { ...m, quantity: m.quantity - 5 } : m
        );

        set((state) => ({
          inventory: {
            ...state.inventory,
            materials: updatedMaterials,
            rcnBalance: state.inventory.rcnBalance - rcnCost,
          },
        }));

        return true;
      },

      // Upgrade Garage
      upgradeGarage: () => {
        const state = get();
        const upgradeCost = 100; // Simplified

        if (state.inventory.rcnBalance < upgradeCost) return false;

        set((state) => ({
          user: state.user ? { ...state.user, garageLevel: state.user.garageLevel + 1 } : null,
          inventory: {
            ...state.inventory,
            rcnBalance: state.inventory.rcnBalance - upgradeCost,
          },
        }));

        return true;
      },

      // Upgrade Car Attribute
      upgradeCarAttribute: (carId, attribute) => {
        const state = get();
        const car = state.inventory.cars.find((c) => c.id === carId);

        if (!car) return false;

        const upgradeCost = 50; // Simplified
        if (state.inventory.rcnBalance < upgradeCost) return false;

        const updatedCars = state.inventory.cars.map((c) => {
          if (c.id === carId) {
            const attrs = { ...c.attributes };
            if (attribute in attrs && attrs[attribute as keyof typeof attrs] < 10) {
              attrs[attribute as keyof typeof attrs]++;
            }
            return { ...c, attributes: attrs };
          }
          return c;
        });

        set((state) => ({
          inventory: {
            ...state.inventory,
            cars: updatedCars,
            rcnBalance: state.inventory.rcnBalance - upgradeCost,
          },
        }));

        return true;
      },

      // List Car for Sale
      listCarForSale: (carId, price) => {
        // Mock implementation
        return true;
      },

      // Buy Car
      buyCar: (carId) => {
        // Mock implementation
        return true;
      },

      // Stake Tokens
      stakeTokens: (amount, lockPeriod) => {
        const state = get();
        if (state.inventory.rcnBalance < amount) return false;

        const multipliers: Record<string, number> = {
          'Flexível': 1,
          '3 Meses': 1.5,
          '6 Meses': 2.2,
          '12 Meses': 4,
        };

        const lockDurations: Record<string, number> = {
          'Flexível': 0,
          '3 Meses': 90 * 24 * 60 * 60 * 1000,
          '6 Meses': 180 * 24 * 60 * 60 * 1000,
          '12 Meses': 365 * 24 * 60 * 60 * 1000,
        };

        const newPosition: StakingPosition = {
          id: `stake-${Date.now()}`,
          amount,
          lockPeriod,
          multiplier: multipliers[lockPeriod],
          stakedAt: Date.now(),
          unlocksAt: Date.now() + lockDurations[lockPeriod],
          earnedRCN: 0,
          earnedSOL: 0,
        };

        set((state) => ({
          inventory: {
            ...state.inventory,
            rcnBalance: state.inventory.rcnBalance - amount,
          },
          stakingPositions: [...state.stakingPositions, newPosition],
        }));

        return true;
      },

      // Unstake Tokens
      unstakeTokens: (positionId) => {
        const state = get();
        const position = state.stakingPositions.find((p) => p.id === positionId);

        if (!position) return false;
        if (Date.now() < position.unlocksAt) return false;

        set((state) => ({
          inventory: {
            ...state.inventory,
            rcnBalance: state.inventory.rcnBalance + position.amount + position.earnedRCN,
            solBalance: state.inventory.solBalance + position.earnedSOL,
          },
          stakingPositions: state.stakingPositions.filter((p) => p.id !== positionId),
        }));

        return true;
      },

      // Add Transaction
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [transaction, ...state.transactions].slice(0, 100), // Keep last 100
        })),

      // Reset Daily Stats
      resetDailyStats: () =>
        set((state) => ({
          stats: {
            ...state.stats,
            todayRaces: 0,
            todayEarnings: 0,
            refillsUsed: 0,
            nextResetTime: Date.now() + getTimeUntilReset(),
          },
        })),
    }),
    {
      name: 'apex-racers-game-storage',
    }
  )
);