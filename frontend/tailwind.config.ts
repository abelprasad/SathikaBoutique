import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ruby: '#8B1E2D',
          crimson: '#B23A48',
          gold: '#C9A24D',
          champagne: '#E6D3A3',
        },
        ivory: '#FAF8F4',
        charcoal: '#1C1C1C',
        warmGrey: '#6E6E6E',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundColor: {
        'ivory': '#FAF8F4',
      },
      textColor: {
        'charcoal': '#1C1C1C',
        'warmGrey': '#6E6E6E',
      },
    },
  },
};

export default config;
