import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import CarCard from '@/components/CarCard';
import { useGameStore } from '@/store/useGameStore';
import { CarNFT } from '@/types/game.types';
import { Fuel, Wrench, ArrowUp, Building } from 'lucide-react';
import { GARAGE_LEVELS } from '@/lib/constants';
import { toast } from 'sonner';

export default function Garage() {
  const { inventory, user, refuelCar, performMaintenance, upgradeCarAttribute, upgradeGarage } = useGameStore();
  const [selectedCar, setSelectedCar] = useState<CarNFT | null>(null);

  const currentGarageLevel = GARAGE_LEVELS.find(g => g.level === user?.garageLevel) || GARAGE_LEVELS[0];
  const nextGarageLevel = GARAGE_LEVELS.find(g => g.level === (user?.garageLevel || 0) + 1);

  const handleRefuel = () => {
    if (!selectedCar) return;
    const success = refuelCar(selectedCar.id);
    if (success) {
      toast.success('Carro reabastecido com sucesso!');
      setSelectedCar(null);
    } else {
      toast.error('Não foi possível reabastecer. Verifique manutenção pendente ou reabastecimentos disponíveis.');
    }
  };

  const handleMaintenance = () => {
    if (!selectedCar) return;
    const success = performMaintenance(selectedCar.id);
    if (success) {
      toast.success('Manutenção realizada com sucesso!');
      setSelectedCar(null);
    } else {
      toast.error('Saldo insuficiente para manutenção.');
    }
  };

  const handleUpgrade = (attribute: string) => {
    if (!selectedCar) return;
    const success = upgradeCarAttribute(selectedCar.id, attribute);
    if (success) {
      toast.success(`${attribute} atualizado com sucesso!`);
    } else {
      toast.error('Não foi possível fazer upgrade. Saldo insuficiente ou nível máximo atingido.');
    }
  };

  const handleGarageUpgrade = () => {
    const success = upgradeGarage();
    if (success) {
      toast.success('Garagem atualizada com sucesso!');
    } else {
      toast.error('Saldo insuficiente para upgrade da garagem.');
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Minha Garagem</h1>
          <p className="text-muted-foreground">
            Nível {currentGarageLevel.level} | {currentGarageLevel.slots} vagas | {currentGarageLevel.dailyRefills} reabastecimentos/dia
          </p>
        </div>
        {nextGarageLevel && (
          <Button onClick={handleGarageUpgrade}>
            <Building className="w-4 h-4 mr-2" />
            Upgrade Garagem ({nextGarageLevel.upgradeCostRCN} RCN)
          </Button>
        )}
      </div>

      {inventory.cars.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">Você ainda não possui carros NFT</p>
            <Button>Mint seu primeiro carro</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inventory.cars.map((car) => (
            <CarCard key={car.id} car={car} onClick={() => setSelectedCar(car)} />
          ))}
        </div>
      )}

      <Dialog open={!!selectedCar} onOpenChange={() => setSelectedCar(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedCar?.name}</DialogTitle>
            <DialogDescription>Gerencie seu carro</DialogDescription>
          </DialogHeader>

          {selectedCar && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Combustível</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={selectedCar.fuelLevel} className="mb-2" />
                    <p className="text-xs text-muted-foreground mb-3">
                      {selectedCar.fuelLevel.toFixed(0)}% restante
                    </p>
                    <Button 
                      size="sm" 
                      className="w-full" 
                      onClick={handleRefuel}
                      disabled={selectedCar.fuelLevel > 90 || selectedCar.maintenanceDue > 0}
                    >
                      <Fuel className="w-4 h-4 mr-2" />
                      Reabastecer ($1.50)
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Manutenção</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold mb-3">
                      ${selectedCar.maintenanceDue.toFixed(2)}
                    </p>
                    <Button 
                      size="sm" 
                      className="w-full" 
                      onClick={handleMaintenance}
                      disabled={selectedCar.maintenanceDue === 0}
                    >
                      <Wrench className="w-4 h-4 mr-2" />
                      Realizar Manutenção
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Upgrades de Atributos</CardTitle>
                  <CardDescription>Melhore os atributos do seu carro (50 RCN cada)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(selectedCar.attributes).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium capitalize">{key}</span>
                          <span className="text-sm font-mono">{value}/10</span>
                        </div>
                        <Progress value={value * 10} />
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="ml-4"
                        onClick={() => handleUpgrade(key)}
                        disabled={value >= 10}
                      >
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}