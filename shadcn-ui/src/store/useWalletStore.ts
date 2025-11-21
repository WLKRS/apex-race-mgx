// ==========================================
// ARQUIVO: src/store/useWalletStore.ts (SUBSTITUA)
// ==========================================

import { create } from 'zustand';
import { PublicKey } from '@solana/web3.js';

interface WalletState {
  // Estado da carteira
  connected: boolean;
  address: string | null;
  publicKey: PublicKey | null;
  solBalance: number;
  rcnBalance: number;
  
  // Ações
  setConnected: (connected: boolean, address?: string, publicKey?: PublicKey) => void;
  setSolBalance: (balance: number) => void;
  setRcnBalance: (balance: number) => void;
  disconnect: () => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  connected: false,
  address: null,
  publicKey: null,
  solBalance: 0,
  rcnBalance: 0,
  
  setConnected: (connected, address, publicKey) => 
    set({ 
      connected, 
      address: address || null,
      publicKey: publicKey || null,
    }),
  
  setSolBalance: (solBalance) => set({ solBalance }),
  
  setRcnBalance: (rcnBalance) => set({ rcnBalance }),
  
  disconnect: () => 
    set({ 
      connected: false, 
      address: null, 
      publicKey: null,
      solBalance: 0,
      rcnBalance: 0,
    }),
}));