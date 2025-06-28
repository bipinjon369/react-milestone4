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
        'upload-text1': ['12px', { lineHeight: '20px', fontWeight: '400' }],
        'upload-text2': ['14px', { lineHeight: '24px', fontWeight: '400' }],
        'label-text': ['12px', { lineHeight: '12px', fontWeight: '400' }],
        'toast-text': ['14px', { lineHeight: '22px', fontWeight: '500' }],
        'delete-modal-text': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'delete-modal-header': ['18px', { lineHeight: '28px', fontWeight: '500' }],
        'delete-modal-button-text': ['16px', { lineHeight: '24px', fontWeight: '600' }],
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      },
      boxShadow: {
        'delete-modal-shadow': '0px 8px 8px -4px #10182808',
        'custom-2': '0px 20px 24px -4px #10182814',
      },
    },
  },
  plugins: [],
}

