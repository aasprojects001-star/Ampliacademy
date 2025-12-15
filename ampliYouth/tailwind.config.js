export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5B2D8B",     // calmer, deeper purple
        secondary: "#F47A1F",   // warm orange accent
        dark: "#0F172A",        // near-black for text
        muted: "#F8FAFC"        // soft background
      }
    }
  },
  plugins: []
};
