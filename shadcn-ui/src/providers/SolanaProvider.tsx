// ==========================================
// ARQUIVO: src/providers/SolanaProvider.tsx
// ==========================================
// Crie este arquivo novo na pasta src/providers/

import { FC, ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { 
  PhantomWalletAdapter, 
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

// IMPORTANTE: Importe os estilos do modal
import '@solana/wallet-adapter-react-ui/styles.css';

// ==========================================
// CONFIGURAÇÃO
// ==========================================

// ==========================================
// CONFIGURAÇÃO DE RPC
// ==========================================
// O RPC público da Solana frequentemente bloqueia requisições.
// Use um dos RPCs gratuitos abaixo ou contrate um pago.

// OPÇÕES DE RPC GRATUITOS (escolha um):
const RPC_OPTIONS = {
  // Helius (gratuito até 100k req/dia) - RECOMENDADO
  helius: 'https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY',
  
  // Quicknode público
  quicknode: 'https://solana-mainnet.core.chainstack.com/YOUR_KEY',
  
  // Alchemy
  alchemy: 'https://solana-mainnet.g.alchemy.com/v2/YOUR_KEY',
  
  // RPCs públicos (podem ter rate limit)
  publicNode: 'https://solana-rpc.publicnode.com',
  ankr: 'https://rpc.ankr.com/solana',
  
  // Devnet para testes
  devnet: 'https://api.devnet.solana.com',
};

// USE ESTE - Ankr funciona bem e é gratuito
const RPC_ENDPOINT = RPC_OPTIONS.ankr;

// ==========================================
// PROVIDER COMPONENT
// ==========================================

interface Props {
  children: ReactNode;
}

export const SolanaProvider: FC<Props> = ({ children }) => {
  // Lista de carteiras suportadas
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={RPC_ENDPOINT}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};