import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGameStore } from '@/store/useGameStore';
import { MaterialTier } from '@/types/game.types';
import { Hammer, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function Crafting() {
  const { inventory, craftMaterial } = useGameStore();

  const handleCraft = (materialId: string, outputTier: string) => {
    const success = craftMaterial(materialId, outputTier);
    if (success) {
      toast.success('Item craftado com sucesso!');
    } else {
      toast.error('Materiais ou RCN insuficientes para crafting.');
    }
  };

  const tierColors: Record<string, string> = {
    [MaterialTier.RAW]: 'bg-gray-500',
    [MaterialTier.TIER1]: 'bg-green-500',
    [MaterialTier.TIER2]: 'bg-blue-500',
    [MaterialTier.TIER3]: 'bg-purple-500',
    [MaterialTier.TIER4]: 'bg-orange-500',
  };

  const craftingRecipes = [
    {
      input: MaterialTier.RAW,
      inputQty: 5,
      output: MaterialTier.TIER1,
      rcnCost: 2,
    },
    {
      input: MaterialTier.TIER1,
      inputQty: 3,
      output: MaterialTier.TIER2,
      rcnCost: 5,
    },
    {
      input: MaterialTier.TIER2,
      inputQty: 3,
      output: MaterialTier.TIER3,
      rcnCost: 15,
    },
    {
      input: MaterialTier.TIER3,
      inputQty: 3,
      output: MaterialTier.TIER4,
      rcnCost: 50,
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Crafting & Refinamento</h1>
        <p className="text-muted-foreground">
          Refine materiais brutos em peças de upgrade valiosas
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Receitas de Crafting</CardTitle>
              <CardDescription>Combine materiais para criar peças de upgrade</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {craftingRecipes.map((recipe, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <Badge className={tierColors[recipe.input]}>{recipe.input}</Badge>
                          <p className="text-xs text-muted-foreground mt-1">x{recipe.inputQty}</p>
                        </div>
                        
                        <ArrowRight className="w-5 h-5 text-muted-foreground" />
                        
                        <div className="text-center">
                          <Badge className={tierColors[recipe.output]}>{recipe.output}</Badge>
                          <p className="text-xs text-muted-foreground mt-1">x1</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-semibold mb-2">{recipe.rcnCost} RCN</p>
                        <Button
                          size="sm"
                          onClick={() => handleCraft('mat-001', recipe.output)}
                        >
                          <Hammer className="w-4 h-4 mr-2" />
                          Craftar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Seu Inventário</CardTitle>
              <CardDescription>{inventory.materials.length} tipo(s) de material</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {inventory.materials.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                  Nenhum material no inventário
                </p>
              ) : (
                inventory.materials.map((material) => (
                  <div
                    key={material.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg" />
                      <div>
                        <p className="font-medium text-sm">{material.name}</p>
                        <Badge className={`${tierColors[material.tier]} text-xs`}>
                          {material.tier}
                        </Badge>
                      </div>
                    </div>
                    <span className="font-mono font-semibold">x{material.quantity}</span>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Como Funciona</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>1. Complete corridas do tipo "Exploração" para obter materiais brutos</p>
              <p>2. Refine 5 materiais brutos + RCN para criar peças Tier 1</p>
              <p>3. Funda 3 peças do mesmo tier para criar o próximo tier</p>
              <p>4. Use peças de upgrade para melhorar os atributos dos seus carros</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}