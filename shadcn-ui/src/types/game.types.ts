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

export interface CarAttributes {
  acceleration: number; // 1-10
  technology: number; // 1-10
  trunk: number; // 1-10
  control: number; // 1-10
}

export interface CarNFT {
  id: string;
  name: string;
  rarity: CarRarity;
  attributes: CarAttributes;
  imageUrl: string;
  fuelLevel: number; // 0-100
  lastRaceTime?: number;
  cooldownEndsAt?: number;
  maintenanceDue: number; // accumulated maintenance cost
  isRented?: boolean;
  owner?: string;
}

export interface RaceResult {
  success: boolean;
  rcnEarned: number;
  materialsDropped: Material[];
  fuelConsumed: number;
  maintenanceAdded: number;
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
