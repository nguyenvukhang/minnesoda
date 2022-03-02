import a from './mdx/Link'
import table from './mdx/Table'

const span = ({ children }) => {
  console.log(children)
  return (
    <span className='inline-block items-center'>{children}</span>
  )
}

const Mdx = { a, table, }

export default Mdx
