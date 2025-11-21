# Apex Racers - Frontend Demo Development Plan

## Project Overview
A complete frontend demo for Apex Racers P2E racing game on Solana blockchain with full UI/UX implementation of all game mechanics described in the whitepaper.

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + Shadcn-UI
- Phaser 3 (for racing game visuals)
- Solana Web3.js + Wallet Adapter (for wallet connection UI)
- Zustand (state management)

## File Structure & Implementation Plan

### 1. Core Configuration Files
- [x] `package.json` - Dependencies and scripts
- [x] `tsconfig.json` - TypeScript configuration
- [x] `tailwind.config.ts` - Tailwind + theme configuration
- [x] `next.config.js` - Next.js configuration

### 2. Types & Interfaces (`src/types/`)
- [ ] `game.types.ts` - Car NFT, attributes, races, materials
- [ ] `economy.types.ts` - Token, pricing, rewards
- [ ] `user.types.ts` - User profile, garage, inventory

### 3. Mock Data & Constants (`src/lib/`)
- [ ] `constants.ts` - Game constants (rarities, costs, ROI table)
- [ ] `mockData.ts` - Mock cars, materials, user data
- [ ] `calculations.ts` - ROI, rewards, crafting calculations
- [ ] `priceOracle.ts` - Mock price oracle (SOL/USD)

### 4. State Management (`src/store/`)
- [ ] `useGameStore.ts` - Global game state (Zustand)
- [ ] `useWalletStore.ts` - Wallet connection state

### 5. Core Components (`src/components/`)
- [ ] `Navbar.tsx` - Top navigation with wallet connect
- [ ] `Sidebar.tsx` - Game navigation menu
- [ ] `CarCard.tsx` - NFT car display card
- [ ] `AttributeBar.tsx` - Visual attribute display
- [ ] `StatsPanel.tsx` - Player stats dashboard

### 6. Game Pages (`src/app/`)
- [ ] `page.tsx` - Landing/Home page
- [ ] `garage/page.tsx` - Garage management (cars, upgrades)
- [ ] `race/page.tsx` - Race selection & execution
- [ ] `crafting/page.tsx` - Material refining & crafting
- [ ] `marketplace/page.tsx` - NFT & items marketplace
- [ ] `staking/page.tsx` - Staking & governance dashboard
- [ ] `referral/page.tsx` - Referral system
- [ ] `mint/page.tsx` - NFT minting page

### 7. Racing Game Component
- [ ] `components/RaceGame.tsx` - Phaser 3 integration wrapper
- [ ] `lib/phaser/RaceScene.ts` - Main race scene
- [ ] `lib/phaser/CarSprite.ts` - Car sprite logic

### 8. Wallet Integration
- [ ] `components/WalletButton.tsx` - Wallet connection button
- [ ] `lib/wallet.ts` - Wallet adapter configuration

## Development Phases

### Phase 1: Foundation (Files 1-4)
Setup project structure, types, constants, and mock data

### Phase 2: Core UI (Files 5-6)
Build reusable components and layout structure

### Phase 3: Game Pages (File 6)
Implement all main game functionality pages

### Phase 4: Racing Game (File 7)
Integrate Phaser 3 racing visualization

### Phase 5: Wallet & Polish (File 8)
Add wallet connection UI and final polish

## Key Features to Implement

✅ **NFT Car System**
- Display cars with rarity, attributes, levels
- Visual upgrade progression
- Cooldown timers

✅ **Racing Mechanics**
- 3 race types (Drag, Street, Scavenge)
- Reward calculation based on attributes
- Fuel/maintenance system
- 5-minute cooldown per car

✅ **Economy Simulation**
- USD-pegged pricing via mock oracle
- RCN token burn/distribution visualization
- ROI calculator
- Daily reset mechanics

✅ **Crafting System**
- Material drops visualization
- Refining & fusion mechanics
- Upgrade cost calculation

✅ **Marketplace**
- NFT listing/buying UI
- Item trading interface
- Fee structure display

✅ **Staking & Governance**
- Staking pools with lock periods
- Reward multipliers
- DAO voting interface (UI only)

✅ **Referral System**
- Code generation
- Commission tracking dashboard

## Notes
- All blockchain interactions are MOCKED
- Wallet connection is UI-only (no real transactions)
- Focus on UX/UI excellence and visual polish
- Prepare architecture for future smart contract integration