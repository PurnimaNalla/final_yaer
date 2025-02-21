module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",  // Ensures Tailwind scans all React components and JSX files
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          50: "#f5f3f0",
          100: "#d9d3c3",
          200: "#bfa68b",
          300: "#a18362",
          400: "#7f5f3c",
          500: "#6a4f2e",
          600: "#5c4226",
          700: "#4d3620",
          800: "#3e2b1a",
          900: "#2e1f13",
        },
      },
    },
  },
  plugins: [],
};
