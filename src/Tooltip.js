import references from '../pages/references.json'
import ReactDOM from 'react-dom'
import Link from 'next/link'

const Tooltip = ({ router, query, removeTooltip, transform }) => {
  // console.log(references[query])
  console.log('transform', transform)
  const href = references[query].definition
  function handleClick() {
    removeTooltip()
    router.push(href)
  }
  const style =
    transform === 'above'
      ? {
          transform: 'translateY(calc(-100% - 8px))',
        }
      : null
  const Arrow = () => {
    const down =
      'w-0 h-0 border-x-8 border-t-8 border-x-transparent border-t-blue-100'
    const rotate = transform === 'above' ? 'translate-y-[-8px]' : 'rotate-180'
    return <div className={`${down} ${rotate}`} />
  }
  return (
    <div>
      {transform === 'below' ? <Arrow /> : null}
      <div className="absolute flex flex-col bg-blue-100 px-3 py-2" style={style}>
        <a onClick={handleClick}>Go to definition</a>
        <div className="mt-1-h">Go to reference</div>
        <div className="flex flex-col">
          {references[query].references.map((e) => (
            <a onClick={handleClick}>{e[0]}</a>
          ))}
        </div>
      </div>
      {transform === 'above' ? <Arrow /> : null}
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
      i.style.top = window.scrollY + rect.top + 'px' // set coordinates
      transform = 'above'
    } else {
      i.style.top = window.scrollY + rect.top + rect.height + 'px' // set coordinates
      transform = 'below'
    }
    document.body.appendChild(i)
    ReactDOM.render(Tooltip({ router, query, removeTooltip, transform }), i)
  }
}

export { handleMouseUp, removeTooltip }
