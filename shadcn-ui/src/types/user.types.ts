import { CarNFT, Material } from './game.types';

export interface UserProfile {
  walletAddress: string;
  username?: string;
  garageLevel: number;
  totalRaces: number;
  totalEarningsRCN: number;
  totalEarningsUSD: number;
  referralCode: string;
  referredBy?: string;
  createdAt: number;
}

export interface UserInventory {
  cars: CarNFT[];
  materials: Material[];
  rcnBalance: number;
  solBalance: number;
}

export interface UserStats {
  todayRaces: number;
  todayEarnings: number;
  refillsUsed: number;
  refillsAvailable: number;
  nextResetTime: number;
}

export interface StakingPosition {
  id: string;
  amount: number;
  lockPeriod: string;
  multiplier: number;
  stakedAt: number;
  unlocksAt: number;
  earnedRCN: number;
  earnedSOL: number;
}