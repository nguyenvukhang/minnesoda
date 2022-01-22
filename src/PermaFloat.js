import { useEffect, useRef } from 'react'

function checkOutsideClick({ ref, floatRect, setFloatRect }) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (floatRect.display === 'none') {
        return
      }
      if (ref.current && !ref.current.contains(event.target)) {
        setFloatRect({
          height: 0,
          width: 0,
          display: 'none',
        })
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
  checkOutsideClick({ ref: floatRef, floatRect, setFloatRect })
  return (
    <div
      ref={floatRef}
      className="bg-emerald-500"
      style={floatRect}
    >
      Reference List
    </div>
  )
}

export default PermaFloat
