module.exports = {
  purge: [
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': '#59985C',
        'secondary': '#FF9447',
        'accent': '#CF0000',
        'charcoal': '#2C4251'
      },
      transitionProperty: {
        'spacing': 'margin, padding'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
