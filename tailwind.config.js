/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: '#E3ECF7',         // Alice Blue
        surface: '#FFFFFF',    // Pure White
        ui: '#000000',         // Black (Borders/Icons)
        accent: '#000080',     // Navy Blue (Main Action)
        heading: '#0F172A',    // Prussian Blue (Text)
        subtext: '#64748B',    // Slate Grey (Subtext)
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}