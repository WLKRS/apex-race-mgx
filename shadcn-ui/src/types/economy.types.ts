export interface TokenomicsAllocation {
  category: string;
  percentage: number;
  amount: number;
  description: string;
}

export interface StakingTier {
  lockPeriod: string;
  multiplier: number;
  description: string;
}

export interface PriceOracle {
  solUsd: number;
  rcnUsd: number;
  lastUpdate: number;
}

export interface Transaction {
  id: string;
  type: 'race' | 'mint' | 'craft' | 'maintenance' | 'fuel' | 'upgrade' | 'marketplace';
  amount: number;
  token: 'RCN' | 'SOL';
  timestamp: number;
  description: string;
}

export interface RewardDistribution {
  burned: number; // 60%
  p2ePool: number; // 25%
  stakers: number; // 10%
  bugBounty: number; // 5%
}

export interface ReferralStats {
  code: string;
  referrals: number;
  totalCommissionRCN: number;
  activeReferrals: number;
}
