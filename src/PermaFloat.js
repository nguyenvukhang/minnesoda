import Link from 'next/link'
import { useEffect, useRef } from 'react'
import references from '../pages/references.json'

function handleMouseUp(setFloatRect) {
  const selection = window.getSelection()
  const query = selection.toString().toLowerCase().trim()

  if (query === '') {
    return
  }

  if (references.hasOwnProperty(query)) {
    // console.log('has reference!')
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    setFloatRect({
      top: rect.y + rect.height + 4,
      left: rect.x,
      display: 'block',
      position: 'absolute',
      boxShadow: '2px 2px 2px #AAAAAA',
      query,
    })
  } else {
    // console.log("doesn't have a reference")
  }
  // console.log('mouseup', query)
}

function checkOutsideClick({ ref, floatRect, closeFloat }) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (floatRect.display === 'none') {
        return
      }
      if (ref.current && !ref.current.contains(event.target)) {
        closeFloat()
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, floatRect])
}

const PermaFloat = ({ floatRect, setFloatRect }) => {
  const floatRef = useRef(null)
  function closeFloat() {
    setFloatRect({
      height: 0,
      width: 0,
      display: 'none',
    })
  }
  checkOutsideClick({ ref: floatRef, floatRect, closeFloat })
  const isOpen = floatRect.display === 'block'
  const query = floatRect.query
  console.log(references[query]?.references)
  return isOpen ? (
    <div
      ref={floatRef}
      className="flex flex-col bg-blue-100 px-3 py-2"
      style={floatRect}
    >
      <Link href={references[query].definition}>
        <a onClick={() => closeFloat()}>Go to definition</a>
      </Link>
      <div className='mt-1-h'>Go to reference</div>
      <div className="flex flex-col">
        {references[query].references.map((e) => (
          <Link href={e[1]}>
            <a onClick={() => closeFloat()}>{e[0]}</a>
          </Link>
        ))}
      </div>
    </div>
  ) : null
}

export default PermaFloat
export { handleMouseUp }
