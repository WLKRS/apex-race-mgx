import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useGameStore } from '@/store/useGameStore';
import { STAKING_TIERS, TOKENOMICS } from '@/lib/constants';
import { Coins, Lock, TrendingUp, Users } from 'lucide-react';
import { toast } from 'sonner';

export default function Staking() {
  const { inventory, stakingPositions, stakeTokens, unstakeTokens } = useGameStore();
  const [stakeAmount, setStakeAmount] = useState('');
  const [selectedTier, setSelectedTier] = useState(STAKING_TIERS[0]);

  const handleStake = () => {
    const amount = parseFloat(stakeAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Valor inválido');
      return;
    }
    
    if (amount > inventory.rcnBalance) {
      toast.error('Saldo insuficiente');
      return;
    }

    const success = stakeTokens(amount, selectedTier.lockPeriod);
    if (success) {
      toast.success(`${amount} RCN em staking com sucesso!`);
      setStakeAmount('');
    }
  };

  const handleUnstake = (positionId: string) => {
    const success = unstakeTokens(positionId);
    if (success) {
      toast.success('Tokens resgatados com sucesso!');
    } else {
      toast.error('Não é possível resgatar ainda. Verifique o período de lock.');
    }
  };

  const totalStaked = stakingPositions.reduce((sum, pos) => sum + pos.amount, 0);
  const totalEarnedRCN = stakingPositions.reduce((sum, pos) => sum + pos.earnedRCN, 0);
  const totalEarnedSOL = stakingPositions.reduce((sum, pos) => sum + pos.earnedSOL, 0);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Staking & Governança</h1>
        <p className="text-muted-foreground">
          Faça staking de RCN e receba recompensas + poder de voto na DAO
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total em Staking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalStaked.toFixed(2)} RCN</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              RCN Ganho
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">+{totalEarnedRCN.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              SOL Ganho
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">+{totalEarnedSOL.toFixed(4)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Posições Ativas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stakingPositions.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fazer Staking</CardTitle>
              <CardDescription>
                Escolha o período de lock e quantidade
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Quantidade de RCN
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                  />
                  <Button
                    variant="outline"
                    onClick={() => setStakeAmount(inventory.rcnBalance.toString())}
                  >
                    Máximo
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Disponível: {inventory.rcnBalance.toFixed(2)} RCN
                </p>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Período de Lock
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {STAKING_TIERS.map((tier) => (
                    <Card
                      key={tier.lockPeriod}
                      className={`cursor-pointer transition-all ${
                        selectedTier.lockPeriod === tier.lockPeriod
                          ? 'ring-2 ring-primary'
                          : 'hover:border-primary'
                      }`}
                      onClick={() => setSelectedTier(tier)}
                    >
                      <CardContent className="p-4 text-center">
                        <p className="font-semibold">{tier.lockPeriod}</p>
                        <p className="text-2xl font-bold text-primary my-2">
                          {tier.multiplier}x
                        </p>
                        <p className="text-xs text-muted-foreground">{tier.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Button className="w-full" size="lg" onClick={handleStake}>
                <Lock className="w-4 h-4 mr-2" />
                Fazer Staking
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Suas Posições de Staking</CardTitle>
            </CardHeader>
            <CardContent>
              {stakingPositions.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Você ainda não tem posições de staking
                </p>
              ) : (
                <div className="space-y-3">
                  {stakingPositions.map((position) => (
                    <Card key={position.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-semibold">{position.amount.toFixed(2)} RCN</p>
                            <Badge variant="outline">{position.lockPeriod}</Badge>
                          </div>
                          <Badge className="bg-primary">{position.multiplier}x</Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                          <div>
                            <p className="text-muted-foreground">RCN Ganho</p>
                            <p className="font-semibold text-green-600">
                              +{position.earnedRCN.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">SOL Ganho</p>
                            <p className="font-semibold text-purple-600">
                              +{position.earnedSOL.toFixed(4)}
                            </p>
                          </div>
                        </div>

                        <Button
                          className="w-full"
                          size="sm"
                          variant="outline"
                          onClick={() => handleUnstake(position.id)}
                          disabled={Date.now() < position.unlocksAt}
                        >
                          {Date.now() < position.unlocksAt
                            ? `Desbloqueia em ${Math.ceil((position.unlocksAt - Date.now()) / (1000 * 60 * 60 * 24))} dias`
                            : 'Resgatar'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Benefícios do Staking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Coins className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="font-semibold">Recompensas em RCN</p>
                  <p className="text-muted-foreground">
                    Receba parte das taxas de protocolo
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="font-semibold">30% da Receita em SOL</p>
                  <p className="text-muted-foreground">
                    Compartilhe a receita real do projeto
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-semibold">Poder de Voto na DAO</p>
                  <p className="text-muted-foreground">
                    Participe das decisões do ecossistema
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tokenomics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              {TOKENOMICS.map((item) => (
                <div key={item.category} className="flex justify-between">
                  <span className="text-muted-foreground">{item.category}</span>
                  <span className="font-semibold">{item.percentage}%</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}