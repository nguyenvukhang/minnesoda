import { MDXProvider } from '@mdx-js/react'
import '../src/global.css'
import { MathJaxContext } from 'better-react-mathjax'
import { useEffect, useState } from 'react'
import Menubar from '../src/Menubar'
import getComponents from '../src/MdxComponents'
import { handleMouseUp, removeTooltip } from '../src/Tooltip'
import MathjaxConfig from '../src/MathjaxConfig'
import { useRouter } from 'next/router'
import Footer from '../src/Footer'
import Head from '../src/Head'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [math, setMath] = useState(true)
  const components = getComponents({ math })

  return (
    <MDXProvider components={components}>
      <Head/>
      <MathJaxContext config={MathjaxConfig}>
        <div
          className="my-8 mx-auto max-w-3xl px-6 min-h-screen-90 flex flex-col"
          onMouseUp={() => handleMouseUp({ router })}
        >
          <Menubar state={[math, setMath]} components={components} />
          <Component {...pageProps} />
          <div className="flex-1" />
          <Footer />
        </div>
      </MathJaxContext>
    </MDXProvider>
  )
}

export default MyApp
