# Stealverse LiveOps Systems Specification

## System Architecture

All systems are browser-local and persist via localStorage.

### State Management
```typescript
interface PlayerState {
  heat: number;
  maxHeat: number;
  objects: GameObject[];
  crew: CrewMember[];
  wealth: number;
  prestige: number;
  seasonalProgress: Record<string, number>;
  extractionSuccess: number;
  extractionFails: number;
  replayCount: number;
}
```

## Detailed Systems

### 1. Heat Engine
- **Current Heat**: Displayed in real-time
- **Thresholds**:
  - 0–25: Safe zone (basic guards)
  - 26–50: Moderate zone (bounty hunters active)
  - 51–75: Danger zone (drones deployed)
  - 76–100: Critical zone (high-value drops only)
- **Decay**: Passive -1 Heat per minute (simulated)
- **Increase**: +30 on failed extraction, +50 on public announcement

### 2. Object Catalog
**39 Objects** organized by season and category.

**Mutation System**:
```
Common → [Gold → Diamond → Rainbow]
         [Giant/Tiny]
         [Glitched/Alien/Cursed]
```

Each mutation increases value by 1.5–3x.

### 3. Extraction System
- **Success Rate Formula**: `1 - (heat / maxHeat) * 0.5`
- **Safe Return**: Fixed reward, ~90% success
- **Public Extraction**: 3x multiplier, ~50% base success
- **Announcement**: Public extractions trigger global feed update

### 4. Crew Heists
- **3-Minute Timer**: Countdown to contract completion
- **Reward Preview**: Show estimated payout before committing
- **Escalation**: Each tier requires higher crew level
- **Failure Cost**: -30% reward on failure

### 5. Prestige Cycle
```
1. Reach wealth milestone (e.g., $100,000)
2. Choose prestige reset
3. Convert wealth → prestige points
4. Reset: Heat → 0, Objects → fresh catalog, Wealth → 0
5. Multiplier applies to future earnings
```

### 6. Seasonal Worlds
- **Limited Object Pools**: Each season offers unique 10 objects
- **Time-Limited Events**: Season duration determines event pool
- **Progression Tracking**: `seasonalProgress[seasonId]` tracks completion
- **Seasonal Challenges**: Special high-reward contracts

### 7. Event Feed
- **Global Announcements**: "ALEX STOLE THE MOON!"
- **Personal Milestones**: "Prestige Level 5!"
- **Server Events**: "Gold Rush Active (2x Multiplier)"
- **Max 50 entries** (rotating FIFO)

### 8. Analytics Dashboard (Demo)
- **DAU**: Simulated player count
- **Session Metrics**: Avg steals/session, session length
- **Extraction Rates**: % success by heat band
- **Rarity Distribution**: Object rarity breakdown
- **Prestige Curve**: Players per prestige level

### 9. Entitlements (Planned)
- Cosmetics (crew skins, object decals)
- Luck boosts (+20% success for 1 hour)
- Event passes (exclusive seasonal objects)
- Display slots (show extra objects in collection)

**Note**: Demo does not implement purchases or real entitlements.

## Persistence
- **Key**: `stealverse_state`
- **Size**: ~50KB for typical progression
- **Backup**: LocalStorage auto-clears on browser data clear
- **No Server Sync**: All data is browser-local

## Performance Targets
- **Load Time**: <2s (Vite optimized build)
- **Frame Rate**: 60 FPS (CSS animations, no heavy compute)
- **State Update**: <16ms (localStorage write is async, non-blocking)

## Future Roblox Integration
See `ROBLOX-HANDOFF.md` for mapping to production systems.
