import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGameStore } from '@/store/useGameStore';
import { Trophy, DollarSign, Fuel, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getTimeUntilReset } from '@/lib/calculations';

export default function StatsPanel() {
  const { stats, user } = useGameStore();
  const [timeUntilReset, setTimeUntilReset] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      const ms = getTimeUntilReset();
      const hours = Math.floor(ms / (1000 * 60 * 60));
      const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
      setTimeUntilReset(`${hours}h ${minutes}m`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      title: 'Corridas Hoje',
      value: stats.todayRaces,
      icon: Trophy,
      color: 'text-blue-600',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Ganhos Hoje',
      value: `$${stats.todayEarnings.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Reabastecimentos',
      value: `${stats.refillsUsed}/${stats.refillsAvailable}`,
      icon: Fuel,
      color: 'text-orange-600',
      bgColor: 'bg-orange-500/10',
    },
    {
      title: 'Próximo Reset',
      value: timeUntilReset,
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}