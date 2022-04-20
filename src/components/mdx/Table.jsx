const Table = ({ children }) => (
  <table className="border-collapse table-auto tw-table">{children}</table>
)

const padding = 'p-2'
const border = 'border border-gray-600'

/* CONTAINERS */

// table body wrapper
const tbody = ({ children }) => (
  <tbody className={`bg-green-100 ${padding} ${border}`}>{children}</tbody>
)

// table header wrapper
const thead = ({ children }) => (
  <thead className={`bg-green-100 ${padding} ${border}`}>{children}</thead>
)

// table row
const tr = ({ children }) => <tr>{children}</tr>

// table header element
const th = ({ children }) => (
  <th className={`bg-green-100 ${padding} ${border}`}>{children}</th>
)

// table element
const td = ({ children }) => (
  <td className={`bg-yellow-100 ${padding} ${border}`}>{children}</td>
)

export { thead, tbody, td, tr, th }
export default Table
