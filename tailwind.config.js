/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'ink': '#1A1A1A',
        'ink-mid': '#3D3D3D',
        'ink-light': '#6B6B6B',
        'rule': '#C8C0B0',
        'rule-light': '#E8E2D8',
        'paper': '#F5F1EA',
        'paper-dark': '#EDE8DF',
        'accent': '#B5841A',
        'accent-dk': '#8A6010',
        'red': '#C0392B',
        'green': '#1A6B3C',
        'white': '#FDFAF5',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Times New Roman', 'serif'],
        'serif-alt': ['Source Serif 4', 'Georgia', 'serif'],
        'sans': ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        '1100': '1100px',
      },
    },
  },
  plugins: [],
};
