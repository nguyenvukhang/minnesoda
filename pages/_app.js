import '../styles/global.css'
import { MDXProvider } from '@mdx-js/react'

const components = {
  h1: ({ children }) => {
    return <h1 className="text-red-200">{children}</h1>
  },
}

function MyApp({ Component, pageProps }) {
  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  )
}

export default MyApp
