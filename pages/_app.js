import { MDXProvider } from '@mdx-js/react'
import '../src/global.css'
import Link from 'next/link'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import { useState } from 'react'

const Menubar = ({ state, components }) => {
  const [math, setMath] = state

  const toggleButtonColor = math
    ? 'text-blue-500'
    : 'text-neutral-400'
  return (
    <div className="mb-8 flex flex-row">
      <div className="flex-1">
        <components.a href="/">Home</components.a>{' '}
      </div>
      <div className="flex">
        <components.a href="">Reload</components.a>
        <div className='w-12'/>
        <a
          className={`${toggleButtonColor} cursor-pointer hover:underline`}
          onClick={() => setMath(!math)}
        >
          Math
        </a>
      </div>
    </div>
  )
}

function MyApp({ Component, pageProps }) {
  const [math, setMath] = useState(true)

  const a = ({ href, children }) => {
    return (
      <Link href={href}>
        <a>{children}</a>
      </Link>
    )
  }

  const pre = ({ children }) => {
    return math ? (
      <MathJax>{`$$${children.props.children}$$`}</MathJax>
    ) : (
      <p className="text-pink-500">{children.props.children}</p>
    )
  }

  const inlineCode = ({ children }) => {
    return math ? (
      <MathJax inline>{`\\(${children}\\)`}</MathJax>
    ) : (
      <span className="text-pink-500">{children}</span>
    )
  }

  const components = { a, pre, inlineCode }

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
