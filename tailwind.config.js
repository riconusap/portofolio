/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: {
          'white': 'rgba(255, 255, 255, 0.15)',
          'light': 'rgba(255, 255, 255, 0.08)',
          'dark': 'rgba(0, 0, 0, 0.3)',
          'border': 'rgba(255, 255, 255, 0.2)',
          'border-dark': 'rgba(0, 0, 0, 0.2)',
        },
        mono: {
          'white': '#ffffff',
          'light': '#f5f5f5',
          'gray': '#808080',
          'dark': '#2a2a2a',
          'black': '#000000',
        }
      },
      backdropBlur: {
        'glass': '12px',
        'glass-sm': '8px',
        'glass-lg': '16px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
        'glass-sm': '0 4px 16px 0 rgba(0, 0, 0, 0.25)',
        'glass-light': '0 8px 32px 0 rgba(255, 255, 255, 0.1)',
      }
    },
  },
  plugins: [],
}