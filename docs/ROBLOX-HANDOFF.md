# Roblox production handoff

This Vite app is a presentation and systems prototype. Port data and rules into Roblox with server authority:

| Demo concern | Roblox destination |
| --- | --- |
| Objects, rarities, mutations | Replicated content definitions plus server validation module |
| Steal/extract rules | Server `ModuleScript`; RemoteEvents only request actions |
| Currency, inventory, base level | Server-owned profile / DataStore-backed persistence |
| Heat and bounty states | Server-owned player/session service, replicated as read-only UI data |
| Events and announcements | Scheduled server service plus MessagingService where appropriate |
| Crews and heists | Matchmaking/session orchestration with server participant checks |
| Entitlements | Platform-native Roblox commerce checks; cosmetic-only catalog |

Never trust the client for coin awards, ownership, public extraction outcomes, purchase grants, crew eligibility, or event timing. Add rate limits, idempotency, telemetry, moderation, rollback, and privacy review before production.
