import '@/styles/global.css'
import Container from '@/components/Container'
import { MDXProvider } from '@mdx-js/react'
import Components from '@/components/Mdx'
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/router'

function App({ Component, pageProps }) {
  const router = useRouter()
  return (
    <Container>
      {/* <Navbar router={router} /> */}
      <MDXProvider components={Components}>
        <Component {...pageProps} />
      </MDXProvider>
    </Container>
  )
}

export default App
