/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'wave-x-slow': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'wave-x-medium': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'wave-x-fast': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'wave-x-slow': 'wave-x-slow 25s linear infinite',
        'wave-x-medium': 'wave-x-medium 15s linear infinite',
        'wave-x-fast': 'wave-x-fast 8s linear infinite',
      },
      fontSize: {
        '26px': '26px',
        '27px': '27px',
        '22px': '22px',
      },
      colors: {
        'custom-purple': '#581C87',
        'custom-purple-dark': '#7941A4', 
      },

    },         
  },
  plugins: [],
};
