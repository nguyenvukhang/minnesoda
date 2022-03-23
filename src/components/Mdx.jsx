import a from './mdx/Link'
import table from './mdx/Table'
import headers from './mdx/Headers'

const Mdx = { a, table, ...headers }

const Space = () => {
  return (
    <div className='h-28'/>
  )
}

const BigSpace = () => {
  return (
    <div className='h-96'/>
  )
}


export default Mdx
export { Space, BigSpace }
