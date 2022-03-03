import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeMathjax from 'rehype-mathjax'

// reference: mathjax options
// http://docs.mathjax.org/en/latest/options/
const opts = {
  tex: {
    macros: {
      f: ['\\dfrac{#1}{#2}', 2],
      tf: ['\\tfrac{#1}{#2}', 2],
      a: ['\\angle{#1}', 1],
      tri: ['\\triangle{#1}', 1],
      R: '{\\mathbb R}',
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
            rehypePlugins: [[rehypeMathjax, opts]],
            providerImportSource: '@mdx-js/react',
          },
        },
      ],
    })
    return config
  },
}

export default myConfig
