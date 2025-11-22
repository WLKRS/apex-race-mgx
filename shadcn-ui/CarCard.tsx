// ==========================================
// ARQUIVO: src/components/CarCard.tsx (SUBSTITUA)
// ==========================================

import { CarNFT } from '@/types/game.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Zap, Cpu, Package, Gauge, Fuel, Wrench, Car } from 'lucide-react';
import { isCarOnCooldown, getRemainingCooldown } from '@/lib/calculations';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface CarCardProps {
  car: CarNFT;
  onClick?: () => void;
  showDetails?: boolean;
}

const rarityColors: Record<string, string> = {
  'Comum': 'bg-gray-500',
  'Incomum': 'bg-green-500',
  'Raro': 'bg-blue-500',
  'Super-Raro': 'bg-purple-500',
  'Épico': 'bg-pink-500',
  'Lendário': 'bg-orange-500',
  'Mítico': 'bg-red-500',
};

export default function CarCard({ car, onClick, showDetails = true }: CarCardProps) {
  const [cooldown, setCooldown] = useState(0);
  const onCooldown = isCarOnCooldown(car);

  useEffect(() => {
    if (onCooldown) {
      const interval = setInterval(() => {
        const remaining = getRemainingCooldown(car);
        setCooldown(remaining);
        if (remaining === 0) clearInterval(interval);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [car, onCooldown]);

  const formatCooldown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calcula porcentagem de combustível baseado em corridas restantes
  const fuelPercentage = car.fuelCapacity > 0 
    ? (car.racesRemainingToday / car.fuelCapacity) * 100 
    : 0;

  return (
    <Card 
      className={cn(
        'cursor-pointer transition-all hover:shadow-lg hover:border-primary/50',
        onCooldown && 'opacity-60',
        car.needsMaintenance && 'border-orange-500/50'
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{car.name}</CardTitle>
          <Badge className={rarityColors[car.rarity]}>{car.rarity}</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Imagem do carro */}
        <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
          <Car className="w-20 h-20 text-gray-600" />
        </div>

        {showDetails && (
          <>
            {/* Atributos (1-100) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  Aceleração
                </span>
                <span className="font-mono font-semibold">{car.attributes.acceleration}/100</span>
              </div>
              <Progress value={car.attributes.acceleration} className="h-1.5" />
              
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-blue-500" />
                  Tecnologia
                </span>
                <span className="font-mono font-semibold">{car.attributes.technology}/100</span>
              </div>
              <Progress value={car.attributes.technology} className="h-1.5" />
              
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-green-500" />
                  Porta-Malas
                </span>
                <span className="font-mono font-semibold">{car.attributes.trunk}/100</span>
              </div>
              <Progress value={car.attributes.trunk} className="h-1.5" />
              
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-purple-500" />
                  Controle
                </span>
                <span className="font-mono font-semibold">{car.attributes.control}/100</span>
              </div>
              <Progress value={car.attributes.control} className="h-1.5" />
            </div>

            {/* Combustível - Mostra corridas restantes */}
            <div className="space-y-1.5 pt-2 border-t">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Fuel className="w-3 h-3" />
                  Combustível
                </span>
                <span className="font-semibold">
                  {car.racesRemainingToday}/{car.fuelCapacity} corridas
                </span>
              </div>
              <Progress 
                value={fuelPercentage} 
                className={cn(
                  "h-2",
                  fuelPercentage <= 20 && "bg-red-200 [&>div]:bg-red-500",
                  fuelPercentage > 20 && fuelPercentage <= 50 && "bg-yellow-200 [&>div]:bg-yellow-500"
                )}
              />
            </div>

            {/* Avisos */}
            {car.needsMaintenance && (
              <div className="flex items-center gap-2 text-xs text-orange-600 font-medium bg-orange-500/10 p-2 rounded">
                <Wrench className="w-4 h-4" />
                Manutenção obrigatória: ${car.maintenanceDue.toFixed(2)}
              </div>
            )}

            {car.maintenanceDue > 0 && !car.needsMaintenance && (
              <div className="text-xs text-muted-foreground">
                Manutenção acumulada: ${car.maintenanceDue.toFixed(2)}
              </div>
            )}

            {onCooldown && (
              <div className="text-xs text-blue-600 font-medium">
                ⏱️ Cooldown: {formatCooldown(cooldown)}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}