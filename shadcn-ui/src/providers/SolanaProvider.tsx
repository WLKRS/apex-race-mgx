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

// Mude para 'devnet' para testes, 'mainnet-beta' para produção
const NETWORK = 'mainnet-beta';

// RPC Endpoint - você pode usar um personalizado para mais velocidade
// Exemplos de RPCs pagos: Helius, QuickNode, Alchemy
const RPC_ENDPOINT = clusterApiUrl(NETWORK);
// Ou use um RPC customizado:
// const RPC_ENDPOINT = 'https://seu-rpc.com';

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