/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Palet utama: hijau "hutan" untuk kepercayaan & keberlanjutan,
        // hijau segar untuk aksi, oranye untuk energi/CTA (khas Tokopedia/Gojek)
        hutan: {
          950: "#0B2016",
          900: "#123324",
          800: "#1B4332",
          700: "#22543D",
          600: "#2D6A4F",
        },
        tunas: {
          500: "#40916C",
          400: "#52B788",
          300: "#74C69D",
          100: "#D8F3DC",
        },
        bara: {
          600: "#E8590C",
          500: "#F77F00",
          400: "#FF8C42",
          100: "#FFE8D6",
        },
        pasir: "#F7F9F4",
        arang: "#1B2420",
      },
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        card: "0 8px 24px -12px rgba(11, 32, 22, 0.25)",
      },
    },
  },
  plugins: [],
};
