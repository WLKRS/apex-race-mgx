import { PriceOracle } from '@/types/economy.types';

// Mock Price Oracle - simulates real-time price feeds
class MockPriceOracle {
  private prices: PriceOracle = {
    solUsd: 180.0, // Mock SOL price
    rcnUsd: 0.25, // Mock RCN price
    lastUpdate: Date.now(),
  };

  // Get current prices
  getPrices(): PriceOracle {
    return { ...this.prices };
  }

  // Convert USD to RCN
  usdToRcn(usdAmount: number): number {
    return usdAmount / this.prices.rcnUsd;
  }

  // Convert RCN to USD
  rcnToUsd(rcnAmount: number): number {
    return rcnAmount * this.prices.rcnUsd;
  }

  // Convert USD to SOL
  usdToSol(usdAmount: number): number {
    return usdAmount / this.prices.solUsd;
  }

  // Convert SOL to USD
  solToUsd(solAmount: number): number {
    return solAmount * this.prices.solUsd;
  }

  // Simulate price updates (for demo purposes)
  simulatePriceUpdate(): void {
    // Add small random fluctuations
    const solChange = (Math.random() - 0.5) * 2; // +/- $1
    const rcnChange = (Math.random() - 0.5) * 0.02; // +/- $0.01

    this.prices.solUsd = Math.max(150, Math.min(250, this.prices.solUsd + solChange));
    this.prices.rcnUsd = Math.max(0.1, Math.min(0.5, this.prices.rcnUsd + rcnChange));
    this.prices.lastUpdate = Date.now();
  }
}

export const priceOracle = new MockPriceOracle();

// Start price simulation (updates every 10 seconds)
if (typeof window !== 'undefined') {
  setInterval(() => {
    priceOracle.simulatePriceUpdate();
  }, 10000);
}