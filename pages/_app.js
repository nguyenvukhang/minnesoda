import '@/styles/global.css'
import Container from '@/components/Container'
import { MDXProvider } from '@mdx-js/react'
import Components from '@/components/Mdx'
import Navbar from '@/components/Navbar'

function App({ Component, pageProps }) {
  return (
    <Container>
      <Navbar />
      <MDXProvider components={Components}>
        <Component {...pageProps} />
      </MDXProvider>
    </Container>
  )
}

export default App
