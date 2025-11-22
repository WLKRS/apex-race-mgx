// ==========================================
// ARQUIVO: src/providers/SolanaProvider.tsx
// SUBSTITUA O ARQUIVO INTEIRO POR ESTE CONTEÚDO
// ==========================================

import { FC, ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { 
  PhantomWalletAdapter, 
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';

// IMPORTANTE: Importe os estilos do modal
import '@solana/wallet-adapter-react-ui/styles.css';

// ==========================================
// CONFIGURAÇÃO DE RPC
// ==========================================
// O RPC público da Solana bloqueia requisições.
// Usamos o Ankr que é gratuito e funciona bem.

const RPC_ENDPOINT = 'https://rpc.ankr.com/solana';

// Alternativas caso o Ankr não funcione:
// const RPC_ENDPOINT = 'https://solana-mainnet.g.alchemy.com/v2/demo';
// const RPC_ENDPOINT = 'https://api.mainnet-beta.solana.com';

// ==========================================
// PROVIDER COMPONENT
// ==========================================

interface Props {
  children: ReactNode;
}

export const SolanaProvider: FC<Props> = ({ children }) => {
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
