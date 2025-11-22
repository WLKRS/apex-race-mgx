import { CarNFT, RaceType, RaceResult, MaterialTier, Material } from '@/types/game.types';
import { RACE_REWARDS, MAINTENANCE_COST_PER_RACE, getRacesPerTank } from './constants';

// Calculate race reward based on car attributes and race type
export function calculateRaceReward(car: CarNFT, raceType: RaceType): RaceResult {
  const baseReward = 0.4; // Base USD reward
  const accelerationMultiplier = 1 + (car.attributes.acceleration - 1) * 0.15;
  const totalReward = baseReward * accelerationMultiplier;
  
  const raceConfig = RACE_REWARDS[raceType];
  const rcnEarned = (totalReward * raceConfig.rcnPercent) / 100;
  
  // Material drop chance based on trunk attribute
  const materialDropChance = (raceConfig.materialChance / 100) * (1 + car.attributes.trunk * 0.1);
  const materialsDropped = Math.random() < materialDropChance ? generateMaterialDrop(car.attributes.trunk) : [];
  
  const fuelConsumed = 100 / getRacesPerTank[car.attributes.technology];
  const maintenanceAdded = MAINTENANCE_COST_PER_RACE;
  
  return {
    success: true,
    rcnEarned,
    materialsDropped,
    fuelConsumed,
    maintenanceAdded,
  };
}

// Generate material drop based on trunk level
function generateMaterialDrop(trunkLevel: number): Material[] {
  const dropCount = Math.floor(Math.random() * trunkLevel) + 1;
  const materials: Material[] = [];
  
  for (let i = 0; i < dropCount; i++) {
    const tierChance = Math.random();
    let tier = MaterialTier.RAW;
    
    if (tierChance < 0.05 && trunkLevel >= 8) tier = MaterialTier.TIER3;
    else if (tierChance < 0.15 && trunkLevel >= 6) tier = MaterialTier.TIER2;
    else if (tierChance < 0.35 && trunkLevel >= 4) tier = MaterialTier.TIER1;
    
    materials.push({
      id: `mat-${Date.now()}-${i}`,
      name: `Material ${tier}`,
      tier,
      quantity: 1,
      imageUrl: '/images/photo1763743619.jpg',
    });
  }
  
  return materials;
}

// Calculate ROI for a car
export function calculateROI(car: CarNFT, mintPrice: number): number {
  const dailyRaces = getRacesPerTank[car.attributes.technology];
  const rewardPerRace = 0.4 * (1 + (car.attributes.acceleration - 1) * 0.15) * 0.95; // Drag race
  const dailyGross = rewardPerRace * dailyRaces;
  const dailyCost = (MAINTENANCE_COST_PER_RACE * dailyRaces) + 1.5; // maintenance + fuel
  const dailyNet = dailyGross - dailyCost;
  
  return dailyNet > 0 ? mintPrice / dailyNet : Infinity;
}

// Calculate upgrade cost for attribute
export function calculateUpgradeCost(currentLevel: number): number {
  const baseCost = 10;
  return baseCost * Math.pow(2, currentLevel - 1);
}

// Calculate crafting cost
export function calculateCraftingCost(tier: MaterialTier): { inputQty: number; rcnCost: number } {
  const costs = {
    [MaterialTier.RAW]: { inputQty: 0, rcnCost: 0 },
    [MaterialTier.TIER1]: { inputQty: 5, rcnCost: 2 },
    [MaterialTier.TIER2]: { inputQty: 3, rcnCost: 5 },
    [MaterialTier.TIER3]: { inputQty: 3, rcnCost: 15 },
    [MaterialTier.TIER4]: { inputQty: 3, rcnCost: 50 },
  };
  
  return costs[tier];
}

// Calculate time until next daily reset (00:00 UTC)
export function getTimeUntilReset(): number {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setUTCHours(24, 0, 0, 0);
  return tomorrow.getTime() - now.getTime();
}

// Check if car is on cooldown
export function isCarOnCooldown(car: CarNFT): boolean {
  if (!car.cooldownEndsAt) return false;
  return Date.now() < car.cooldownEndsAt;
}

// Get remaining cooldown time in seconds
export function getRemainingCooldown(car: CarNFT): number {
  if (!car.cooldownEndsAt) return 0;
  const remaining = Math.max(0, car.cooldownEndsAt - Date.now());
  return Math.ceil(remaining / 1000);
}