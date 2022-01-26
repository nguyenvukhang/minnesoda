import refData from '../pages/references.json'
import ReactDOM from 'react-dom'
/* tailwind genius */
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config.js'
const tw = resolveConfig(tailwindConfig)

const Tooltip = ({
  router,
  definition,
  references,
  removeTooltip,
  position,
}) => {
  const spacing = 8

  function handleClick(href) {
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

  const hasReferences = Array.isArray(references) && references.length >= 1

  return (
    <div>
      <div
        className="absolute flex flex-col bg-sky-100 px-3 py-2 w-56"
        style={boxShift}
      >
        <a onClick={() => handleClick(definition)}>Go to definition</a>
        {hasReferences ? (
          <>
            <div className="mt-1-h">Go to reference</div>
            <div className="flex flex-col">
              {references.map((e) => (
                <a onClick={() => handleClick(e[1])}>{e[0]}</a>
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

  /*
   * clean up selection to make it more accepting
   * removes the following characters  , . { } [ ] ( ) "
   * (apostrophe is kept inside for named laws)
   */
  function cleanUp(str) {
    const removeList = [
      ',',
      '"',
      '\\.',
      '\\(',
      '\\)',
      '\\[',
      '\\]',
      '\\{',
      '\\}',
    ]
    removeList.forEach((e) => {
      const re = new RegExp(e, 'g')
      str = str.replace(re, '')
    })
    return str.trim().toLowerCase()
  }

  const selection = window.getSelection()
  const query = cleanUp(selection.toString())

  if (query === '') {
    removeTooltip()
    return
  }

  /*
   * looks up the database for the query
   */
  var hit
  if (refData.aliases.hasOwnProperty(query)) {
    const alias = refData.aliases[query]
    hit = refData.navigation[alias]
  } else if (refData.navigation.hasOwnProperty(query)) {
    hit = refData.navigation[query]
  } else {
    removeTooltip()
    return
  }

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
  ReactDOM.render(
    Tooltip({
      router,
      definition: hit.definition,
      references: hit.references,
      removeTooltip,
      position,
    }),
    i
  )
}

export { handleMouseUp, removeTooltip }
