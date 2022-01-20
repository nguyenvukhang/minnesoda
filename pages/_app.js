import { MDXProvider } from '@mdx-js/react'
import '@/src/global.css'

const tailwind = {
  h1: 'text-gray-900',
  h2: 'text-gray-700',
  h3: 'text-gray-500',
}

const components = {}
Object.entries(tailwind).forEach((e) => {
  const Tag = e[0]
  components[Tag] = ({ children }) => <Tag className={e[1]}>{children}</Tag>
})

function MyApp({ Component, pageProps }) {
  return (
    <MDXProvider components={components}>
      <div className='my-10 mx-auto max-w-3xl px-12'>
        <Component {...pageProps} />
      </div>
    </MDXProvider>
  )
}

export default MyApp
