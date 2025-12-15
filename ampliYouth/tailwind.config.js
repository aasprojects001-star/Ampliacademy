export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6A0DAD",
        secondary: "#FF7A00"
      },
      borderRadius: {
        xl: "24px",
        pill: "9999px"
      }
    }
  },
  plugins: []
};
