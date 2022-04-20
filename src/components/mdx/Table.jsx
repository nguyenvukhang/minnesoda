const Table = ({ children }) => (
  <table className="border-collapse table-auto tw-table">{children}</table>
)

/* CONTAINERS */

// table body wrapper
const tbody = ({ children }) => <tbody>{children}</tbody>

// table header wrapper
const thead = ({ children }) => <thead>{children}</thead>

/* ROW */

// table row
const tr = ({ children }) => <tr>{children}</tr>

/* CELLS */

const hasOwn = (obj, key) => {
  if (obj === null || obj === undefined) {
    return false
  }
  return Object.keys(obj).includes(key)
}

const getMathStatus = (obj) => {
  if (hasOwn(obj, 'props')) {
    if (hasOwn(obj.props, 'className')) {
      return obj.props.className.includes('math')
    }
  }
  return false
}

// table header element
const th = ({ children }) => {
  const hasMath = getMathStatus(children)
  return hasMath ? (
    <th className="py-4">
      <div className="text-center">{children}</div>
    </th>
  ) : (
    <th>
      <div className="text-center">{children}</div>
    </th>
  )
}

// table element
const td = ({ children }) => {
  const hasMath = getMathStatus(children)
  console.log('element', hasMath)
  return hasMath ? (
    <td className="py-4">
      <div className="text-center">{children}</div>
    </td>
  ) : (
    <td>
      <div className="text-center">{children}</div>
    </td>
  )
}

export { thead, tbody, td, tr, th }
export default Table
