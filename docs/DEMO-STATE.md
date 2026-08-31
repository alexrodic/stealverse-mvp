# Stealverse Demo State Specification

## Initial State

When a player first loads Stealverse:

```typescript
const initialState: PlayerState = {
  heat: 0,
  maxHeat: 100,
  objects: [39 catalog items],
  crew: [4 starter crew members],
  wealth: 0,
  prestige: 0,
  seasonalProgress: {
    'neon_city': 0,
    'ocean_depths': 0,
    'sky_islands': 0,
    'void_realm': 0,
  },
  extractionSuccess: 0,
  extractionFails: 0,
  replayCount: 0,
};
```

## Catalog (39 Objects)

### Furniture (10)
- Diamond Circuits (Rare)
- Quantum Shards (Rare)
- Void Essence (Epic)
- Stellar Gems (Epic)
- Plasma Cores (Legendary)
- Chromatic Crystals (Legendary)
- Nexus Artifacts (Epic)
- Binary Pearls (Rare)
- Synthesis Stones (Rare)
- Echo Fragments (Common)

### Vehicles (10)
- Prism Vials (Common)
- Flux Capacitors (Rare)
- Void Keys (Rare)
- Memory Chips (Epic)
- Spectral Locks (Epic)
- Temporal Coins (Legendary)
- Cosmic Dust (Legendary)
- Solar Panels (Rare)
- Lunar Mirrors (Common)
- Entropy Stones (Common)

### Structures (10)
- Kinetic Plates (Common)
- Harmonic Tuners (Rare)
- Catalyst Rods (Rare)
- Beacon Stones (Epic)
- Shadow Vessels (Epic)
- Light Anchors (Legendary)
- Wave Resonators (Legendary)
- Pulse Generators (Rare)
- Gravity Anchors (Common)
- Energy Batteries (Common)

### Celestial (9)
- Matter Compressors (Common)
- Signal Boosters (Rare)
- Dimension Rifts (Rare)
- Phase Modulators (Epic)
- Quantum Locks (Epic)
- Reality Shards (Legendary)
- Singularity Cores (Legendary)
- Infinity Stones (Legendary)
- Void Anchors (Rare)

## Crew Members

1. **Alex** (Driver) — Speed Master
2. **Morgan** (Lookout) — Eagle Eye
3. **Jordan** (Fence) — Master Fence
4. **Casey** (Infiltrator) — Lockpick Pro

All start at Level 1.

## Seasonal Worlds

### Neon City
- Theme: Cyberpunk metropolis
- Difficulty: 1 (Easiest)
- Objects: Tech-themed (Flux Capacitors, Solar Panels, etc.)
- Reward: $1,000–$3,000
- Status: Active

### Ocean Depths
- Theme: Underwater realm
- Difficulty: 2
- Objects: Aquatic-themed (Void Essence, Wave Resonators, etc.)
- Reward: $2,000–$5,000
- Status: Active

### Sky Islands
- Theme: Floating islands
- Difficulty: 3
- Objects: Air-themed (Gravity Anchors, Beacon Stones, etc.)
- Reward: $3,000–$7,000
- Status: Coming Soon

### Void Realm
- Theme: Cosmic emptiness
- Difficulty: 4 (Hardest)
- Objects: Space-themed (Singularity Cores, Reality Shards, etc.)
- Reward: $5,000–$10,000
- Status: Coming Soon

## Server Events (Sample)

1. **Luck Events** (increase rewards)
   - 2x Multiplier
   - 5x Multiplier
   - 10x Multiplier

2. **Hazard Events** (increase heat)
   - Zero Gravity
   - Meteor Shower
   - Alien Invasion

3. **Spawn Events** (unique objects)
   - Secret Stash
   - Gold Rush
   - Hidden Artifact

4. **World Events** (affect all)
   - Everything Is Giant
   - Everything Is Tiny
   - All Objects Gold

## Progression Milestones

- **First Steal**: +100 XP
- **1st Prestige**: $100,000 wealth
- **5x Crew Heists**: +50 XP
- **All Objects Found**: +500 XP
- **Heat Survival**: Survive Heat 100 for 10 min

## Demo Limits

- **Max Wealth**: $999,999 (display limit)
- **Max Heat**: 100 (hard cap)
- **Max Prestige**: 10 (soft cap, can exceed)
- **Extraction Cooldown**: Instant (no real-time cooldown)
- **Session Length**: Unlimited (browser local)

## Storage

- **LocalStorage Key**: `stealverse_state`
- **Size**: ~50 KB typical
- **Format**: JSON
- **Backup**: None (browser local only)
- **Export**: Manual download JSON option (future)

## Reset Mechanics

### Soft Reset (Prestige)
```
1. Choose prestige
2. Confirm wealth → prestige conversion
3. Heat → 0
4. Objects → Fresh catalog
5. Wealth → 0
6. Crew → Kept + XP applied
7. Replay count += 1
```

### Hard Reset (Clear Data)
```
1. Clear LocalStorage key
2. Reload page
3. Fresh initial state
```

## Analytics Events (Demo)

- `game_start` — First load
- `session_start` — Each session
- `steal_complete` — Object stolen
- `extraction_attempt` — Extraction initiated
- `extraction_success` — Extraction landed
- `extraction_fail` — Extraction failed
- `prestige_reset` — Prestige redeemed
- `crew_heist_start` — Contract accepted
- `crew_heist_complete` — Contract finished
- `heat_milestone` — Heat reaches threshold
- `season_progress` — Seasonal world completion
