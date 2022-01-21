import { useState } from 'react'
import { useRef } from 'react'
import { Popover, ArrowContainer } from 'react-tiny-popover'

export default function Meme() {
  const clickMeButtonRef = useRef()
  const [isPopoverOpen, setIsPopoverOpen] = useState(true)
  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={['top', 'right', 'left', 'bottom']}
      padding={10}
      onClickOutside={() => setIsPopoverOpen(false)}
      ref={clickMeButtonRef} // if you'd like a ref to your popover's child, you can grab one here
      content={({ position, childRect, popoverRect }) => (
        <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
          position={position}
          childRect={childRect}
          popoverRect={popoverRect}
          arrowColor={'blue'}
          arrowSize={10}
          arrowStyle={{ opacity: 0.7 }}
          className="popover-arrow-container"
          arrowClassName="popover-arrow"
        >
          <div
            style={{ backgroundColor: 'blue', opacity: 0.7 }}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          >
            Hi! I'm popover content. Here's my position: {position}.
          </div>
        </ArrowContainer>
      )}
    >
      <button onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
        Click me!
      </button>
    </Popover>
  )
}
