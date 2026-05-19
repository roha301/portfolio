/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        background: { DEFAULT: 'var(--background)' },
        foreground: { DEFAULT: 'var(--foreground)' },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        border: { DEFAULT: 'var(--border)' },
        input: { DEFAULT: 'var(--input)' },
        ring: { DEFAULT: 'var(--ring)' },
        'cursed-purple': 'var(--cursed-purple)',
        'cursed-purple-bright': 'var(--cursed-purple-bright)',
        'shadow-blue': 'var(--shadow-blue)',
        'shadow-blue-bright': 'var(--shadow-blue-bright)',
        'electric-blue': 'var(--electric-blue)',
        'neon-purple': 'var(--neon-purple)',
        'demon-black': 'var(--demon-black)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'calc(var(--radius) - 0.25rem)',
        lg: 'calc(var(--radius) + 0.25rem)',
        xl: 'calc(var(--radius) + 0.5rem)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'float-orb': 'float-orb 8s ease-in-out infinite',
        'float-orb-2': 'float-orb-2 11s ease-in-out infinite',
        'float-orb-3': 'float-orb-3 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'spin-slow': 'spin-slow 15s linear infinite',
        'energy-pulse': 'energy-pulse 2.5s ease-in-out infinite',
        'shadow-aura': 'shadow-aura 3s ease-in-out infinite',
        'typing-cursor': 'typing-cursor 1s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'particle-float': 'particle-float 4s ease-out infinite',
      },
      keyframes: {
        'float-orb': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -20px) scale(1.05)' },
          '66%': { transform: 'translate(-20px, 15px) scale(0.95)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};