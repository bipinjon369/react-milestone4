/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sidebar-bg-color': '#F6F8F9',
        'sidebar-text-color': '#252C32',
        'button-color': '#4094F7',
        'table-header-text-color': '#84919A'
      },
      fontSize: {
        'sidebar-h1': ['18px', { lineHeight: '24px', fontWeight: '600' }],
        'sidebar-menu-text': ['14px', { lineHeight: '24px', fontWeight: '400' }],
        'sidebar-selected-text': ['14px', { lineHeight: '24px', fontWeight: '700' }],
        'product-header-text': ['36px', { lineHeight: '48px', fontWeight: '700' }],
        'button-text': ['14px', { lineHeight: '24px', fontWeight: '600' }],
        'table-header-text': ['12px', { lineHeight: '16px', fontWeight: '600' }],
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      },
    },
  },
  plugins: [],
}

