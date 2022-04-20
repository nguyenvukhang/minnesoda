import a from './mdx/Link'
import table, { thead, tbody, tr, td, th } from './mdx/Table'
import headers from './mdx/Headers'

// with table
// const Mdx = { a, table, thead, tbody, tr, td, th, ...headers }
// without table
const Mdx = { a, table, ...headers }

const Space = () => {
  return <div className="h-28" />
}

const BigSpace = () => {
  return <div className="h-96" />
}

export default Mdx
export { Space, BigSpace }
