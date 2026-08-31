import type { DemoState } from '../types'
const key = 'stealverse-liveops-state-v1'
export const loadState = (): DemoState | null => { try { const saved = localStorage.getItem(key); return saved ? JSON.parse(saved) as DemoState : null } catch { return null } }
export const saveState = (state: DemoState) => { try { localStorage.setItem(key, JSON.stringify(state)) } catch { /* local demo remains playable if storage is unavailable */ } }
