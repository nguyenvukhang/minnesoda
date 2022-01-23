import references from '../pages/references.json'
import ReactDOM from 'react-dom'
/* tailwind genius */
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config.js'
const tw = resolveConfig(tailwindConfig)

const Tooltip = ({ router, query, removeTooltip, position }) => {
  const href = references[query].definition
  const spacing = 8

  function handleClick() {
    removeTooltip()
    router.push(href)
  }

  const boxShift = {
    boxShadow: `3px 3px 0px ${tw.theme.colors.gray[500]}`,
    // border: '2px solid #888888',
    transform:
      position === 'above'
        ? `translate(-50%, calc(-100% - ${spacing}px))`
        : `translate(-50%, ${spacing}px)`,
  }

  const hasReferences = references[query].hasOwnProperty('references')

  return (
    <div>
      <div
        className="absolute flex flex-col bg-sky-100 px-3 py-2 w-56"
        style={boxShift}
      >
        <a onClick={handleClick}>Go to definition</a>
        {hasReferences ? (
          <>
            <div className="mt-1-h">Go to reference</div>
            <div className="flex flex-col">
              {references[query].references.map((e) => (
                <a onClick={handleClick}>{e[0]}</a>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

/*
 * deletes the element with id of "reference-tooltip"
 */
function removeTooltip() {
  const exisitngFloat = document.getElementById('reference-tooltip')
  if (exisitngFloat) {
    exisitngFloat.remove()
  }
}

/*
 * grabs user selection.
 * if selection is non-empty and is in reference list,
 * display the tooltip there.
 * else,
 * use removeTooltip() to remove exisitng tooltip(s)
 */
function handleMouseUp({ router }) {
  const selection = window.getSelection()
  const query = selection.toString().toLowerCase().trim()

  if (query === '') {
    removeTooltip()
    return
  }

  if (references.hasOwnProperty(query)) {
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    const i = document.createElement('div')
    i.style.position = 'absolute'
    i.style.left = rect.left + rect.width / 2 + window.scrollX + 'px'
    i.id = 'reference-tooltip'
    var position
    // check if element is more than halfway down the screen
    if (rect.top > window.innerHeight / 2) {
      i.style.top = window.scrollY + rect.top + 'px'
      position = 'above'
    } else {
      i.style.top = window.scrollY + rect.top + rect.height + 'px' // set coordinates
      position = 'below'
    }
    removeTooltip()
    document.body.appendChild(i)
    ReactDOM.render(Tooltip({ router, query, removeTooltip, position }), i)
  } else {
    removeTooltip()
  }
}

export { handleMouseUp, removeTooltip }
