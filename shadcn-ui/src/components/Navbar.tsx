// ==========================================
// ARQUIVO: src/components/Navbar.tsx (SUBSTITUA)
// ==========================================

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGameStore } from '@/store/useGameStore';
import { useWalletStore } from '@/store/useWalletStore';
import { Wallet, LogOut, Loader2 } from 'lucide-react';

// NOVO: Imports da Solana
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

// NOVO: Import do toggle de tema
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  const { connection } = useConnection();
  const { publicKey, connected, connecting, disconnect } = useWallet();
  const { setConnected, setSolBalance, solBalance } = useWalletStore();
  const { inventory } = useGameStore();

  // Sincroniza estado da carteira Solana com a store
  useEffect(() => {
    if (connected && publicKey) {
      const address = publicKey.toBase58();
      const shortAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;
      setConnected(true, shortAddress, publicKey);
      
      // Busca saldo de SOL
      connection.getBalance(publicKey).then((balance) => {
        setSolBalance(balance / LAMPORTS_PER_SOL);
      });
    } else {
      setConnected(false);
    }
  }, [connected, publicKey, connection, setConnected, setSolBalance]);

  // Formata o endereço para exibição
  const formatAddress = (address: string) => {
    if (address.length <= 10) return address;
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <span className="font-bold text-xl">Apex Racers</span>
        </Link>

        {/* Área direita */}
        <div className="flex items-center gap-4">
          {connected && publicKey && (
            <>
              {/* Saldos */}
              <div className="hidden md:flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 rounded-lg">
                  <span className="font-semibold text-orange-600">RCN:</span>
                  <span className="font-mono">{inventory.rcnBalance.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                  <span className="font-semibold text-purple-600">SOL:</span>
                  <span className="font-mono">{solBalance.toFixed(4)}</span>
                </div>
              </div>

              {/* Botão de desconectar */}
              <Button variant="outline" size="sm" onClick={disconnect}>
                <LogOut className="w-4 h-4 mr-2" />
                {formatAddress(publicKey.toBase58())}
              </Button>
            </>
          )}
          
          {/* Botão de conectar - aparece quando desconectado */}
          {!connected && (
            <WalletMultiButton className="!bg-primary hover:!bg-primary/90 !h-10 !rounded-md !px-4 !py-2 !text-sm !font-medium">
              {connecting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Conectando...
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4 mr-2" />
                  Conectar Carteira
                </>
              )}
            </WalletMultiButton>
          )}
        </div>
      </div>
    </nav>
  );
}