module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}'],
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
      inset: {
        '_2-ex': '-2ex',
      },
    },
  },
  plugins: [],
}
