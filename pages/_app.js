import { MDXProvider } from '@mdx-js/react'
import '../src/global.css'
import { MathJaxContext } from 'better-react-mathjax'
import { useState } from 'react'
import Menubar from '../src/Menubar'
import getComponents, { handleMouseUp } from '../src/MdxComponents'
import PermaFloat from '../src/PermaFloat'

function MyApp({ Component, pageProps }) {
  const [math, setMath] = useState(true)
  const [floatRect, setFloatRect] = useState({
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    display: 'none',
    position: 'absolute',
  })
  const components = getComponents({ math })

  return (
    <MDXProvider components={components}>
      <MathJaxContext>
        <div
          className="my-8 mx-auto max-w-3xl px-6"
          onMouseUp={() => handleMouseUp(setFloatRect)}
        >
          <Menubar state={[math, setMath]} components={components} />
          <Component {...pageProps} />
        </div>
        <PermaFloat floatRect={floatRect} setFloatRect={setFloatRect} />
      </MathJaxContext>
    </MDXProvider>
  )
}

export default MyApp
