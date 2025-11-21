// ==========================================
// ARQUIVO: src/pages/Index.tsx (SUBSTITUA)
// ==========================================

import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StatsPanel from '@/components/StatsPanel';
import { useGameStore } from '@/store/useGameStore';
import { useWalletStore } from '@/store/useWalletStore';
import { ArrowRight, Trophy, Coins, Users, Zap, Wallet } from 'lucide-react';

// NOVO: Imports da Solana
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Index() {
  const navigate = useNavigate();
  const { connected } = useWallet();
  const { solBalance } = useWalletStore();
  const { user, inventory } = useGameStore();

  // Tela de boas-vindas quando NÃO conectado
  if (!connected) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
        <div className="max-w-4xl w-full space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Apex Racers
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A Nova Geração de Economias Play-to-Earn na Solana
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card>
              <CardHeader>
                <Trophy className="w-12 h-12 mx-auto text-orange-600 mb-2" />
                <CardTitle>Corridas Estratégicas</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Escolha entre 3 tipos de corrida e maximize seus ganhos com estratégia
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Coins className="w-12 h-12 mx-auto text-orange-600 mb-2" />
                <CardTitle>Economia Estável</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  ROI rápido e previsível com preços atrelados ao dólar via oráculo
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-12 h-12 mx-auto text-orange-600 mb-2" />
                <CardTitle>Governança DAO</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Stake tokens e receba parte da receita real do projeto em SOL
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* BOTÃO DE CONECTAR CARTEIRA */}
          <div className="mt-8">
            <WalletMultiButton className="!bg-gradient-to-r !from-orange-500 !to-red-600 hover:!from-orange-600 hover:!to-red-700 !h-14 !rounded-lg !px-8 !text-lg !font-semibold">
              <Wallet className="w-5 h-5 mr-2" />
              Conectar Carteira para Começar
            </WalletMultiButton>
          </div>

          <div className="mt-12 p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Características Principais</h3>
            <div className="grid md:grid-cols-2 gap-4 text-left text-sm">
              <div>✅ Coleção limitada a 50.000 NFTs</div>
              <div>✅ ROI de 1-12 dias dependendo da raridade</div>
              <div>✅ Sistema de crafting e upgrade</div>
              <div>✅ Marketplace integrado</div>
              <div>✅ Staking com multiplicadores até 4x</div>
              <div>✅ Sistema de indicação com 10% de comissão</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard quando CONECTADO
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo de volta, Piloto!
          </p>
        </div>
        <Button onClick={() => navigate('/mint')}>
          <Zap className="w-4 h-4 mr-2" />
          Mint Novo Carro
        </Button>
      </div>

      <StatsPanel />

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sua Garagem</CardTitle>
            <CardDescription>
              {inventory.cars.length} carro(s) | Nível {user?.garageLevel || 1}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total de Corridas:</span>
                <span className="font-semibold">{user?.totalRaces || 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Ganhos Totais:</span>
                <span className="font-semibold">${(user?.totalEarningsUSD || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Saldo SOL:</span>
                <span className="font-semibold">{solBalance.toFixed(4)} SOL</span>
              </div>
            </div>
            <Button className="w-full mt-4" onClick={() => navigate('/garage')}>
              Ver Garagem
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Comece a jogar agora</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full" variant="outline" onClick={() => navigate('/race')}>
              <Trophy className="w-4 h-4 mr-2" />
              Iniciar Corrida
            </Button>
            <Button className="w-full" variant="outline" onClick={() => navigate('/crafting')}>
              Crafting & Upgrades
            </Button>
            <Button className="w-full" variant="outline" onClick={() => navigate('/marketplace')}>
              Marketplace
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tokenomics $RCN</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Seu Saldo RCN</div>
              <div className="text-2xl font-bold">{inventory.rcnBalance.toFixed(2)} RCN</div>
            </div>
            <div>
              <div className="text-muted-foreground">Valor em USD</div>
              <div className="text-2xl font-bold">${(inventory.rcnBalance * 0.25).toFixed(2)}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Supply Total</div>
              <div className="text-2xl font-bold">1B RCN</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}