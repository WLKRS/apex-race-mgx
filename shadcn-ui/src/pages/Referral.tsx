import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGameStore } from '@/store/useGameStore';
import { Users, Copy, DollarSign, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

export default function Referral() {
  const { user, referralStats } = useGameStore();

  const handleCopyCode = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode);
      toast.success('Código copiado para a área de transferência!');
    }
  };

  const handleCopyLink = () => {
    const link = `https://apexracers.game?ref=${user?.referralCode}`;
    navigator.clipboard.writeText(link);
    toast.success('Link copiado para a área de transferência!');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Sistema de Indicações</h1>
        <p className="text-muted-foreground">
          Ganhe 10% de comissão vitalícia sobre todas as taxas dos jogadores que você indicar
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Indicações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{referralStats?.referrals || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Indicações Ativas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {referralStats?.activeReferrals || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Comissão Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-600">
              {referralStats?.totalCommissionRCN.toFixed(2) || '0.00'} RCN
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Seu Código de Indicação</CardTitle>
            <CardDescription>
              Compartilhe este código com seus amigos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={user?.referralCode || ''}
                readOnly
                className="font-mono text-lg font-bold"
              />
              <Button onClick={handleCopyCode}>
                <Copy className="w-4 h-4 mr-2" />
                Copiar
              </Button>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">Link de Indicação:</p>
              <p className="text-xs text-muted-foreground break-all mb-3">
                https://apexracers.game?ref={user?.referralCode}
              </p>
              <Button variant="outline" size="sm" onClick={handleCopyLink}>
                <Copy className="w-4 h-4 mr-2" />
                Copiar Link
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Como Funciona</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">1. Compartilhe seu código</p>
                <p className="text-sm text-muted-foreground">
                  Envie seu código ou link para amigos interessados em jogar
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">2. Eles se cadastram</p>
                <p className="text-sm text-muted-foreground">
                  Quando alguém usa seu código, você se torna o indicador deles
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">3. Ganhe comissão vitalícia</p>
                <p className="text-sm text-muted-foreground">
                  Receba 10% de todas as taxas em RCN que eles pagarem, para sempre
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Comissões</CardTitle>
          <CardDescription>Suas últimas comissões recebidas</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            Nenhuma comissão recebida ainda. Comece a indicar amigos!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}