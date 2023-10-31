import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        fall1: {
          '0%': { top: '-68vh' },
          '100%': { top: '12%' },
        },
        fall2: {
          '0%': { top: '-34vh' },
          '100%': { top: '51%' },
        },
      },
      animation: {
        fall1: 'fall1 2s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
        fall2: 'fall2 2s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
      },
    },
  },
  plugins: [],
}
export default config
