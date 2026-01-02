/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#1c1d26',
        'secondary-dark': '#2a2b36',
        'accent-green': '#73d239',
        'accent-green-hover': '#8ee63e',
        'accent-blue': '#059669',
        'accent-teal': '#10b981',
      },
      fontFamily: {
        sans: ['Roboto', 'Helvetica', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-banner': 'linear-gradient(135deg, #0f0f23 0%, #1c1d26 25%, #2a2b36 50%, #1c1d26 75%, #0f0f23 100%)',
        'gradient-section': 'linear-gradient(135deg, #1c1d26 0%, #2a2b36 100%)',
      },
      backdropBlur: {
        'glass': '20px',
      },
    },
  },
  plugins: [],
}
