import { MDXProvider } from '@mdx-js/react'
import '../src/global.css'
import { MathJaxContext } from 'better-react-mathjax'
import { useEffect, useState } from 'react'
import Menubar from '../src/Menubar'
import getComponents from '../src/MdxComponents'
import { handleMouseUp, removeTooltip } from '../src/PermaFloat'
import MathjaxConfig from '../src/MathjaxConfig'
import { useRouter } from 'next/router'

function Footer() {
  return (
    <div className="h-48 flex justify-center">
      <div className="flex flex-col">
        <div className="flex-1" />
        <div className="text-gray-400 mb-10">khang</div>
      </div>
    </div>
  )
}

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [math, setMath] = useState(true)
  const components = getComponents({ math })

  return (
    <MDXProvider components={components}>
      <MathJaxContext config={MathjaxConfig}>
        <div
          className="my-8 mx-auto max-w-3xl px-6 min-h-screen-90 flex flex-col"
          onMouseUp={() => handleMouseUp({ router })}
          onMouseDown={removeTooltip}
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
