import references from '../pages/references.json'
import ReactDOM from 'react-dom'
import Link from 'next/link'

const Tooltip = ({ router, query, removeTooltip, transform }) => {
  // console.log(references[query])
  console.log("transform", transform)
  const href = references[query].definition
  function handleClick() {
    removeTooltip()
    router.push(href)
  }
  const style = transform === 'up' ? {
    transform: "translateY(-100%)"
  } : null
  return (
    <div className="absolute flex flex-col bg-blue-100 px-3 py-2" style={style}>
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

function removeTooltip() {
  const exisitngFloat = document.getElementById('reference-tooltip')
  if (exisitngFloat) {
    exisitngFloat.remove()
  }
}

function handleMouseUp({ router }) {
  removeTooltip()
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
    i.style.left = rect.left + window.scrollX + 'px'
    i.id = 'reference-tooltip'
    var transform
    // check if element is more than halfway down the screen
    if (rect.top > window.innerHeight / 2) {
      i.style.top =  window.scrollY +rect.top + 'px' // set coordinates
      transform = 'up'
    } else {
      i.style.top =  window.scrollY +rect.top + rect.height + 'px' // set coordinates
      transform = 'normal'
    }
    document.body.appendChild(i)
    ReactDOM.render(Tooltip({ router, query, removeTooltip, transform }), i)
  }
}

export { handleMouseUp, removeTooltip }
