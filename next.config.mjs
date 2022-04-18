import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeMathjax from 'rehype-mathjax'

const NumberSets = ['R', 'Z', 'C', 'Q']
const getNumberSets = (arr) =>
  arr.reduce((a, v) => ({ ...a, [v]: `{\\mathbb ${v}}` }), {})

const MathjaxOpts = {
  tex: {
    macros: {
      f: ['\\dfrac{#1}{#2}', 2],
      tf: ['\\tfrac{#1}{#2}', 2],
      a: ['\\angle{#1}', 1],
      d: '\\mathrm{d}',
      tri: ['\\triangle{#1}', 1],
      lr: ['\\left(#1\\right)', 1],
      Lr: ['\\left[#1\\right]', 1],
      LR: ['\\left\\{#1\\right\\}', 1],
      abs: ['\\left|#1\\right|', 1],
      intd: ['\\int_{#1}^{#2} {#3} \\ \\mathrm{d}{#4} ', 4],
      inti: ['\\int {#1}\\ \\mathrm{d}{#2} ', 2],
      dd: ['\\dfrac{\\mathrm{d} #1}{\\mathrm{d} #2}', 2],
      sech: '\\mathrm{sech}',
      csch: '\\mathrm{csch}',
      inv: '^{-1}',
      ...getNumberSets(NumberSets)
    },
  },
}

const myConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: {
            remarkPlugins: [remarkMath, remarkGfm],
            rehypePlugins: [[rehypeMathjax, MathjaxOpts]],
            providerImportSource: '@mdx-js/react',
          },
        },
      ],
    })
    return config
  },
}

export default myConfig
