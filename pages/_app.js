import { MDXProvider } from '@mdx-js/react'
import '../src/global.css'
import { MathJaxContext } from 'better-react-mathjax'
import { useEffect, useState } from 'react'
import Menubar from '../src/Menubar'
import getComponents from '../src/MdxComponents'
import { handleMouseUp, removeFloat } from '../src/PermaFloat'
import MathjaxConfig from '../src/MathjaxConfig'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [math, setMath] = useState(true)
  const components = getComponents({ math })

  return (
    <MDXProvider components={components}>
      <MathJaxContext config={MathjaxConfig}>
        <div
          className="my-8 mx-auto max-w-3xl px-6"
          onMouseUp={() => handleMouseUp({ router })}
          onMouseDown={removeFloat}
        >
          <Menubar state={[math, setMath]} components={components} />
          <Component {...pageProps} />
        </div>
      </MathJaxContext>
    </MDXProvider>
  )
}

export default MyApp
