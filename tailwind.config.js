/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac',
          400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d',
          800: '#166534', 900: '#14532d', DEFAULT: '#16a34a',
        },
        // YSDI brand — from logo: navy blue + forest green
        ysdi: {
          DEFAULT:  '#1a237e',
          dark:     '#0d1757',
          light:    '#3949ab',
          green:    '#2e7d32',
          greenlt:  '#43a047',
          orange:   '#e65100',
          sky:      '#0288d1',
        },
        accent: { DEFAULT: '#f59e0b', light: '#fcd34d' },
        dark: {
          bg:     '#0a0f1e',
          card:   '#111827',
          glass:  'rgba(17,24,39,0.7)',
          border: 'rgba(255,255,255,0.08)',
        },
        light: {
          bg:     '#f8fafc',
          card:   '#ffffff',
          border: 'rgba(0,0,0,0.08)',
        },
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      animation: {
        'float':      'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'gradient':   'gradient 8s linear infinite',
        'spin-slow':  'spin 3s linear infinite',
      },
      keyframes: {
        float:    { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-20px)' } },
        gradient: { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
      },
      boxShadow: {
        'glass':   '0 8px 32px rgba(0,0,0,0.3)',
        'glow':    '0 0 40px rgba(22,163,74,0.3)',
        'glow-lg': '0 0 80px rgba(22,163,74,0.2)',
        'ysdi':    '0 0 40px rgba(26,35,126,0.4)',
        'ysdi-g':  '0 0 40px rgba(46,125,50,0.3)',
      },
    },
  },
  plugins: [],
}
