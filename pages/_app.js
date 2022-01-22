import { MDXProvider } from '@mdx-js/react'
import '../src/global.css'
import { MathJaxContext } from 'better-react-mathjax'
import { useState } from 'react'
import Menubar from '../src/Menubar'
import getComponents from '../src/MdxComponents'

function MyApp({ Component, pageProps }) {
  const [math, setMath] = useState(true)
  const components = getComponents({ math })

  return (
    <MDXProvider components={components}>
      <MathJaxContext>
        <div className="my-8 mx-auto max-w-3xl px-12">
          <Menubar state={[math, setMath]} components={components} />
          <Component {...pageProps} />
        </div>
      </MathJaxContext>
    </MDXProvider>
  )
}

export default MyApp
