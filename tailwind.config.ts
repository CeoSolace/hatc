import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f172a',
          dark: '#0e1321',
          light: '#1e293b'
        },
        accent: {
          DEFAULT: '#38bdf8',
          light: '#7dd3fc',
          dark: '#0ea5e9'
        }
      },
      boxShadow: {
        glass: '0 4px 30px rgba(0, 0, 0, 0.1)'
      },
      backdropBlur: {
        glass: '10px'
      }
    }
  },
  plugins: []
}

export default config;