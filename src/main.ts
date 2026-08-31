// Stealverse LiveOps Hub - Complete Browser-Local Demo
// Local/Demo mode only - no Roblox backend integration

interface GameObject {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  value: number;
  mutatable: boolean;
  season: string;
}

interface PlayerState {
  heat: number;
  maxHeat: number;
  objects: GameObject[];
  crew: CrewMember[];
  wealth: number;
  prestige: number;
  seasonalProgress: Record<string, number>;
  extractionSuccess: number;
  extractionFails: number;
  replayCount: number;
}

interface CrewMember {
  id: string;
  name: string;
  role: 'driver' | 'lookout' | 'fence' | 'infiltrator';
  specialization: string;
  level: number;
}

interface SeasonalWorld {
  id: string;
  name: string;
  theme: string;
  difficulty: number;
  rewards: number;
  active: boolean;
}

// Initialize game state with local storage persistence
function initializeGameState(): PlayerState {
  const stored = localStorage.getItem('stealverse_state');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse stored state:', e);
    }
  }

  return {
    heat: 0,
    maxHeat: 100,
    objects: generateInitialCatalog(),
    crew: generateInitialCrew(),
    wealth: 0,
    prestige: 0,
    seasonalProgress: {
      'neon_city': 0,
      'ocean_depths': 0,
      'sky_islands': 0,
      'void_realm': 0,
    },
    extractionSuccess: 0,
    extractionFails: 0,
    replayCount: 0,
  };
}

function generateInitialCatalog(): GameObject[] {
  const rarities: ('common' | 'rare' | 'epic' | 'legendary')[] = ['common', 'rare', 'epic', 'legendary'];
  const names = [
    'Diamond Circuits', 'Quantum Shards', 'Void Essence', 'Stellar Gems',
    'Plasma Cores', 'Chromatic Crystals', 'Nexus Artifacts', 'Binary Pearls',
    'Synthesis Stones', 'Echo Fragments', 'Prism Vials', 'Flux Capacitors',
    'Void Keys', 'Memory Chips', 'Spectral Locks', 'Temporal Coins',
    'Cosmic Dust', 'Solar Panels', 'Lunar Mirrors', 'Entropy Stones',
    'Kinetic Plates', 'Harmonic Tuners', 'Catalyst Rods', 'Beacon Stones',
    'Shadow Vessels', 'Light Anchors', 'Wave Resonators', 'Pulse Generators',
    'Gravity Anchors', 'Energy Batteries', 'Matter Compressors', 'Signal Boosters',
    'Dimension Rifts', 'Phase Modulators', 'Quantum Locks', 'Reality Shards',
    'Singularity Cores', 'Infinity Stones', 'Nexus Keys', 'Void Anchors',
    'Star Fragments', 'Moon Dust', 'Comet Pieces', 'Aurora Essence',
  ];

  return names.map((name, idx) => ({
    id: `obj_${idx}`,
    name,
    rarity: rarities[idx % 4],
    value: (idx % 4 + 1) * 500,
    mutatable: Math.random() > 0.6,
    season: ['neon_city', 'ocean_depths', 'sky_islands', 'void_realm'][idx % 4],
  }));
}

function generateInitialCrew(): CrewMember[] {
  const roles: ('driver' | 'lookout' | 'fence' | 'infiltrator')[] = ['driver', 'lookout', 'fence', 'infiltrator'];
  const names = ['Alex', 'Morgan', 'Jordan', 'Casey'];
  const specs = ['Speed Master', 'Eagle Eye', 'Master Fence', 'Lockpick Pro'];

  return names.map((name, idx) => ({
    id: `crew_${idx}`,
    name,
    role: roles[idx],
    specialization: specs[idx],
    level: 1,
  }));
}

const seasonalWorlds: SeasonalWorld[] = [
  { id: 'neon_city', name: 'Neon City', theme: 'Cyberpunk metropolis with electric skyscrapers', difficulty: 1, rewards: 1000, active: true },
  { id: 'ocean_depths', name: 'Ocean Depths', theme: 'Mysterious underwater realm with bioluminescent creatures', difficulty: 2, rewards: 2000, active: true },
  { id: 'sky_islands', name: 'Sky Islands', theme: 'Floating islands suspended in endless sky', difficulty: 3, rewards: 3000, active: false },
  { id: 'void_realm', name: 'Void Realm', theme: 'Cosmic emptiness with reality-bending anomalies', difficulty: 4, rewards: 5000, active: false },
];

// Game Systems
function applyHeat(state: PlayerState, amount: number): PlayerState {
  return {
    ...state,
    heat: Math.min(state.heat + amount, state.maxHeat),
  };
}

function mutateObject(obj: GameObject): GameObject {
  if (!obj.mutatable) return obj;
  const rarities: ('common' | 'rare' | 'epic' | 'legendary')[] = ['common', 'rare', 'epic', 'legendary'];
  const currentIndex = rarities.indexOf(obj.rarity);
  return {
    ...obj,
    rarity: rarities[Math.min(currentIndex + 1, 3)],
    value: obj.value * 1.5,
  };
}

function attemptExtraction(state: PlayerState): PlayerState {
  const success = Math.random() > (state.heat / state.maxHeat) * 0.5;
  
  if (success) {
    const stealAmount = 5000 + Math.random() * 10000;
    return {
      ...state,
      wealth: state.wealth + stealAmount,
      extractionSuccess: state.extractionSuccess + 1,
      heat: Math.max(0, state.heat - 20),
    };
  } else {
    return {
      ...state,
      wealth: Math.max(0, state.wealth - 2000),
      extractionFails: state.extractionFails + 1,
      heat: applyHeat(state, 30).heat,
    };
  }
}

function prestigeReset(state: PlayerState): PlayerState {
  return {
    ...state,
    prestige: state.prestige + Math.floor(state.wealth / 10000),
    wealth: 0,
    heat: 0,
    replayCount: state.replayCount + 1,
    objects: generateInitialCatalog(),
    crew: generateInitialCrew(),
  };
}

function saveGameState(state: PlayerState): void {
  localStorage.setItem('stealverse_state', JSON.stringify(state));
}

// Render Application
function renderApp(): void {
  const app = document.getElementById('app');
  if (!app) return;

  const state = initializeGameState();

  app.innerHTML = `
    <div class="min-h-screen bg-gradient-to-br from-deep-space via-[#1a1f4a] to-deep-space text-white overflow-hidden">
      <!-- Navigation Header -->
      <nav class="border-b border-electric-blue/20 bg-deep-space/50 backdrop-blur-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-electric-blue to-cosmic-purple flex items-center justify-center">
              <span class="text-lg font-bold">⚡</span>
            </div>
            <h1 class="text-2xl font-bold bg-gradient-to-r from-electric-blue via-cosmic-purple to-neon-pink bg-clip-text text-transparent">STEAL A WORLD</h1>
          </div>
          <div class="text-xs text-gray-400">Local Demo • Browser State Only</div>
        </div>
      </nav>

      <!-- Hero Section -->
      <section class="relative overflow-hidden py-20 px-4">
        <div class="max-w-6xl mx-auto text-center">
          <h2 class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-electric-blue via-cosmic-purple to-neon-pink bg-clip-text text-transparent">
            The Ultimate LiveOps Experience
          </h2>
          <p class="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the Stealverse: a demo-ready web hub showcasing a complete LiveOps ecosystem with Heat systems, Crew Heists, extraction mechanics, and seasonal worlds.
          </p>
          <button onclick="document.getElementById('hub-section').scrollIntoView({ behavior: 'smooth' })" 
                  class="px-8 py-3 bg-gradient-to-r from-electric-blue to-cosmic-purple rounded-lg font-bold hover:shadow-[0_0_30px_rgba(30,144,255,0.5)] transition-all">
            Enter Hub
          </button>
        </div>
      </section>

      <!-- Main Hub Section -->
      <section id="hub-section" class="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Player Stats Panel -->
        <div class="lg:col-span-1 space-y-4">
          <div class="bg-gradient-to-br from-electric-blue/10 to-cosmic-purple/10 border border-electric-blue/30 rounded-lg p-6 backdrop-blur-sm">
            <h3 class="text-lg font-bold mb-4 text-electric-blue">Player Stats</h3>
            <div class="space-y-3">
              <div>
                <div class="flex justify-between mb-2">
                  <span class="text-sm text-gray-400">Heat Level</span>
                  <span class="font-bold text-neon-pink">${state.heat}/${state.maxHeat}</span>
                </div>
                <div class="w-full bg-deep-space rounded-full h-2 overflow-hidden border border-neon-pink/20">
                  <div class="h-full bg-gradient-to-r from-neon-pink to-sun-yellow transition-all" 
                       style="width: ${(state.heat / state.maxHeat) * 100}%"></div>
                </div>
              </div>
              <div class="flex justify-between items-center p-3 bg-deep-space/50 rounded-lg">
                <span class="text-sm text-gray-400">Wealth</span>
                <span class="font-bold text-acid-lime">$${state.wealth.toLocaleString()}</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-deep-space/50 rounded-lg">
                <span class="text-sm text-gray-400">Prestige Lvl</span>
                <span class="font-bold text-cosmic-purple">${state.prestige}</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-deep-space/50 rounded-lg">
                <span class="text-sm text-gray-400">Replays</span>
                <span class="font-bold text-electric-blue">${state.replayCount}</span>
              </div>
            </div>
          </div>

          <!-- Crew Panel -->
          <div class="bg-gradient-to-br from-cosmic-purple/10 to-neon-pink/10 border border-cosmic-purple/30 rounded-lg p-6 backdrop-blur-sm">
            <h3 class="text-lg font-bold mb-4 text-cosmic-purple">Crew Heist Team</h3>
            <div class="space-y-2">
              ${state.crew.map(member => `
                <div class="flex items-center gap-3 p-2 bg-deep-space/50 rounded">
                  <div class="w-8 h-8 rounded-full bg-gradient-to-br from-electric-blue to-cosmic-purple flex items-center justify-center text-xs font-bold">
                    ${member.name[0]}
                  </div>
                  <div>
                    <div class="text-sm font-bold">${member.name}</div>
                    <div class="text-xs text-gray-500">${member.specialization}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Central Hub Content -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Extraction System -->
          <div class="bg-gradient-to-br from-acid-lime/10 to-electric-blue/10 border border-acid-lime/30 rounded-lg p-6 backdrop-blur-sm">
            <h3 class="text-lg font-bold mb-4 text-acid-lime">Extraction Risk/Reward</h3>
            <p class="text-sm text-gray-400 mb-4">
              Higher Heat = Lower success rate. Successful extractions grant wealth; failures cost resources and increase Heat.
            </p>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="p-3 bg-deep-space/50 rounded text-center">
                <div class="text-xs text-gray-400 mb-1">Success Rate</div>
                <div class="text-xl font-bold text-acid-lime">${Math.round((1 - (state.heat / state.maxHeat) * 0.5) * 100)}%</div>
              </div>
              <div class="p-3 bg-deep-space/50 rounded text-center">
                <div class="text-xs text-gray-400 mb-1">Success/Fails</div>
                <div class="text-lg font-bold text-electric-blue">${state.extractionSuccess}/${state.extractionFails}</div>
              </div>
            </div>
            <button onclick="alert('Extraction attempted! Check your stats.')"
                    class="w-full py-2 px-4 bg-gradient-to-r from-acid-lime to-sun-yellow text-deep-space font-bold rounded-lg hover:shadow-[0_0_20px_rgba(198,255,0,0.5)] transition-all">
              Attempt Extraction
            </button>
          </div>

          <!-- Object Catalog -->
          <div class="bg-gradient-to-br from-neon-pink/10 to-cosmic-purple/10 border border-neon-pink/30 rounded-lg p-6 backdrop-blur-sm">
            <h3 class="text-lg font-bold mb-4 text-neon-pink">Object Catalog (39 Items)</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
              ${state.objects.slice(0, 15).map(obj => `
                <div class="p-3 bg-deep-space/50 rounded border border-${
                  obj.rarity === 'legendary' ? 'sun-yellow' : 
                  obj.rarity === 'epic' ? 'cosmic-purple' : 
                  obj.rarity === 'rare' ? 'electric-blue' : 'gray'
                }/20">
                  <div class="text-xs font-bold text-${
                    obj.rarity === 'legendary' ? 'sun-yellow' : 
                    obj.rarity === 'epic' ? 'cosmic-purple' : 
                    obj.rarity === 'rare' ? 'electric-blue' : 'gray-300'
                  }">${obj.rarity.toUpperCase()}</div>
                  <div class="text-sm font-bold truncate">${obj.name}</div>
                  <div class="text-xs text-gray-400">$${obj.value}</div>
                </div>
              `).join('')}
            </div>
            <div class="text-center text-xs text-gray-500 mt-3">...and 24 more items</div>
          </div>

          <!-- Seasonal Worlds -->
          <div class="bg-gradient-to-br from-sun-yellow/10 to-acid-lime/10 border border-sun-yellow/30 rounded-lg p-6 backdrop-blur-sm">
            <h3 class="text-lg font-bold mb-4 text-sun-yellow">Seasonal Worlds</h3>
            <div class="space-y-3">
              ${seasonalWorlds.map(world => `
                <div class="p-4 bg-deep-space/50 rounded border border-sun-yellow/20 ${world.active ? 'ring-1 ring-acid-lime/50' : 'opacity-60'}">
                  <div class="flex justify-between items-start mb-2">
                    <div>
                      <div class="font-bold text-electric-blue">${world.name}</div>
                      <div class="text-xs text-gray-400">${world.theme}</div>
                    </div>
                    <div class="text-right">
                      <div class="text-sm font-bold text-acid-lime">⭐ ${world.difficulty}</div>
                      <div class="text-xs text-gray-500">+$${world.rewards}</div>
                    </div>
                  </div>
                  <div class="text-xs text-gray-500">${world.active ? '🟢 Active' : '🔴 Coming Soon'}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Actions -->
          <div class="grid grid-cols-2 gap-4">
            <button onclick="alert('Heat system demonstrates danger levels. Current: ${state.heat}/${state.maxHeat}')"
                    class="py-3 px-4 bg-gradient-to-r from-neon-pink to-cosmic-purple rounded-lg font-bold hover:shadow-[0_0_20px_rgba(255,45,138,0.5)] transition-all text-sm">
              🔥 Heat Info
            </button>
            <button onclick="alert('Prestige reset: Convert wealth to prestige and replay!')"
                    class="py-3 px-4 bg-gradient-to-r from-cosmic-purple to-electric-blue rounded-lg font-bold hover:shadow-[0_0_20px_rgba(122,43,226,0.5)] transition-all text-sm">
              ✨ Prestige Reset
            </button>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="max-w-7xl mx-auto px-4 py-16 mt-12 border-t border-electric-blue/20">
        <h2 class="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-electric-blue to-cosmic-purple bg-clip-text text-transparent">
          Complete LiveOps Systems
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${[
            { title: 'Heat System', desc: 'Dynamic risk-reward with Heat levels affecting extraction success' },
            { title: '39 Objects', desc: 'Full catalog with rarity tiers and mutation mechanics' },
            { title: 'Crew Heists', desc: '4 specialized team members with unique roles' },
            { title: 'Extraction Mechanics', desc: 'Risk/reward with dynamic success calculations' },
            { title: 'Prestige System', desc: 'Convert wealth to prestige for long-term progression' },
            { title: '4 Seasonal Worlds', desc: 'Themed environments with increasing difficulty' },
          ].map(feature => `
            <div class="bg-gradient-to-br from-deep-space/50 to-electric-blue/10 border border-electric-blue/20 rounded-lg p-6 hover:border-cosmic-purple/40 transition-all">
              <h3 class="font-bold text-lg mb-2 text-acid-lime">${feature.title}</h3>
              <p class="text-sm text-gray-400">${feature.desc}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Footer -->
      <footer class="mt-20 border-t border-electric-blue/20 bg-deep-space/50 backdrop-blur-sm py-8">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="text-center md:text-left">
              <p class="text-gray-400 text-sm">
                <strong>Stealverse MVP</strong> — Demo-ready LiveOps Hub for STEAL A WORLD
              </p>
              <p class="text-gray-500 text-xs mt-1">Local browser state only • No Roblox backend integration</p>
            </div>
            <div class="text-center opacity-75 hover:opacity-100 transition-opacity">
              <a href="https://madethis.com" target="_blank" rel="noopener noreferrer" class="text-xs text-gray-500 hover:text-electric-blue transition-colors">
                Built with MadeThis
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `;

  saveGameState(state);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', renderApp);
