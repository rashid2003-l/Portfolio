/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          pink: '#ff00ff',
          cyan: '#00ffff',
          blue: '#00f0ff',
          purple: '#b400ff',
        },
        darkbg: '#0a0a0a',
        lightbg: '#f0f0f0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
    },
  },
  plugins: [],
};
