/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF7B7B',
          dark: '#FF5F5F',
          light: '#FFA5A5',
        },
        background: {
          DEFAULT: '#1C1E2A',
          light: '#22253A',
          dark: '#161822',
        },
      },
      fontFamily: {
        'arial': ['Arial', 'sans-serif'],
        'helvetica': ['Helvetica', 'sans-serif'],
        'chantilly': ['Chantilly', 'serif'],
        'times-new-roman': ['Times New Roman', 'serif'],
        'verdana': ['Verdana', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'gradient': 'gradient 2s linear infinite',
        'shake': 'shake 0.5s ease-in-out',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        gradient: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderWidth: {
        '3': '3px',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      screens: {
        '3xl': '1920px',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    // Add custom plugins if needed
  ],
  // Enable dark mode
  darkMode: 'class',
  // Enable JIT mode
  mode: 'jit',
}
