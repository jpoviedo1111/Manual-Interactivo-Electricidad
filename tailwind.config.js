/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        marca: {
          azul:       "#1A237E",
          "azul-med": "#283593",
          "azul-cl":  "#E8EAF6",
          naranja:    "#BF360C",
          verde:      "#1B5E20",
          "verde-cl": "#E8F5E9",
          rojo:       "#B71C1C",
          "rojo-cl":  "#FFEBEE",
          "gris-f":   "#F5F5F5",
          "gris-l":   "#BDBDBD",
          negro:      "#212121",
          amarillo:   "#F57F17",
        },
      },
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,0.12)",
      },
      fontFamily: {
        sans: ['"Segoe UI"', "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
