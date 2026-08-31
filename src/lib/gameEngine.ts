import type { Announcement, DemoState, GameObject, Mutation } from '../types'
import { rarityMultiplier } from './rarity'

export const heatLabel = (heat: number) => heat >= 85 ? 'DRONES LOCKED' : heat >= 65 ? 'BOUNTY HUNTERS' : heat >= 40 ? 'GUARDS ACTIVE' : 'LOW PROFILE'
export const collectIncome = (state: DemoState): DemoState => ({ ...state, coins: state.coins + state.income, announcements: ([{ id: Date.now(), text: `BASE BANKED ${state.income.toLocaleString()} COINS`, detail: 'Passive income collected from your base.', tone: 'blue' }, ...state.announcements] as Announcement[]).slice(0, 5) })
export const steal = (state: DemoState, object: GameObject): DemoState => ({ ...state, inventory: [...state.inventory, object.id], discoveries: [...new Set([...state.discoveries, object.id])], heat: Math.min(100, state.heat + object.heat), steals: state.steals + 1, announcements: ([{ id: Date.now(), text: `YOU STOLE ${object.name.toUpperCase()}!`, detail: `Heat +${object.heat}. Choose your extraction.`, tone: 'lime' }, ...state.announcements] as Announcement[]).slice(0, 5) })
export const extract = (state: DemoState, object: GameObject, mode: 'safe' | 'public', mutation?: Mutation): DemoState => {
  const bonus = mutation ? 1.5 : 1
  const risk = mode === 'public' && state.heat > 60
  const escaped = !risk || (state.steals + object.heat) % 3 !== 0
  const earned = escaped ? Math.round(object.value * rarityMultiplier[object.rarity] * (mode === 'public' ? 2 : 1) * bonus) : 0
  return { ...state, coins: state.coins + earned, heat: mode === 'safe' ? Math.max(0, state.heat - 18) : Math.min(100, state.heat + 10), inventory: state.inventory.filter((id) => id !== object.id), escapes: state.escapes + Number(escaped), publicExtractions: state.publicExtractions + Number(mode === 'public'), safeReturns: state.safeReturns + Number(mode === 'safe'), failedHeists: state.failedHeists + Number(!escaped), announcements: ([{ id: Date.now(), text: escaped ? `${mode === 'public' ? 'PUBLIC' : 'SAFE'} EXTRACTION: +${earned.toLocaleString()}` : 'EXTRACTION BUSTED!', detail: escaped ? `${mutation ?? 'Clean'} ${object.name} reached your base.` : 'The target was reclaimed. Lower Heat and regroup.', tone: escaped ? 'lime' : 'pink' }, ...state.announcements] as Announcement[]).slice(0, 5) }
}
