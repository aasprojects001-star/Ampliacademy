export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5B2D8B",     // restrained purple (accent only)
        secondary: "#F47A1F",   // CTA accent
        dark: "#0F172A",        // body text
        muted: "#F8FAFC"        // page background
      }
    }
  },
  plugins: []
};
