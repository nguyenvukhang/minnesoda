import { MDXProvider } from '@mdx-js/react'
import '../src/global.css'
import { MathJaxContext } from 'better-react-mathjax'
import { useState } from 'react'
import Menubar from '../src/Menubar'
import getComponents from '../src/MdxComponents'
import PermaFloat, { handleMouseUp } from '../src/PermaFloat'
import MathjaxConfig from '../src/MathjaxConfig'

function MyApp({ Component, pageProps }) {
  const [math, setMath] = useState(true)
  const [tooltip, setTooltip] = useState(false)
  const components = getComponents({ math })

  return (
    <MDXProvider components={components}>
      <MathJaxContext config={MathjaxConfig}>
        <div
          className="my-8 mx-auto max-w-3xl px-6"
          onMouseUp={handleMouseUp}
        >
          <Menubar state={[math, setMath]} components={components} />
          <Component {...pageProps} />
        </div>
        <PermaFloat state={[tooltip, setTooltip]}/>
      </MathJaxContext>
    </MDXProvider>
  )
}

export default MyApp
