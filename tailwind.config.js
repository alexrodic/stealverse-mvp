/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-space': '#0a0e27',
        'electric-blue': '#1E90FF',
        'cosmic-purple': '#7A2BE2',
        'acid-lime': '#C6FF00',
        'sun-yellow': '#FFD700',
        'neon-pink': '#FF2D8A',
      },
      fontFamily: {
        'sans': ['Baloo 2', 'Outfit', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(30, 144, 255, 0.5)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(30, 144, 255, 0.8)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
