import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeMathjax from 'rehype-mathjax'

// TODO: insert a \smash into every inline-math
import mdxInit from '@next/mdx'

// reference: mathjax options
// http://docs.mathjax.org/en/latest/options/
const opts = {
  tex: {
    macros: {
      f: ['\\frac{#1}{#2}', 2],
      R: '{\\mathbb R}',
      bold: ['{\\bf #1}', 1],
    },
  },
}

// mdx reference
// https://www.npmjs.com/package/@next/mdx
const withMDX = mdxInit({
  options: {
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [[rehypeMathjax, opts]],
    // rehypePlugins: [],
    providerImportSource: '@mdx-js/react',
  },
})

const nextConfig = withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
})

export default nextConfig
