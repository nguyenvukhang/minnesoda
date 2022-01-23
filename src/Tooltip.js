import references from '../pages/references.json'
import ReactDOM from 'react-dom'

const Tooltip = ({ router, query, removeTooltip, position }) => {
  const href = references[query].definition
  const arrowSize = 10
  const spacing = 5

  function handleClick() {
    removeTooltip()
    router.push(href)
  }

  const boxShift = {
    boxShadow: '2px 2px 2px #AAAAAA',
    transform:
      position === 'above'
        ? `translateY(calc(-100% - ${arrowSize}px - ${spacing}px))`
        : `translateY(${spacing}px)`,
  }

  const Arrow = () => {
    const down = 'border-x-transparent border-y-blue-200'
    const rotate = {
      transform:
        position === 'above'
          ? `translateY(-${arrowSize + spacing}px)`
          : `translateY(${spacing}px)`,
      borderWidth:
        position === 'above'
          ? `${arrowSize}px ${arrowSize}px 0px ${arrowSize}px`
          : `0px ${arrowSize}px ${arrowSize}px ${arrowSize}px`,
    }
    return <div className={down} style={rotate} />
  }

  return (
    <div>
      {position === 'below' ? <Arrow /> : null}
      <div
        className="absolute flex flex-col bg-blue-200 px-3 py-2"
        style={boxShift}
      >
        <a onClick={handleClick}>Go to definition</a>
        <div className="mt-1-h">Go to reference</div>
        <div className="flex flex-col">
          {references[query].references.map((e) => (
            <a onClick={handleClick}>{e[0]}</a>
          ))}
        </div>
      </div>
      {position === 'above' ? <Arrow /> : null}
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
    var position
    // check if element is more than halfway down the screen
    if (rect.top > window.innerHeight / 2) {
      i.style.top = window.scrollY + rect.top + 'px' // set coordinates
      position = 'above'
    } else {
      i.style.top = window.scrollY + rect.top + rect.height + 'px' // set coordinates
      position = 'below'
    }
    document.body.appendChild(i)
    ReactDOM.render(Tooltip({ router, query, removeTooltip, position }), i)
  }
}

export { handleMouseUp, removeTooltip }
