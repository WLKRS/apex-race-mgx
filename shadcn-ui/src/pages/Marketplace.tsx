import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CarCard from '@/components/CarCard';
import { Store, Tag } from 'lucide-react';
import { generateRandomCar } from '@/lib/mockData';

export default function Marketplace() {
  const [mockListings] = useState(() => Array.from({ length: 6 }, generateRandomCar));

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <p className="text-muted-foreground">
          Compre e venda carros NFT e materiais
        </p>
      </div>

      <Tabs defaultValue="cars" className="space-y-6">
        <TabsList>
          <TabsTrigger value="cars">
            <Store className="w-4 h-4 mr-2" />
            Carros NFT
          </TabsTrigger>
          <TabsTrigger value="materials">
            <Tag className="w-4 h-4 mr-2" />
            Materiais
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cars" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input placeholder="Buscar por nome..." className="max-w-xs" />
                <Button variant="outline">Filtrar por Raridade</Button>
                <Button variant="outline">Ordenar por Preço</Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockListings.map((car) => (
              <Card key={car.id}>
                <CarCard car={car} showDetails={false} />
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Preço</p>
                      <p className="text-xl font-bold">
                        {(Math.random() * 50 + 25).toFixed(2)} SOL
                      </p>
                    </div>
                    <Button>Comprar</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="materials" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mercado de Materiais</CardTitle>
              <CardDescription>
                Compre e venda materiais de crafting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-12">
                Em breve: Marketplace de materiais
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}