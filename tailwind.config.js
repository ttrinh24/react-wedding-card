/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dancing: ['"Dancing Script"', 'cursive'],
      },
      animation: {
        'fall': 'fall 10s linear infinite',
      },
      keyframes: {
        fall: {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}