import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CarCard from '@/components/CarCard';
import { useGameStore } from '@/store/useGameStore';
import { CarNFT, RaceType } from '@/types/game.types';
import { Trophy, Zap, Package } from 'lucide-react';
import { toast } from 'sonner';
import { isCarOnCooldown } from '@/lib/calculations';

export default function Race() {
  const { inventory, startRace } = useGameStore();
  const [selectedCar, setSelectedCar] = useState<CarNFT | null>(null);
  const [racing, setRacing] = useState(false);

  const raceTypes = [
    {
      type: RaceType.DRAG,
      name: 'Arrancada',
      icon: Zap,
      description: 'Alta velocidade, foco em ganhos monetários',
      rewards: '95% RCN | 5% Materiais',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-500/10',
    },
    {
      type: RaceType.STREET,
      name: 'Circuito de Rua',
      icon: Trophy,
      description: 'Evento equilibrado com ganhos e recursos',
      rewards: '50% RCN | 50% Materiais',
      color: 'text-blue-600',
      bgColor: 'bg-blue-500/10',
    },
    {
      type: RaceType.SCAVENGE,
      name: 'Exploração',
      icon: Package,
      description: 'Longa distância, foco em coleta de recursos',
      rewards: '5% RCN | 95% Materiais',
      color: 'text-green-600',
      bgColor: 'bg-green-500/10',
    },
  ];

  const handleRace = async (raceType: RaceType) => {
    if (!selectedCar) {
      toast.error('Selecione um carro primeiro!');
      return;
    }

    if (isCarOnCooldown(selectedCar)) {
      toast.error('Este carro está em cooldown!');
      return;
    }

    if (selectedCar.fuelLevel < 10) {
      toast.error('Combustível insuficiente!');
      return;
    }

    setRacing(true);
    
    try {
      // Simulate race duration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const result = await startRace(selectedCar.id, raceType);
      
      toast.success(
        `Corrida concluída! Você ganhou ${result.rcnEarned.toFixed(2)} RCN${
          result.materialsDropped.length > 0 
            ? ` e ${result.materialsDropped.length} material(is)` 
            : ''
        }`,
        { duration: 5000 }
      );
      
      setSelectedCar(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao iniciar corrida';
      toast.error(errorMessage);
    } finally {
      setRacing(false);
    }
  };

  const availableCars = inventory.cars.filter(
    car => car.fuelLevel >= 10 && !isCarOnCooldown(car)
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Corridas</h1>
        <p className="text-muted-foreground">
          Escolha um carro e o tipo de corrida para começar
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Selecione um Carro</CardTitle>
              <CardDescription>
                {availableCars.length} carro(s) disponível(is) para corrida
              </CardDescription>
            </CardHeader>
            <CardContent>
              {availableCars.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Nenhum carro disponível. Verifique combustível e cooldowns.
                </p>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {availableCars.map((car) => (
                    <div
                      key={car.id}
                      className={`cursor-pointer transition-all ${
                        selectedCar?.id === car.id ? 'ring-2 ring-primary rounded-lg' : ''
                      }`}
                      onClick={() => setSelectedCar(car)}
                    >
                      <CarCard car={car} showDetails={false} />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {selectedCar && (
            <Card>
              <CardHeader>
                <CardTitle>Carro Selecionado: {selectedCar.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Aceleração</div>
                    <div className="text-xl font-bold">{selectedCar.attributes.acceleration}/10</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Tecnologia</div>
                    <div className="text-xl font-bold">{selectedCar.attributes.technology}/10</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Porta-Malas</div>
                    <div className="text-xl font-bold">{selectedCar.attributes.trunk}/10</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Combustível</div>
                    <div className="text-xl font-bold">{selectedCar.fuelLevel.toFixed(0)}%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Tipos de Corrida</CardTitle>
              <CardDescription>Escolha sua estratégia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {raceTypes.map((race) => {
                const Icon = race.icon;
                return (
                  <Card key={race.type} className={race.bgColor}>
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-white`}>
                          <Icon className={`w-5 h-5 ${race.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{race.name}</h3>
                          <p className="text-xs text-muted-foreground">{race.description}</p>
                        </div>
                      </div>
                      <div className="text-xs font-medium">{race.rewards}</div>
                      <Button
                        className="w-full"
                        onClick={() => handleRace(race.type)}
                        disabled={!selectedCar || racing}
                      >
                        {racing ? 'Correndo...' : 'Iniciar Corrida'}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}