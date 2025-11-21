import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useWalletStore } from '@/store/useWalletStore';
import { useGameStore } from '@/store/useGameStore';
import { Wallet, LogOut } from 'lucide-react';

export default function Navbar() {
  const { connected, address, connect, disconnect } = useWalletStore();
  const { inventory } = useGameStore();

  const handleConnect = () => {
    // Mock wallet connection
    connect('7xKX...9pQm');
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <span className="font-bold text-xl">Apex Racers</span>
        </Link>

        <div className="flex items-center gap-4">
          {connected && (
            <>
              <div className="hidden md:flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 rounded-lg">
                  <span className="font-semibold text-orange-600">RCN:</span>
                  <span className="font-mono">{inventory.rcnBalance.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                  <span className="font-semibold text-purple-600">SOL:</span>
                  <span className="font-mono">{inventory.solBalance.toFixed(2)}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={disconnect}>
                <LogOut className="w-4 h-4 mr-2" />
                {address}
              </Button>
            </>
          )}
          
          {!connected && (
            <Button onClick={handleConnect}>
              <Wallet className="w-4 h-4 mr-2" />
              Conectar Carteira
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}