/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10B981',
          dark: '#059669',
          light: '#34D399',
        },
        dark: {
          DEFAULT: '#1E293B',
          lighter: '#334155',
          darker: '#0F172A',
        },
      },
    },
  },
  plugins: [],
}

