import { CarNFT, CarRarity, Material, MaterialTier } from '@/types/game.types';
import { UserProfile, UserInventory, UserStats } from '@/types/user.types';

// Mock Car Data
export const MOCK_CARS: CarNFT[] = [
  {
    id: 'car-001',
    name: 'Thunder Bolt',
    rarity: CarRarity.LEGENDARY,
    attributes: { acceleration: 8, technology: 7, trunk: 6, control: 7 },
    imageUrl: '/images/photo1763743637.jpg',
    fuelLevel: 100,
    maintenanceDue: 0,
  },
  {
    id: 'car-002',
    name: 'Street Racer',
    rarity: CarRarity.EPIC,
    attributes: { acceleration: 6, technology: 6, trunk: 5, control: 6 },
    imageUrl: '/images/photo1763743637.jpg',
    fuelLevel: 80,
    maintenanceDue: 1.5,
  },
  {
    id: 'car-003',
    name: 'City Cruiser',
    rarity: CarRarity.RARE,
    attributes: { acceleration: 4, technology: 5, trunk: 6, control: 4 },
    imageUrl: '/images/photo1763743637.jpg',
    fuelLevel: 60,
    maintenanceDue: 0,
  },
];

// Mock Materials
export const MOCK_MATERIALS: Material[] = [
  { id: 'mat-001', name: 'Ligas de Aço', tier: MaterialTier.RAW, quantity: 45, imageUrl: '/images/photo1763743637.jpg' },
  { id: 'mat-002', name: 'Chips Eletrônicos', tier: MaterialTier.RAW, quantity: 32, imageUrl: '/images/photo1763743637.jpg' },
  { id: 'mat-003', name: 'Peça de Motor T1', tier: MaterialTier.TIER1, quantity: 8, imageUrl: '/images/photo1763743637.jpg' },
  { id: 'mat-004', name: 'Peça de Motor T2', tier: MaterialTier.TIER2, quantity: 3, imageUrl: '/images/photo1763743637.jpg' },
];

// Mock User Profile
export const MOCK_USER: UserProfile = {
  walletAddress: '7xKX...9pQm',
  username: 'RacerPro',
  garageLevel: 3,
  totalRaces: 487,
  totalEarningsRCN: 12450,
  totalEarningsUSD: 3112.5,
  referralCode: 'RACER2024',
  createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
};

// Mock User Inventory
export const MOCK_INVENTORY: UserInventory = {
  cars: MOCK_CARS,
  materials: MOCK_MATERIALS,
  rcnBalance: 2450.75,
  solBalance: 12.5,
};

// Mock User Stats
export const MOCK_USER_STATS: UserStats = {
  todayRaces: 18,
  todayEarnings: 45.8,
  refillsUsed: 2,
  refillsAvailable: 1,
  nextResetTime: new Date().setHours(24, 0, 0, 0),
};

// Generate random car for minting
export function generateRandomCar(): CarNFT {
  const rarities = Object.values(CarRarity);
  const weights = [45, 25, 15, 8, 4, 2, 1]; // Distribution percentages
  
  const random = Math.random() * 100;
  let selectedRarity = CarRarity.COMMON;
  let cumulative = 0;
  
  for (let i = 0; i < rarities.length; i++) {
    cumulative += weights[i];
    if (random <= cumulative) {
      selectedRarity = rarities[i];
      break;
    }
  }
  
  const baseLevel = {
    [CarRarity.COMMON]: 1,
    [CarRarity.UNCOMMON]: 2,
    [CarRarity.RARE]: 3,
    [CarRarity.SUPER_RARE]: 4,
    [CarRarity.EPIC]: 5,
    [CarRarity.LEGENDARY]: 6,
    [CarRarity.MYTHIC]: 7,
  }[selectedRarity];
  
  return {
    id: `car-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: `${selectedRarity} Racer #${Math.floor(Math.random() * 9999)}`,
    rarity: selectedRarity,
    attributes: {
      acceleration: baseLevel + Math.floor(Math.random() * 2),
      technology: baseLevel + Math.floor(Math.random() * 2),
      trunk: baseLevel + Math.floor(Math.random() * 2),
      control: baseLevel + Math.floor(Math.random() * 2),
    },
    imageUrl: '/images/photo1763743637.jpg',
    fuelLevel: 100,
    maintenanceDue: 0,
  };
}