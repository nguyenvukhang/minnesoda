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
  const [loading, setLoading] = useState(true)

  const SlowComponent = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('done loading')
    }, 3000)
  })
  const [a, setA] = useState('still loading')

  function SwapOutOnLoad() {
    SlowComponent.then((e) => {
      setA(e)
    })
    return <h1>{a}</h1>
  }

  const [mathtype, setMathtype] = useState(true)
  const mathClass = () => {
    const standard = 'my-4 text-pink-500'
    const variable = mathtype ? 'hidden' : 'inline-block'
    return `${standard} ${variable}`
  }

  components.pre = ({ children }) => {
    return (
      <>
        <div className={mathtype ? 'block' : 'hidden'}>
          <MathJax>{`$$${children.props.children}$$`}</MathJax>
        </div>
        <div className={mathClass(mathtype)}>{children}</div>
      </>
    )
  }

  components.inlineCode = ({ children }) => {
    return (
      <>
        <span className={mathtype ? 'inline-block' : 'hidden'}>
          <MathJax inline>{`\\(${children}\\)`}</MathJax>
        </span>
        <span className={mathClass(mathtype)}>{children}</span>
      </>
    )
  }

  return (
    <MDXProvider components={components}>
      <MathJaxContext>
        <SwapOutOnLoad />
        <div className="my-8 mx-auto max-w-3xl px-8">
          <Menubar functions={[mathtype, setMathtype]} />
          <Component {...pageProps} />
        </div>
      </MathJaxContext>
    </MDXProvider>
  )
}

export default MyApp
