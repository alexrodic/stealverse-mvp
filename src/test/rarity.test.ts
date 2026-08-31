import { describe, expect, it } from 'vitest'
import { objects } from '../data/objects'
import { rarityMultiplier } from '../lib/rarity'
import { mutations, rarities } from '../types'

describe('content catalog', () => {
  it('contains the requested collectible scale and all rarity tiers', () => {
    expect(objects.length).toBeGreaterThanOrEqual(39)
    expect(new Set(objects.map((object) => object.rarity))).toEqual(new Set(rarities))
  })
  it('includes the full mutation plan and increasing rarity reward multipliers', () => {
    expect(mutations).toEqual(['Gold', 'Diamond', 'Rainbow', 'Giant', 'Tiny', 'Glitched', 'Alien', 'Cursed', 'Cosmic'])
    expect(rarityMultiplier.Impossible).toBeGreaterThan(rarityMultiplier.Mythic)
  })
})
