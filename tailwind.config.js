module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      jetbrains: ['"JetBrains Mono"'],
    },
    extend: {
      colors: {
        // sky: {500: #0ea5e9, 600: #0284c7}
        // https://meyerweb.com/eric/tools/color-blend
        accent: '#0895D8',
        sky: {
          550: '#0895D8',
        },
      },
      letterSpacing: {
        custom: '-0.01em',
      },
      textUnderlineOffset: {
        5: '5px',
      },
      spacing: {
        '1-h': '1rem',
        '1/2-h': '0.5rem',
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
