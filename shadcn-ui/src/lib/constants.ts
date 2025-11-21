import { CarRarity, RaceType, MaterialTier, GarageLevel } from '@/types/game.types';
import { StakingTier, TokenomicsAllocation } from '@/types/economy.types';

// Game Constants
export const MINT_PRICE_USD = 25;
export const FREIGHT_FEE_USD = 5;
export const FREIGHT_WAIT_HOURS = 24;
export const RACE_COOLDOWN_MINUTES = 5;
export const MAINTENANCE_COST_PER_RACE = 0.15;
export const FUEL_COST_PER_REFILL = 1.5;
export const PROTOCOL_FEE_SOL = 0.0005;

// Rarity Distribution
export const RARITY_DISTRIBUTION = {
  [CarRarity.COMMON]: { percentage: 45, quantity: 22500, baseLevel: 1 },
  [CarRarity.UNCOMMON]: { percentage: 25, quantity: 12500, baseLevel: 2 },
  [CarRarity.RARE]: { percentage: 15, quantity: 7500, baseLevel: 3 },
  [CarRarity.SUPER_RARE]: { percentage: 8, quantity: 4000, baseLevel: 4 },
  [CarRarity.EPIC]: { percentage: 4, quantity: 2000, baseLevel: 5 },
  [CarRarity.LEGENDARY]: { percentage: 2, quantity: 1000, baseLevel: 6 },
  [CarRarity.MYTHIC]: { percentage: 1, quantity: 500, baseLevel: 7 },
};

// Technology Attribute -> Races per Tank
export const TECH_RACES_MAP: Record<number, number> = {
  1: 10, 2: 10, 3: 11, 4: 12, 5: 13,
  6: 14, 7: 15, 8: 17, 9: 19, 10: 21,
};

// Race Type Rewards
export const RACE_REWARDS = {
  [RaceType.DRAG]: { rcnPercent: 95, materialChance: 5 },
  [RaceType.STREET]: { rcnPercent: 50, materialChance: 50 },
  [RaceType.SCAVENGE]: { rcnPercent: 5, materialChance: 95 },
};

// ROI Table (Base stats, daily dedicated player)
export const ROI_TABLE = {
  [CarRarity.COMMON]: { dailyRaces: 20, grossDaily: 8.12, costDaily: 6.04, netDaily: 2.08, roiDays: 12 },
  [CarRarity.UNCOMMON]: { dailyRaces: 20, grossDaily: 8.54, costDaily: 6.04, netDaily: 2.50, roiDays: 10 },
  [CarRarity.RARE]: { dailyRaces: 22, grossDaily: 9.17, costDaily: 6.43, netDaily: 2.74, roiDays: 9 },
  [CarRarity.SUPER_RARE]: { dailyRaces: 24, grossDaily: 10.20, costDaily: 6.82, netDaily: 3.38, roiDays: 7.4 },
  [CarRarity.EPIC]: { dailyRaces: 26, grossDaily: 12.31, costDaily: 7.21, netDaily: 5.10, roiDays: 4.9 },
  [CarRarity.LEGENDARY]: { dailyRaces: 30, grossDaily: 18.60, costDaily: 8.38, netDaily: 10.22, roiDays: 2.4 },
  [CarRarity.MYTHIC]: { dailyRaces: 34, grossDaily: 31.08, costDaily: 9.55, netDaily: 21.53, roiDays: 1.16 },
};

// Garage Levels
export const GARAGE_LEVELS: GarageLevel[] = [
  { level: 1, slots: 1, dailyRefills: 1, upgradeCostRCN: 0 },
  { level: 2, slots: 2, dailyRefills: 2, upgradeCostRCN: 50 },
  { level: 3, slots: 3, dailyRefills: 3, upgradeCostRCN: 150 },
  { level: 4, slots: 5, dailyRefills: 4, upgradeCostRCN: 300 },
  { level: 5, slots: 8, dailyRefills: 5, upgradeCostRCN: 500 },
  { level: 6, slots: 12, dailyRefills: 6, upgradeCostRCN: 800 },
  { level: 7, slots: 16, dailyRefills: 7, upgradeCostRCN: 1200 },
  { level: 8, slots: 20, dailyRefills: 8, upgradeCostRCN: 1800 },
];

// Tokenomics
export const TOTAL_SUPPLY = 1_000_000_000;
export const TOKENOMICS: TokenomicsAllocation[] = [
  { category: 'Recompensas P2E', percentage: 55, amount: 550_000_000, description: 'Reserva de longo prazo para recompensas' },
  { category: 'Pool de Liquidez', percentage: 10, amount: 100_000_000, description: 'Liquidez inicial na DEX' },
  { category: 'Fundo do Ecossistema', percentage: 15, amount: 150_000_000, description: 'Novas funcionalidades e parcerias' },
  { category: 'Tesouraria Operacional', percentage: 5, amount: 50_000_000, description: 'Custos operacionais' },
  { category: 'Time', percentage: 5, amount: 50_000_000, description: 'Equipe com vesting' },
  { category: 'Marketing & Airdrops', percentage: 5, amount: 50_000_000, description: 'Campanhas e atração' },
];

// Staking Tiers
export const STAKING_TIERS: StakingTier[] = [
  { lockPeriod: 'Flexível', multiplier: 1, description: 'Sem bloqueio' },
  { lockPeriod: '3 Meses', multiplier: 1.5, description: '90 dias' },
  { lockPeriod: '6 Meses', multiplier: 2.2, description: '180 dias' },
  { lockPeriod: '12 Meses', multiplier: 4, description: '365 dias' },
];

// Fee Distribution
export const FEE_DISTRIBUTION = {
  referral: 10, // 10% to referrer
  burned: 60, // 60% burned
  p2ePool: 25, // 25% back to P2E pool
  stakers: 10, // 10% to stakers
  bugBounty: 5, // 5% to bug bounty
};

// Marketplace Fees
export const MARKETPLACE_FEES = {
  nft: {
    listingFeeSOL: 0.02,
    transactionFeePercent: 5,
    transactionFeeRCNPercent: 3,
    transactionFeeSOLPercent: 2,
  },
  items: {
    listingFeeRCN: 1,
    serviceFeeSOL: 0.0005,
  },
};

// Crafting Costs
export const CRAFTING_COSTS = {
  [MaterialTier.TIER1]: { inputQty: 5, rcnCost: 2 },
  [MaterialTier.TIER2]: { inputQty: 3, rcnCost: 5 },
  [MaterialTier.TIER3]: { inputQty: 3, rcnCost: 15 },
  [MaterialTier.TIER4]: { inputQty: 3, rcnCost: 50 },
};