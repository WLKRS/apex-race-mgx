import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGameStore } from '@/store/useGameStore';
import { generateRandomCar } from '@/lib/mockData';
import { MINT_PRICE_USD, FREIGHT_FEE_USD, RARITY_DISTRIBUTION } from '@/lib/constants';
import { Zap, Clock, Package } from 'lucide-react';
import { toast } from 'sonner';
import CarCard from '@/components/CarCard';
import { CarNFT } from '@/types/game.types';

export default function Mint() {
  const { inventory, updateInventory } = useGameStore();
  const [minting, setMinting] = useState(false);
  const [mintedCar, setMintedCar] = useState<CarNFT | null>(null);

  const handleMint = async () => {
    setMinting(true);
    
    // Simulate minting process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newCar = generateRandomCar();
    setMintedCar(newCar);
    setMinting(false);
    
    toast.success('NFT mintado com sucesso!');
  };

  const handleReceive = (instant: boolean) => {
    if (!mintedCar) return;
    
    if (instant) {
      updateInventory({
        cars: [...inventory.cars, mintedCar],
        rcnBalance: inventory.rcnBalance - FREIGHT_FEE_USD,
      });
      toast.success('Carro recebido instantaneamente!');
    } else {
      // Simulate 24h wait
      setTimeout(() => {
        updateInventory({
          cars: [...inventory.cars, mintedCar],
        });
        toast.success('Carro entregue!');
      }, 3000); // Simulated as 3 seconds for demo
      toast.info('Seu carro será entregue em 24 horas');
    }
    
    setMintedCar(null);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mint NFT</h1>
        <p className="text-muted-foreground">
          Adquira um novo carro NFT da Coleção Gênesis
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Coleção Gênesis</CardTitle>
              <CardDescription>
                Coleção limitada a 50.000 carros NFT únicos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="aspect-video bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <Package className="w-24 h-24 mx-auto mb-4 opacity-50" />
                  <p className="text-2xl font-bold">Mystery Box</p>
                  <p className="text-sm opacity-75">Descubra sua raridade</p>
                </div>
              </div>

              {!mintedCar ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <span className="font-semibold">Preço de Mint:</span>
                    <span className="text-2xl font-bold">${MINT_PRICE_USD}</span>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleMint}
                    disabled={minting}
                  >
                    {minting ? (
                      <>
                        <Zap className="w-5 h-5 mr-2 animate-spin" />
                        Mintando...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 mr-2" />
                        Mint Agora por ${MINT_PRICE_USD}
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-lg font-semibold mb-4">🎉 Parabéns! Você mintou:</p>
                    <CarCard car={mintedCar} />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Clock className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="font-semibold mb-1">Entrega Grátis</p>
                        <p className="text-sm text-muted-foreground mb-3">Aguarde 24 horas</p>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => handleReceive(false)}
                        >
                          Aguardar Entrega
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 text-center">
                        <Zap className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                        <p className="font-semibold mb-1">Entrega Instantânea</p>
                        <p className="text-sm text-muted-foreground mb-3">
                          Taxa: ${FREIGHT_FEE_USD} RCN
                        </p>
                        <Button
                          className="w-full"
                          onClick={() => handleReceive(true)}
                          disabled={inventory.rcnBalance < FREIGHT_FEE_USD}
                        >
                          Receber Agora
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Raridade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {Object.entries(RARITY_DISTRIBUTION).map(([rarity, data]) => (
                <div key={rarity} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{rarity}</Badge>
                  </div>
                  <span className="font-semibold">{data.percentage}%</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="font-semibold mb-1">✅ Coleção Limitada</p>
                <p className="text-muted-foreground">
                  Apenas 50.000 carros serão mintados
                </p>
              </div>
              <div>
                <p className="font-semibold mb-1">✅ Atributos Únicos</p>
                <p className="text-muted-foreground">
                  Cada carro tem atributos baseados em sua raridade
                </p>
              </div>
              <div>
                <p className="font-semibold mb-1">✅ Upgradeable</p>
                <p className="text-muted-foreground">
                  Todos os atributos podem ser melhorados até nível 10
                </p>
              </div>
              <div>
                <p className="font-semibold mb-1">✅ ROI Rápido</p>
                <p className="text-muted-foreground">
                  ROI entre 1-12 dias dependendo da raridade
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}