/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a202c', // Dark navy
        secondary: '#2d3748', // Lighter gray
        accent: '#ed8936', // Orange accent
      },
    },
  },
  plugins: [],
}