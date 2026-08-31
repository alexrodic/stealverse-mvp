import type { Rarity } from '../types'
export const rarityMultiplier: Record<Rarity, number> = { Common: 1, Uncommon: 1.3, Rare: 1.7, Epic: 2.3, Legendary: 3.2, Mythic: 4.5, Impossible: 7 }
export const rarityClass = (rarity: Rarity) => `rarity-${rarity.toLowerCase()}`
