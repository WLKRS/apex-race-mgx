import { CarNFT } from '@/types/game.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Zap, Cpu, Package, Gauge } from 'lucide-react';
import { isCarOnCooldown, getRemainingCooldown } from '@/lib/calculations';
import { useEffect, useState } from 'react';

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

  return (
    <Card 
      className={cn(
        'cursor-pointer transition-all hover:shadow-lg',
        onCooldown && 'opacity-60'
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
        <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
          <Car className="w-20 h-20 text-gray-600" />
        </div>

        {showDetails && (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  Aceleração
                </span>
                <span className="font-mono font-semibold">{car.attributes.acceleration}/10</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-blue-500" />
                  Tecnologia
                </span>
                <span className="font-mono font-semibold">{car.attributes.technology}/10</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-green-500" />
                  Porta-Malas
                </span>
                <span className="font-mono font-semibold">{car.attributes.trunk}/10</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-purple-500" />
                  Controle
                </span>
                <span className="font-mono font-semibold">{car.attributes.control}/10</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Combustível</span>
                <span className="font-semibold">{car.fuelLevel.toFixed(0)}%</span>
              </div>
              <Progress value={car.fuelLevel} className="h-2" />
            </div>

            {car.maintenanceDue > 0 && (
              <div className="text-xs text-orange-600 font-medium">
                Manutenção pendente: ${car.maintenanceDue.toFixed(2)}
              </div>
            )}

            {onCooldown && (
              <div className="text-xs text-blue-600 font-medium">
                Cooldown: {formatCooldown(cooldown)}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

// Import Car icon from lucide-react
import { Car } from 'lucide-react';