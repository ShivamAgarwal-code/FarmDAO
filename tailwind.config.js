/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "bg-img": "url('/img/logo.jpg')",
        "footer-texture": "url('/img/footer-texture.png')",
      },
      fontFamily: {
        kanit: "Kanit",
        raj: "Rajdhani",
      },
      colors: {
        green: {
          500: "#62fcaf",
          700: "#009557",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
