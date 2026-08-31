# Stealverse — Steal a World

Stealverse is a browser-local, no-login **LiveOps Hub demo** for the fictional Roblox experience *Steal a World*. It turns the approved cosmic-neon brand system into a responsive public launch site and interactive progression simulation.

> **Demo mode — no live Roblox backend connected.** All state lives in this browser; this is not a Roblox game client, DataStore, multiplayer server, commerce system, or analytics service.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite. The public launch page opens first; select **Play the LiveOps Hub** to use the demo.

## Validate

```bash
npm run lint
npm test
npm run build
```

## Included systems

- A mobile-first launch site using the approved brand cues: deep space, electric blue (`#1378ff`), cosmic purple, acid lime (`#c6ff00`), sun yellow, and neon pink.
- Browser-local `localStorage` game state and an explicit demo boundary notice.
- 39 data-driven objects spanning **Common → Impossible**; object values, Heat, worlds, and rarity live in `src/data/objects.ts`.
- Planned mutation set: **Gold, Diamond, Rainbow, Giant, Tiny, Glitched, Alien, Cursed, Cosmic**.
- Heat (0–100), guards/bounty hunters/drones threshold messaging, steal/carry/extraction flow, base income, upgrades, safe returns, and public extraction risk/reward.
- Rotating events, announcement feed, discovery collection, prestige concept, crew contract previews, seasonal worlds, demo analytics, and non-pay-to-win entitlement planning.

## Architecture

- `src/data/` — content catalogs and starter demo state.
- `src/lib/` — deterministic browser-local game rules, storage, formatting, and rarity helpers.
- `src/App.tsx` — public launch page and interactive hub views.
- `src/components/Footer.tsx` — shared footer and MadeThis attribution badge.
- `src/test/` — unit tests for engine thresholds, collection scale, mutations, and rarity behavior.

## Demo boundaries

The demo intentionally has **no** Roblox tokens, APIs, remote endpoints, auth, payment integration, checkout, Robux purchases, external analytics, or fake claims of a live backend. Crew invitations and prestige are visual planning flows only. Browser data can be reset in the UI or cleared from local storage.

## Deploy to Vercel

Import this repository into Vercel, then use:

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

`vercel.json` provides an SPA fallback so direct links resolve to `index.html`.

## Roblox handoff

See `docs/ROBLOX-HANDOFF.md` for the service/module split. The browser engine is a rules reference, not production Roblox authority: the final game must validate all inventory, currency, crews, events, and purchases server-side.

## Brand source

Visual direction comes from the approved Stealverse brand board: neon cosmic world, bold italic display language, oversized action statements, and a playful “see it / steal it / own it / show it” loop. The app uses original inline/vector presentation assets, not a private asset dependency.
