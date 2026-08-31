import type { World } from '../types'
export const worlds: World[] = [
  { id: 'haunted', name: 'Haunted Suburb', season: 'S1: Nightfall', status: 'Live', accent: 'pink', description: 'Cursed collectibles, haunted houses, and a nightly moon raid.', limited: ['Haunted TV', 'Cursed Crown', 'Haunted Mansion'] },
  { id: 'neon', name: 'Neon Mega City', season: 'S2: Neon Rush', status: 'Live', accent: 'blue', description: 'Boost through a glowing city packed with rare street loot.', limited: ['Neon Dragon', 'Golden Supercar', 'Rainbow Road'] },
  { id: 'dino', name: 'Dino Island', season: 'S3: Fossil Frenzy', status: 'Next', accent: 'lime', description: 'Steal ancient chaos before the volcano does.', limited: ['Dino Egg', 'T-Rex', 'Dino Volcano'] },
  { id: 'moon', name: 'Moonfall', season: 'S4: Orbital Heist', status: 'Next', accent: 'purple', description: 'An impossible world where the moon is fair game.', limited: ['Moon Buggy', 'Alien King', 'The Moon'] },
]
