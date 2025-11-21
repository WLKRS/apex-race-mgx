import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Home,
  Car,
  Trophy,
  Hammer,
  Store,
  Coins,
  Users,
  Zap,
} from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Início', path: '/' },
  { icon: Car, label: 'Garagem', path: '/garage' },
  { icon: Trophy, label: 'Corridas', path: '/race' },
  { icon: Hammer, label: 'Crafting', path: '/crafting' },
  { icon: Store, label: 'Marketplace', path: '/marketplace' },
  { icon: Coins, label: 'Staking', path: '/staking' },
  { icon: Users, label: 'Indicações', path: '/referral' },
  { icon: Zap, label: 'Mint NFT', path: '/mint' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 hidden lg:block">
      <div className="h-full py-6 px-3">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}