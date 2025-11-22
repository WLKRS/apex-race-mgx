// ==========================================
// ARQUIVO: src/lib/mockData.ts (SUBSTITUA)
// ==========================================

import { CarNFT, CarRarity, Material, MaterialTier } from '@/types/game.types';
import { UserProfile, UserInventory, UserStats } from '@/types/user.types';
import { RARITY_DISTRIBUTION, getRacesPerTank } from './constants';

// ==========================================
// MOCK CARS (COM ATRIBUTOS 1-100)
// ==========================================

export const MOCK_CARS: CarNFT[] = [
  {
    id: 'car-001',
    name: 'Thunder Bolt',
    rarity: CarRarity.LEGENDARY,
    attributes: { 
      acceleration: 65,  // Lendário: 60-70 base
      technology: 62, 
      trunk: 58, 
      control: 60 
    },
    imageUrl: '/images/car1.png',
    fuelLevel: 100,
    fuelCapacity: 14, // Baseado em technology 62
    racesRemainingToday: 14,
    maintenanceDue: 0,
    needsMaintenance: false,
  },
  {
    id: 'car-002',
    name: 'Street Racer',
    rarity: CarRarity.EPIC,
    attributes: { 
      acceleration: 55,  // Épico: 50-60 base
      technology: 52, 
      trunk: 48, 
      control: 50 
    },
    imageUrl: '/images/car2.png',
    fuelLevel: 80,
    fuelCapacity: 13,
    racesRemainingToday: 10,
    maintenanceDue: 1.5,
    needsMaintenance: false,
  },
  {
    id: 'car-003',
    name: 'City Cruiser',
    rarity: CarRarity.RARE,
    attributes: { 
      acceleration: 35,  // Raro: 30-40 base
      technology: 38, 
      trunk: 40, 
      control: 32 
    },
    imageUrl: '/images/car3.png',
    fuelLevel: 0, // Sem combustível - precisa manutenção
    fuelCapacity: 12,
    racesRemainingToday: 0,
    maintenanceDue: 1.8,
    needsMaintenance: true, // Combustível zerou
  },
];

// ==========================================
// MOCK MATERIALS
// ==========================================

export const MOCK_MATERIALS: Material[] = [
  { id: 'mat-001', name: 'Ligas de Aço', tier: MaterialTier.RAW, quantity: 45, imageUrl: '/images/material1.png' },
  { id: 'mat-002', name: 'Chips Eletrônicos', tier: MaterialTier.RAW, quantity: 32, imageUrl: '/images/material2.png' },
  { id: 'mat-003', name: 'Peça de Motor T1', tier: MaterialTier.TIER1, quantity: 8, imageUrl: '/images/material3.png' },
  { id: 'mat-004', name: 'Peça de Motor T2', tier: MaterialTier.TIER2, quantity: 3, imageUrl: '/images/material4.png' },
];

// ==========================================
// MOCK USER
// ==========================================

export const MOCK_USER: UserProfile = {
  walletAddress: '7xKX...9pQm',
  username: 'RacerPro',
  garageLevel: 3,
  totalRaces: 487,
  totalEarningsRCN: 12450,
  totalEarningsUSD: 3112.5,
  referralCode: 'RACER2024',
  createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
};

// ==========================================
// MOCK INVENTORY
// ==========================================

export const MOCK_INVENTORY: UserInventory = {
  cars: MOCK_CARS,
  materials: MOCK_MATERIALS,
  rcnBalance: 2450.75,
  solBalance: 12.5,
};

// ==========================================
// MOCK STATS
// ==========================================

export const MOCK_USER_STATS: UserStats = {
  todayRaces: 18,
  todayEarnings: 45.8,
  refillsUsed: 2,
  refillsAvailable: 3,
  nextResetTime: new Date().setHours(24, 0, 0, 0),
};

// ==========================================
// GERADOR DE CARRO ALEATÓRIO (CORRIGIDO)
// ==========================================

export function generateRandomCar(): CarNFT {
  const rarities = Object.values(CarRarity);
  const weights = [45, 25, 15, 8, 4, 2, 1];
  
  const random = Math.random() * 100;
  let selectedRarity = CarRarity.COMMON;
  let cumulative = 0;
  
  for (let i = 0; i < rarities.length; i++) {
    cumulative += weights[i];
    if (random <= cumulative) {
      selectedRarity = rarities[i];
      break;
    }
  }
  
  // Pega os ranges de atributos para a raridade
  const rarityData = RARITY_DISTRIBUTION[selectedRarity];
  const baseMin = rarityData.baseMin;
  const baseMax = rarityData.baseMax;
  
  // Gera atributos aleatórios dentro do range
  const generateAttr = () => Math.floor(Math.random() * (baseMax - baseMin + 1)) + baseMin;
  
  const technology = generateAttr();
  const fuelCapacity = getRacesPerTank(technology);
  
  return {
    id: `car-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: `${selectedRarity} Racer #${Math.floor(Math.random() * 9999)}`,
    rarity: selectedRarity,
    attributes: {
      acceleration: generateAttr(),
      technology: technology,
      trunk: generateAttr(),
      control: generateAttr(),
    },
    imageUrl: '/images/car-default.png',
    fuelLevel: 100,
    fuelCapacity: fuelCapacity,
    racesRemainingToday: fuelCapacity,
    maintenanceDue: 0,
    needsMaintenance: false,
  };
}