import { describe, expect, it } from 'vitest'
import { createInitialState } from '../data/demoState'
import { objects } from '../data/objects'
import { extract, heatLabel, steal } from '../lib/gameEngine'

describe('Stealverse game engine', () => {
  it('adds a stolen object to inventory and increases Heat', () => {
    const state = createInitialState()
    const next = steal(state, objects[0])
    expect(next.inventory).toContain(objects[0].id)
    expect(next.heat).toBe(state.heat + objects[0].heat)
  })
  it('returns a safe extraction to the base with lower Heat', () => {
    const state = steal(createInitialState(), objects[0])
    const result = extract(state, objects[0], 'safe')
    expect(result.inventory).not.toContain(objects[0].id)
    expect(result.coins).toBeGreaterThan(state.coins)
    expect(result.heat).toBeLessThan(state.heat)
  })
  it('maps major Heat thresholds to readable effects', () => {
    expect(heatLabel(20)).toBe('LOW PROFILE')
    expect(heatLabel(40)).toBe('GUARDS ACTIVE')
    expect(heatLabel(65)).toBe('BOUNTY HUNTERS')
    expect(heatLabel(85)).toBe('DRONES LOCKED')
  })
})
