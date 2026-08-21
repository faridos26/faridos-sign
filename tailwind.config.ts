import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './contexts/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#8B5A2B', foreground: '#FDF6F0' },
        secondary: { DEFAULT: '#D4A373', foreground: '#2D1B12' },
        background: '#FDF6F0',
        foreground: '#2D1B12',
        accent: { DEFAULT: '#A67C52', foreground: '#FDF6F0' },
        success: '#4CAF50',
        error: '#E74C3C',
        border: '#E4D5C3',
        input: '#E4D5C3',
        ring: '#8B5A2B',
        muted: { DEFAULT: '#F1E4D6', foreground: '#6B5645' },
        card: { DEFAULT: '#FFFFFF', foreground: '#2D1B12' },
      },
      fontFamily: {
        arabic: ['Cairo', 'sans-serif'],
        french: ['Inter', 'sans-serif'],
      },
      borderRadius: { lg: '1rem', md: '0.75rem', sm: '0.5rem' },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: { 'fade-in': 'fade-in 0.4s ease-out' },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
