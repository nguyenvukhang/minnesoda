import { MDXProvider } from '@mdx-js/react'
import '../src/global.css'
import { MathJaxContext } from 'better-react-mathjax'
import { useState } from 'react'
import getComponents from '../src/MdxComponents'
import { handleMouseUp } from '../src/Tooltip'
import MathjaxConfig from '../src/MathjaxConfig'
import { useRouter } from 'next/router'
import Footer from '../src/Footer'
import Menubar from '../src/Menubar'
import Head from '../src/Head'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [math, setMath] = useState(true)
  const components = getComponents({ math })

  return (
    <MDXProvider components={components}>
      <Head />
      <MathJaxContext config={MathjaxConfig} hideUntilTypeset="first">
        <div
          className="my-8 mx-auto max-w-3xl px-6 min-h-screen-90 flex flex-col overflow-x-hidden"
          onMouseUp={() => handleMouseUp({ router })}
        >
          <Menubar state={[math, setMath]} components={components} router={router}/>
          <Component {...pageProps} />
          <div className="flex-1" />
          <Footer />
        </div>
      </MathJaxContext>
    </MDXProvider>
  )
}

export default MyApp
