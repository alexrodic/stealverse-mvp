import type { ServerEvent } from '../types'
export const events: ServerEvent[] = [
  { id: 'luck', name: '100x Luck', icon: '🍀', effect: 'Rare and Impossible object radar is boosted.', duration: '12:44', accent: 'lime' },
  { id: 'gravity', name: 'Zero Gravity', icon: '🪐', effect: 'Carry weight is cut in half for every crew.', duration: '08:21', accent: 'blue' },
  { id: 'meteor', name: 'Meteor Shower', icon: '☄️', effect: 'Meteor objects rain into every public zone.', duration: '04:58', accent: 'pink' },
  { id: 'alien', name: 'Alien Invasion', icon: '👽', effect: 'Alien mutation chance is doubled.', duration: '18:09', accent: 'purple' },
  { id: 'secret', name: 'Secret Spawn', icon: '🔮', effect: 'One impossible object is broadcasting its location.', duration: '02:00', accent: 'purple' },
  { id: 'gold', name: 'Gold Rush', icon: '🏆', effect: 'Gold mutations pay 2× on return.', duration: '10:32', accent: 'yellow' },
  { id: 'crash', name: 'Moon Crash', icon: '🌙', effect: 'Moonfall loot is available across the map.', duration: '06:15', accent: 'pink' },
  { id: 'giant', name: 'Everything Is Giant', icon: '🦖', effect: 'Giant mutation objects arrive with extra Heat.', duration: '15:00', accent: 'blue' },
]
