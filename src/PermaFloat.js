import references from '../pages/references.json'
import ReactDOM from 'react-dom'
import Link from 'next/link'

const Tooltip = ({ router, query, removeFloat }) => {
  console.log(references[query])
  const href = references[query].definition
  function handleClick() {
    removeFloat()
    router.push(href)
  }
  return (
    <div className="absolute flex flex-col bg-blue-100 px-3 py-2">
      <a onClick={handleClick}>Go to definition</a>
      <div className="mt-1-h">Go to reference</div>
      <div className="flex flex-col">
        {references[query].references.map((e) => (
            <a onClick={handleClick}>{e[0]}</a>
        ))}
      </div>
    </div>
  )
}

function removeFloat() {
  const exisitngFloat = document.getElementById('reference-tooltip')
  if (exisitngFloat) {
    exisitngFloat.remove()
  }
}

function handleMouseUp({ router }) {
  removeFloat()
  const selection = window.getSelection()
  const query = selection.toString().toLowerCase().trim()

  if (query === '') {
    return
  }

  if (references.hasOwnProperty(query)) {
    // console.log('has reference!')
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    const i = document.createElement('div')
    i.style.position = 'absolute' // fixed positioning = easy mode
    i.style.top = rect.top + 'px' // set coordinates
    i.style.left = rect.left + 'px'
    i.id = 'reference-tooltip'
    document.body.appendChild(i)
    ReactDOM.render(Tooltip({ router, query, removeFloat }), i)
  }
}

export { handleMouseUp, removeFloat }
