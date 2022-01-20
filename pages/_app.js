import { MDXProvider } from '@mdx-js/react'
import '@/src/global.css'
import Link from 'next/link'

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
  const style = 'text-blue-500'
  return (
    <Link href={href}>
      <a className={style}>{children}</a>
    </Link>
  )
}

function toggleMathjax() {
  alert('hello there')
}

const Menubar = () => {
  return (
    <div className="mb-8 flex flex-row">
      <div className="flex-1">
        <components.a href="/">Home</components.a>
      </div>
      <div className="flex">
        <a className='text-blue-500 cursor-pointer' onClick={toggleMathjax}>MathJax</a>
      </div>
    </div>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <MDXProvider components={components}>
      <div className="my-8 mx-auto max-w-3xl px-12">
        <Menubar />
        <Component {...pageProps} />
      </div>
    </MDXProvider>
  )
}

export default MyApp
