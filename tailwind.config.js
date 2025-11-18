/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      animation: {
        'fadeInUp': 'fadeInUp 0.7s ease-out',
        'fadeIn': 'fadeIn 0.3s ease-out',
        'logoutWiggle': 'logoutWiggle 0.4s ease-out',
      },
      keyframes: {
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(12px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        logoutWiggle: {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '20%': { transform: 'translateY(-2px) rotate(-8deg)' },
          '40%': { transform: 'translateY(0) rotate(6deg)' },
          '60%': { transform: 'translateY(-1px) rotate(-4deg)' },
          '80%': { transform: 'translateY(0) rotate(2deg)' },
          '100%': { transform: 'translateY(0) rotate(0deg)' },
        },
      },
    },
  },
  plugins: [],
}
