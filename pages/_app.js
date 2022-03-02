import '@/styles/global.css'
import Container from '@/components/Container'
import { MDXProvider } from '@mdx-js/react'
import Components from '@/components/Mdx'

function App({ Component, pageProps }) {
  return (
    <Container>
      <MDXProvider components={Components}>
        <Component {...pageProps} />
      </MDXProvider>
    </Container>
  )
}

export default App
