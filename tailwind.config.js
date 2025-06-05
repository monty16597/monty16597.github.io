const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: true,
  theme: {
    extend: {
      colors: {
        customBodyBg: "#0a0a0f",
        glass: {
          primary: "rgba(17, 25, 40, 0.75)",
          secondary: "rgba(30, 41, 59, 0.6)",
          accent: "rgba(56, 189, 248, 0.8)",
          highlight: "rgba(139, 92, 246, 0.8)",
          border: "rgba(255, 255, 255, 0.08)",
        },
        neon: {
          blue: "#00EEFF",
          purple: "#8B5CF6",
          pink: "#EC4899",
          teal: "#2DD4BF",
        },
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "system-ui", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(139, 92, 246, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.8)' },
        },
      },
    },
  },
  plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting')(require('postcss-nesting')),
    require('autoprefixer'),
    require('tailwindcss'),
  ],
});
