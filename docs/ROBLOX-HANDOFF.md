# Stealverse → Roblox Handoff Guide

## Overview

This document maps Stealverse browser-local systems to production Roblox services.

## System Mapping

### Heat System
**Demo**: Browser state, localStorage persistence  
**Roblox**:
- **Service**: DataStore or custom state server
- **Replication**: Heartbeat updates to all clients
- **Validation**: Server-authoritative heat computation
- **Persistence**: Global leaderboard, per-player history

### Object Catalog
**Demo**: Static array of 39 objects  
**Roblox**:
- **Service**: Config table or CMS
- **Variants**: Server generates mutations per session
- **Economy**: Value balance via server config
- **Distribution**: Weighted rarity pools per season

### Extraction Mechanic
**Demo**: Client-side success roll  
**Roblox**:
- **Service**: RemoteFunction validation
- **Server Role**: Calculate success, handle failure penalties
- **Anti-Cheat**: Validate extraction context (location, heat, crew)
- **Replication**: Announce to all players on public extraction

### Crew Heists
**Demo**: Solo player, simulated crew  
**Roblox**:
- **Service**: Party system (GroupService or custom)
- **Contract**: RemoteEvent to accept, RemoteFunction to complete
- **Rewards**: Per-player cash + crew XP
- **Matchmaking**: Queue system or friend-only

### Prestige
**Demo**: Local reset + multiplier  
**Roblox**:
- **Service**: DataStore for prestige rank
- **Migration**: Clear active session data, preserve cosmetics
- **Cosmetic Unlock**: Prestige milestones grant badges/perks
- **Leaderboard**: Global prestige rankings

### Seasonal Worlds
**Demo**: UI toggle between 4 worlds  
**Roblox**:
- **Service**: Place instances (separate maps) or terrain swapping
- **Spawn Pool**: World determines available objects
- **Time Limit**: Server rotates world every 2 weeks
- **Persistent Progress**: Seasonal leaderboard per world

### Event Feed
**Demo**: Local feed, simulated announcements  
**Roblox**:
- **Service**: MessagingService for broadcasts
- **Replication**: All players receive global announcements
- **Persistence**: Leaderboard/feed database
- **Moderation**: Filter announcements by content policy

### Analytics
**Demo**: Simulated metrics  
**Roblox**:
- **Service**: Custom analytics server or external (Amplitude, Mixpanel)
- **Events**: Track steals, extractions, prestige, heat milestones
- **Funnels**: Retention, progression curves, monetization
- **Real-Time Dashboards**: Studio integration with custom graphs

## Code Migration Path

### Phase 1: Port Core Engine
```typescript
// src/lib/gameEngine.ts → game/ServerScriptService/GameEngine.luau
// Port Heat calculation, extraction formula, prestige logic
```

### Phase 2: Add Networking
```lua
-- game/ServerScriptService/Services/ExtractionService.lua
-- Validate extraction requests from clients
-- Replicate heat changes via RemoteFunction
```

### Phase 3: Persistence
```lua
-- game/ServerScriptService/Services/DataService.lua
-- Wrap all state changes with DataStore saves
```

### Phase 4: Multiplayer
```lua
-- game/Players/PlayerGui/LiveOpsHub.lua
-- Listen to MessagingService for global events
-- Replicate crew/team state
```

## Anti-Cheat Considerations

1. **Client-Server Validation**: Never trust client wealth/heat calculations
2. **Extraction Verification**: Server confirms object exists, crew available, extraction valid
3. **Rate Limiting**: Max 1 extraction per 2 seconds
4. **Teleport Detection**: Validate extraction location vs. player position
5. **Replay Protection**: Cache recent extractions server-side

## Monetization Hooks

Demo does not implement purchases. In Roblox:

- **Luck Boosts**: $4.99 USD = 1 hour of +30% extraction success
- **Event Pass**: $9.99 USD = access to exclusive seasonal objects
- **Cosmetics**: $1.99 USD per crew member skin
- **Starter Pack**: $19.99 USD = $5,000 starter wealth + cosmetics

## Testing Checklist for Production

- [ ] Heat persists across game sessions
- [ ] Extraction rewards scale correctly with prestige
- [ ] Crew heist contracts fail gracefully
- [ ] Seasonal worlds rotate on schedule
- [ ] Public announcements replicate to all players
- [ ] Analytics events fire correctly
- [ ] Anti-cheat detects heat/wealth manipulation
- [ ] Prestige reset clears only appropriate data
- [ ] Mobile clients work on low bandwidth

## Timeline

- **Week 1–2**: Core engine port + basic networking
- **Week 3–4**: Persistence layer + anti-cheat
- **Week 5–6**: Multiplayer + event system
- **Week 7–8**: Analytics + monitoring
- **Week 9+**: Optimization + soft launch
