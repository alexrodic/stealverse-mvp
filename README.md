# Stealverse MVP - STEAL A WORLD

> **Local Demo Only** — Browser-local LiveOps Hub showcase for the Roblox concept "STEAL A WORLD."

A complete, demo-ready web application showcasing an integrated LiveOps ecosystem with Heat systems, Crew Heists, object catalogs, extraction mechanics, seasonal worlds, and analytics—all running in the browser with localStorage persistence.

**If you can see it, you can steal it.**

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## What's Included

### 🎮 Complete LiveOps Systems
- **Heat System** — Dynamic risk/reward with global Heat levels (0–100)
- **39 Objects** — Categorized catalog with rarity tiers and mutation mechanics
- **Crew Heists** — 3 team tiers (Duo, Squad, Mega) with time-limited contracts
- **Extraction Mechanics** — Safe return vs. public extraction with risk multipliers
- **100 Server Events** — Global events affecting gameplay (Luck, Zero Gravity, Gold Rush, Alien Invasion, etc.)
- **Seasonal Worlds** — 4 themed environments with unique object pools
- **Prestige System** — Convert wealth to prestige for long-term progression
- **Analytics Dashboard** — Demo DAU, engagement metrics, rarity distribution

### 🎨 Visual Direction
- **Deep Space Theme** — Dark, tech-forward aesthetic
- **Brand Colors** — Electric Blue (#1E90FF), Cosmic Purple (#7A2BE2), Acid Lime (#C6FF00), Sun Yellow (#FFD700), Neon Pink (#FF2D8A)
- **Responsive Design** — Mobile-first, works on all screen sizes
- **Tailwind CSS** — Utility-first styling with custom brand extensions

### 📱 Key Features
- ✅ Public landing page with core loop explanation
- ✅ Interactive LiveOps Hub (no login required)
- ✅ Browser-local state persistence (localStorage)
- ✅ Real-time announcements (e.g., "ALEX STOLE THE MOON!")
- ✅ Collection tracking with rarity/silhouettes
- ✅ Event feed and global multipliers
- ✅ Crew team management
- ✅ Mobile-responsive UI
- ✅ **Clear "Demo Mode" disclaimer** (no production backend)

---

## Build & Test

```bash
# Type checking
npm run typecheck

# Production build
npm run build

# Preview production build locally
npm preview
```

The build output is optimized for Vercel deployment (see `vercel.json`).

---

## Project Structure

```
stealverse-mvp/
├─ src/
│  ├─ main.ts              # Entry point with all systems
│  ├─ style.css            # Global styles + Tailwind
│  ├─ types.ts             # TypeScript interfaces
│  ├─ data/
│  │  ├─ objects.ts        # 39-object catalog definitions
│  │  ├─ events.ts         # Server event definitions
│  │  ├─ worlds.ts         # Seasonal worlds
│  │  └─ demoState.ts      # Initial demo state
│  └─ lib/
│     ├─ gameEngine.ts     # Heat, extraction, prestige logic
│     ├─ storage.ts        # localStorage persistence
│     └─ rarity.ts         # Rarity mutation system
├─ package.json            # Dependencies & scripts
├─ vite.config.ts          # Vite build config
├─ tsconfig.json           # TypeScript config
├─ index.html              # HTML entry point
├─ vercel.json             # Vercel deployment config
├─ README.md               # This file
├─ docs/
│  ├─ GAME-DESIGN.md       # Core mechanics
│  ├─ LIVEOPS-SYSTEMS.md   # Detailed systems spec
│  └─ ROBLOX-HANDOFF.md    # Future Roblox integration guide
└─ .gitignore             # Git ignore rules
```

---

## Demo Limitations

This is a **browser-local demo only**:

- ❌ No Roblox DataStore integration
- ❌ No multiplayer/server backend
- ❌ No Robux (real currency) purchases
- ❌ No production analytics
- ❌ Data resets on browser clear

All game state is stored in `localStorage` under the key `stealverse_state`.

---

## Key Systems

### Heat System
Heat represents police/bounty hunter attention. Higher Heat = lower extraction success rate, but more valuable drops available.

### Extraction Risk/Reward
- **Safe Return**: ~90% success, low reward
- **Public Extraction**: ~50% success, 3x reward multiplier, public announcement

### Crew Heists
Teams of 2, 4, or 6 members complete 3-minute contracts for escalating rewards.

### Prestige
Convert accumulated wealth to Prestige levels and replay for increased difficulty + rewards.

### Seasonal Worlds
4 themed worlds (Haunted Suburb, Neon Mega City, Dino Island, Moonfall) with unique object pools and events.

---

## Roblox Handoff

This MVP is designed as a playable preview of Roblox game systems. See `docs/ROBLOX-HANDOFF.md` for mapping demo features to Roblox services (DataStore, MessagingService, GroupService, etc.).

---

## Deployment

### Vercel
1. Connect your GitHub repo to Vercel
2. Build Command: `npm run build`
3. Output Directory: `dist`

Vercel automatically serves `dist/index.html` for all routes (SPA fallback configured in `vercel.json`).

### Local Preview
```bash
npm run build
npm run preview
```

---

## Contributing

This is a demo showcase. Contributions should maintain the playful, deep-space aesthetic and avoid adding production backend claims.

---

## License

MIT

---

**Built with [MadeThis](https://madethis.com) • Showcasing the STEAL A WORLD concept for Roblox**