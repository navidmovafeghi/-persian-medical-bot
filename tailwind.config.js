/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme") // Import default theme

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Keep vazirmatn definition if needed elsewhere
        vazirmatn: ['var(--font-vazirmatn)'], 
        // Set sans to use vazirmatn by default, falling back to system UI
        sans: ["var(--font-vazirmatn)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} 