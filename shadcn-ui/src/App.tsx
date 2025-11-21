import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Index from './pages/Index';
import Garage from './pages/Garage';
import Race from './pages/Race';
import Crafting from './pages/Crafting';
import Marketplace from './pages/Marketplace';
import Staking from './pages/Staking';
import Referral from './pages/Referral';
import Mint from './pages/Mint';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/garage" element={<Garage />} />
                <Route path="/race" element={<Race />} />
                <Route path="/crafting" element={<Crafting />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/staking" element={<Staking />} />
                <Route path="/referral" element={<Referral />} />
                <Route path="/mint" element={<Mint />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;