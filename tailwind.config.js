/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#01040A",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        pastelYellow: "#F7E832"
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: '450px',
        'ipad-pro': { 'min': '1024px', 'max': '1199px' }, // Specific range for iPad Pro
        'nest-hub': { 'min': '600px', 'max': '1023px' }, // Smaller devices, adjust if needed
        'nest-hub-max': { 'min': '1200px', 'max': '1366px' }, // Larger Nest Hub
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
      animation: {
        'gradient-x': 'gradient-x 4s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        }, // <- This was missing
      },
    },
  },
  plugins: [],
};
