/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mincho: "Mincho",
      },
      colors: {
        primary: "var(--ikz-primary)",
        secondary: "var(--ikz-secondary)",
      },
      spacing: {
        "cinematic-bar": "var(--ikz-cinematic-bar)",
        cinematic: "calc(100% - var(--ikz-cinematic-bar)*2)",
      },
      backgroundImage: {
        image: "var(--ikz-background-overlay), var(--ikz-background-image)",
      },
      aspectRatio: {
        cover: "7/10",
        card: "3/1",
      },
    },
  },
  safelist: [{ pattern: /bg-.+/ }],
  plugins: [],
};
