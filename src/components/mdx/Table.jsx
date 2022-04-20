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

// table header element
const th = ({ children }) => (
  <th>
    <div className="text-center">{children}</div>
  </th>
)

// table element
const td = ({ children }) => (
  <td>
    <div className="text-center">{children}</div>
  </td>
)

export { thead, tbody, td, tr, th }
export default Table
