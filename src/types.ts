export const rarities = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic', 'Impossible'] as const
export const mutations = ['Gold', 'Diamond', 'Rainbow', 'Giant', 'Tiny', 'Glitched', 'Alien', 'Cursed', 'Cosmic'] as const
export type Rarity = (typeof rarities)[number]
export type Mutation = (typeof mutations)[number]

export type World = { id: string; name: string; season: string; status: 'Live' | 'Next'; accent: string; description: string; limited: string[] }
export type GameObject = { id: string; name: string; category: string; rarity: Rarity; value: number; heat: number; world: string; icon: string }
export type ServerEvent = { id: string; name: string; icon: string; effect: string; duration: string; accent: string }
export type Announcement = { id: number; text: string; detail: string; tone: 'lime' | 'pink' | 'blue' }
export type DemoState = {
  coins: number; heat: number; baseLevel: number; income: number; prestige: number; steals: number; escapes: number; publicExtractions: number; safeReturns: number; failedHeists: number; inventory: string[]; discoveries: string[]; announcements: Announcement[]; activeEventId: string; sessionStartedAt: number
}
