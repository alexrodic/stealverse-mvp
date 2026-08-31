# Stealverse Game Design Document

## Overview

Stealverse is a browser-local LiveOps demo showcasing a complete ecosystem for the Roblox concept "STEAL A WORLD."

**Core Loop**: See → Steal → Escape → Collect → Prestige → Replay

## Core Mechanics

### Heat System
- **Range**: 0–100
- **Increases**: On failed extractions, high-value steals, public announcements
- **Decreases**: On successful steals, time passage
- **Effect**: Higher Heat = lower success rate, but higher rewards

### Objects
39 stealable items across 4 categories:
1. **Furniture** (chairs, tables, lamps)
2. **Vehicles** (cars, motorcycles, hoverboards)
3. **Structures** (towers, satellites, monuments)
4. **Celestial** (planets, moons, asteroids)

#### Rarity Tiers
- Common (white)
- Rare (blue)
- Epic (purple)
- Legendary (gold)
- Impossible (rainbow)

#### Mutations
Objects can mutate into:
- Gold, Diamond, Rainbow (value multipliers)
- Giant, Tiny (size variants)
- Glitched, Alien, Cursed (special effects)
- Cosmic (highest rarity)

### Extraction Mechanics
- **Safe Return**: 90% success, $1,000–$5,000 reward
- **Public Extraction**: 50% success, $3,000–$15,000 reward + public announcement
- **Risk Scaling**: Heat affects success rate linearly

### Crew Heists
Team-based 3-minute contracts:
1. **Duo Heist** (2 crew members, $2,000–$5,000)
2. **Squad Heist** (4 crew members, $5,000–$10,000)
3. **Mega Heist** (6 crew members, $10,000–$25,000)

### Prestige System
- Convert wealth to Prestige levels
- Each prestige increases reward multipliers
- Resets wealth, Heat, and inventory on prestige
- Tracks lifetime prestige

### Seasonal Worlds
1. **Haunted Suburb** — October theme, spooky objects
2. **Neon Mega City** — Cyberpunk theme, tech objects
3. **Dino Island** — Prehistoric theme, creature/monument objects
4. **Moonfall** — Space theme, celestial objects

## Server Events
100+ global events that affect all players:
- Luck multipliers (2x, 5x, 10x)
- Hazards (Zero Gravity, Meteor Shower)
- Spawns (Secret Stash, Gold Rush)
- Announcements (Alien Invasion, Everything Is Giant)

## Analytics
- DAU, session length, steals per session
- Extraction success rate, public vs. safe ratio
- Heat trends, most stolen objects
- Rarity distribution
- Prestige progression

## Visual Style
- **Theme**: Deep space, tech-forward, playful
- **Colors**: Electric blue, cosmic purple, acid lime, sun yellow, neon pink
- **Typography**: Baloo 2 (display) + Outfit (body)
- **UI**: Oversized, high contrast, immediately readable

## Demo Limitations
- No real-time multiplayer
- No Robux purchases
- No production analytics
- All state in localStorage
- Single-player only
