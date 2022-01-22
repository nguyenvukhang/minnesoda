module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['"JetBrains Mono"'],
    },
    extend: {
      spacing: {
        '1-h': '1rem',
        '2-ex': '2ex',
        '4-ex': '4ex',
      },
      height: {
        'screen-80': '80vh',
        'screen-90': '90vh',
      },
      minHeight: {
        'screen-80': '80vh',
        'screen-90': '90vh',
      },
      inset: {
        '_2-ex': '-2ex',
      },
    },
  },
  plugins: [],
}
