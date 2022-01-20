import { MDXProvider } from '@mdx-js/react'
import '../src/global.css'
import Link from 'next/link'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import { useState } from 'react'

const tailwind = {
  h1: 'text-gray-900',
  h2: 'text-gray-700',
  h3: 'text-gray-500',
}

const components = {}
Object.entries(tailwind).forEach((e) => {
  const Tag = e[0]
  components[Tag] = ({ children }) => <Tag className={e[1]}>{children}</Tag>
})

components.a = ({ href, children }) => {
  const style = 'text-blue-500 hover:underline'
  return (
    <Link href={href}>
      <a className={style}>{children}</a>
    </Link>
  )
}

const Menubar = ({ functions }) => {
  const [mathtype, setMathtype] = functions

  function toggleMathjax() {
    setMathtype(!mathtype)
  }

  const toggleButtonColor = mathtype ? 'text-blue-500' : 'text-neutral-400'
  return (
    <div className="mb-8 flex flex-row">
      <div className="flex-1">
        <components.a href="/">Home</components.a>
      </div>
      <div className="flex">
        <a
          className={`${toggleButtonColor} cursor-pointer hover:underline`}
          onClick={() => toggleMathjax()}
        >
          Math
        </a>
      </div>
    </div>
  )
}

function MyApp({ Component, pageProps }) {
  const [mathtype, setMathtype] = useState(true)
  components.pre = ({ children }) => {
    return mathtype ? (
      <MathJax>{`$$${children.props.children}$$`}</MathJax>
    ) : (
      <div className="my-4 text-pink-500">{children}</div>
    )
  }
  components.inlineCode = ({ children }) => {
    return mathtype ? (
      <MathJax inline>{`\\(${children}\\)`}</MathJax>
    ) : (
      <div className="text-pink-500">{children}</div>
    )
  }

  return (
    <MDXProvider components={components}>
      <MathJaxContext>
        <div className="my-8 mx-auto max-w-3xl px-12">
          <Menubar functions={[mathtype, setMathtype]} />
          <Component {...pageProps} />
        </div>
      </MathJaxContext>
    </MDXProvider>
  )
}

export default MyApp
