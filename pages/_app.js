import { MDXProvider } from '@mdx-js/react'
import '../src/global.css'
import { MathJaxContext } from 'better-react-mathjax'
import { useState } from 'react'
import Menubar from '../src/Menubar'
import getComponents, { handleMouseUp } from '../src/MdxComponents'
import ReactTooltip from 'react-tooltip'

function MyApp({ Component, pageProps }) {
  const [math, setMath] = useState(true)
  const components = getComponents({ math })

  return (
    <MDXProvider components={components}>
      <MathJaxContext>
        <div className="my-8 mx-auto max-w-3xl px-12" onMouseUp={handleMouseUp}>
          <Menubar state={[math, setMath]} components={components} />
          <a data-tip="custom show" data-event="click focus"> ◕‿‿◕ </a>
          <ReactTooltip place="top" type="dark" effect="solid" globalEventOff='click' />
          <Component {...pageProps} />
        </div>
      </MathJaxContext>
    </MDXProvider>
  )
}

export default MyApp
