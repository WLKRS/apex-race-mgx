import { create } from 'zustand';

interface WalletState {
  connected: boolean;
  address: string | null;
  balance: number;
  
  connect: (address: string) => void;
  disconnect: () => void;
  updateBalance: (balance: number) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  connected: false,
  address: null,
  balance: 0,
  
  connect: (address) => set({ connected: true, address, balance: 12.5 }),
  disconnect: () => set({ connected: false, address: null, balance: 0 }),
  updateBalance: (balance) => set({ balance }),
}));