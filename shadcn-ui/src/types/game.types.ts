// ==========================================
// ARQUIVO: src/types/game.types.ts (SUBSTITUA)
// ==========================================

export enum CarRarity {
  COMMON = 'Comum',
  UNCOMMON = 'Incomum',
  RARE = 'Raro',
  SUPER_RARE = 'Super-Raro',
  EPIC = 'Épico',
  LEGENDARY = 'Lendário',
  MYTHIC = 'Mítico',
}

export enum RaceType {
  DRAG = 'Arrancada',
  STREET = 'Circuito de Rua',
  SCAVENGE = 'Exploração',
}

export enum MaterialTier {
  RAW = 'Matéria-Prima',
  TIER1 = 'Peça Tier 1',
  TIER2 = 'Peça Tier 2',
  TIER3 = 'Peça Tier 3',
  TIER4 = 'Peça Tier 4',
}

// ==========================================
// SISTEMA DE ATRIBUTOS (CORRIGIDO)
// ==========================================
// Base: 1-70 (dependendo da raridade)
// Com upgrades: pode chegar até 100
// ==========================================

export interface CarAttributes {
  acceleration: number; // 1-100 (base 10-70, upgrades até 100)
  technology: number;   // 1-100 (afeta corridas por tanque)
  trunk: number;        // 1-100 (afeta drop de materiais)
  control: number;      // 1-100 (para PvP futuro)
}

// Níveis base por raridade (valores iniciais)
export const RARITY_BASE_ATTRIBUTES: Record<CarRarity, { min: number; max: number }> = {
  [CarRarity.COMMON]: { min: 10, max: 20 },
  [CarRarity.UNCOMMON]: { min: 20, max: 30 },
  [CarRarity.RARE]: { min: 30, max: 40 },
  [CarRarity.SUPER_RARE]: { min: 40, max: 50 },
  [CarRarity.EPIC]: { min: 50, max: 60 },
  [CarRarity.LEGENDARY]: { min: 60, max: 70 },
  [CarRarity.MYTHIC]: { min: 65, max: 70 },
};

// Máximo que pode chegar com upgrades
export const MAX_ATTRIBUTE_VALUE = 100;
export const MAX_BASE_VALUE = 70; // Máximo sem upgrades

export interface CarNFT {
  id: string;
  name: string;
  rarity: CarRarity;
  attributes: CarAttributes;
  imageUrl: string;
  
  // Sistema de combustível
  fuelLevel: number;           // 0-100 (porcentagem)
  fuelCapacity: number;        // Corridas por tanque cheio (baseado em technology)
  racesRemainingToday: number; // Corridas restantes no tanque atual
  
  // Sistema de manutenção
  maintenanceDue: number;      // Custo acumulado de manutenção ($)
  needsMaintenance: boolean;   // true quando fuel = 0
  
  // Cooldown
  lastRaceTime?: number;
  cooldownEndsAt?: number;
  
  // Outros
  isRented?: boolean;
  owner?: string;
}

export interface RaceResult {
  success: boolean;
  rcnEarned: number;
  materialsDropped: Material[];
  fuelConsumed: number;        // Quantidade de corridas consumidas
  maintenanceAdded: number;    // Custo adicionado à manutenção
  fuelCostDisplay: string;     // Para mostrar na UI: "1/15 corridas"
}

export interface Material {
  id: string;
  name: string;
  tier: MaterialTier;
  quantity: number;
  imageUrl: string;
}

export interface CraftingRecipe {
  inputMaterials: { materialId: string; quantity: number }[];
  rcnCost: number;
  output: { materialId: string; quantity: number };
}

export interface GarageLevel {
  level: number;
  slots: number;
  dailyRefills: number;
  upgradeCostRCN: number;
}