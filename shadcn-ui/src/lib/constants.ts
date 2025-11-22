// ==========================================
// ARQUIVO: src/lib/constants.ts (SUBSTITUA)
// ==========================================

import { CarRarity, RaceType, MaterialTier, GarageLevel } from '@/types/game.types';
import { StakingTier, TokenomicsAllocation } from '@/types/economy.types';

// ==========================================
// CONSTANTES DO JOGO (BASEADO NO WHITEPAPER)
// ==========================================

export const MINT_PRICE_USD = 25;
export const FREIGHT_FEE_USD = 5;
export const FREIGHT_WAIT_HOURS = 24;
export const RACE_COOLDOWN_MINUTES = 5;
export const MAINTENANCE_COST_PER_RACE = 0.15; // $0.15 por corrida
export const FUEL_COST_PER_REFILL = 1.50;      // $1.50 por reabastecimento
export const PROTOCOL_FEE_SOL = 0.0005;

// ==========================================
// SISTEMA DE ATRIBUTOS (1-100)
// ==========================================

// Atributos base por raridade
export const RARITY_DISTRIBUTION = {
  [CarRarity.COMMON]: { percentage: 45, quantity: 22500, baseMin: 10, baseMax: 20 },
  [CarRarity.UNCOMMON]: { percentage: 25, quantity: 12500, baseMin: 20, baseMax: 30 },
  [CarRarity.RARE]: { percentage: 15, quantity: 7500, baseMin: 30, baseMax: 40 },
  [CarRarity.SUPER_RARE]: { percentage: 8, quantity: 4000, baseMin: 40, baseMax: 50 },
  [CarRarity.EPIC]: { percentage: 4, quantity: 2000, baseMin: 50, baseMax: 60 },
  [CarRarity.LEGENDARY]: { percentage: 2, quantity: 1000, baseMin: 60, baseMax: 70 },
  [CarRarity.MYTHIC]: { percentage: 1, quantity: 500, baseMin: 65, baseMax: 70 },
};

// ==========================================
// SISTEMA DE TECNOLOGIA -> CORRIDAS POR TANQUE
// ==========================================
// Baseado no whitepaper: Technology Level -> Races per Tank

export function getRacesPerTank(technologyAttribute: number): number {
  // Converte atributo (1-100) para corridas por tanque (10-21)
  if (technologyAttribute <= 20) return 10;
  if (technologyAttribute <= 30) return 11;
  if (technologyAttribute <= 40) return 12;
  if (technologyAttribute <= 50) return 13;
  if (technologyAttribute <= 60) return 14;
  if (technologyAttribute <= 70) return 15;
  if (technologyAttribute <= 80) return 17;
  if (technologyAttribute <= 90) return 19;
  return 21; // 91-100
}

// Tabela do whitepaper para referência
export const TECH_RACES_TABLE = [
  { techRange: '1-20', races: 10 },
  { techRange: '21-30', races: 11 },
  { techRange: '31-40', races: 12 },
  { techRange: '41-50', races: 13 },
  { techRange: '51-60', races: 14 },
  { techRange: '61-70', races: 15 },
  { techRange: '71-80', races: 17 },
  { techRange: '81-90', races: 19 },
  { techRange: '91-100', races: 21 },
];

// ==========================================
// RECOMPENSAS POR TIPO DE CORRIDA
// ==========================================

export const RACE_REWARDS = {
  [RaceType.DRAG]: { rcnPercent: 95, materialChance: 5 },
  [RaceType.STREET]: { rcnPercent: 50, materialChance: 50 },
  [RaceType.SCAVENGE]: { rcnPercent: 5, materialChance: 95 },
};

// ==========================================
// ROI TABLE (Baseado no Whitepaper)
// ==========================================

export const ROI_TABLE = {
  [CarRarity.COMMON]: { dailyRaces: 20, grossDaily: 8.12, costDaily: 6.04, netDaily: 2.08, roiDays: 12 },
  [CarRarity.UNCOMMON]: { dailyRaces: 20, grossDaily: 8.54, costDaily: 6.04, netDaily: 2.50, roiDays: 10 },
  [CarRarity.RARE]: { dailyRaces: 22, grossDaily: 9.17, costDaily: 6.43, netDaily: 2.74, roiDays: 9 },
  [CarRarity.SUPER_RARE]: { dailyRaces: 24, grossDaily: 10.20, costDaily: 6.82, netDaily: 3.38, roiDays: 7.4 },
  [CarRarity.EPIC]: { dailyRaces: 26, grossDaily: 12.31, costDaily: 7.21, netDaily: 5.10, roiDays: 4.9 },
  [CarRarity.LEGENDARY]: { dailyRaces: 30, grossDaily: 18.60, costDaily: 8.38, netDaily: 10.22, roiDays: 2.4 },
  [CarRarity.MYTHIC]: { dailyRaces: 34, grossDaily: 31.08, costDaily: 9.55, netDaily: 21.53, roiDays: 1.16 },
};

// ==========================================
// NÍVEIS DE GARAGEM
// ==========================================

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

// ==========================================
// TOKENOMICS
// ==========================================

export const TOTAL_SUPPLY = 1_000_000_000;
export const TOKENOMICS: TokenomicsAllocation[] = [
  { category: 'Recompensas P2E', percentage: 55, amount: 550_000_000, description: 'Reserva de longo prazo para recompensas' },
  { category: 'Pool de Liquidez', percentage: 10, amount: 100_000_000, description: 'Liquidez inicial na DEX' },
  { category: 'Fundo do Ecossistema', percentage: 15, amount: 150_000_000, description: 'Novas funcionalidades e parcerias' },
  { category: 'Tesouraria Operacional', percentage: 5, amount: 50_000_000, description: 'Custos operacionais' },
  { category: 'Time', percentage: 5, amount: 50_000_000, description: 'Equipe com vesting' },
  { category: 'Marketing & Airdrops', percentage: 5, amount: 50_000_000, description: 'Campanhas e atração' },
];

// ==========================================
// STAKING
// ==========================================

export const STAKING_TIERS: StakingTier[] = [
  { lockPeriod: 'Flexível', multiplier: 1, description: 'Sem bloqueio' },
  { lockPeriod: '3 Meses', multiplier: 1.5, description: '90 dias' },
  { lockPeriod: '6 Meses', multiplier: 2.2, description: '180 dias' },
  { lockPeriod: '12 Meses', multiplier: 4, description: '365 dias' },
];

// ==========================================
// DISTRIBUIÇÃO DE TAXAS
// ==========================================

export const FEE_DISTRIBUTION = {
  referral: 10,   // 10% para quem indicou
  burned: 60,     // 60% queimados
  p2ePool: 25,    // 25% volta para recompensas
  stakers: 10,    // 10% para stakers
  bugBounty: 5,   // 5% para bug bounty
};

// ==========================================
// TAXAS DO MARKETPLACE
// ==========================================

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

// ==========================================
// CUSTOS DE CRAFTING
// ==========================================

export const CRAFTING_COSTS = {
  [MaterialTier.TIER1]: { inputQty: 5, rcnCost: 2 },
  [MaterialTier.TIER2]: { inputQty: 3, rcnCost: 5 },
  [MaterialTier.TIER3]: { inputQty: 3, rcnCost: 15 },
  [MaterialTier.TIER4]: { inputQty: 3, rcnCost: 50 },
};