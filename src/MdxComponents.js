import { Popover, ArrowContainer } from 'react-tiny-popover'
import Link from 'next/link'
import { MathJax } from 'better-react-mathjax'
import { useState } from 'react'
import references from '../pages/references.json'

/* tailwind genius */
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config.js'
const tw = resolveConfig(tailwindConfig)

function handleMouseUp() {

  var a = document.createElement('span')
  a.setAttribute('tabindex', '0')
  a.setAttribute('className', 'text-green-200')
  a.setAttribute('data-toggle', 'popover')
  a.setAttribute('data-content', 'Some content inside the popover')
  a.setAttribute('title', 'popover title')

  const wrap = <div>stuff</div>

  const selection = window.getSelection()
  const query = selection.toString().toLowerCase().trim()
  if (query === '') {
    return
  }
  if (references.hasOwnProperty(query)) {
    console.log('has reference!')
    const range = selection.getRangeAt(0).cloneRange()
    range.surroundContents(a)
    selection.removeAllRanges()
    selection.addRange(range)
  } else {
    console.log("doesn't have a reference")
  }
  console.log('mouseup', query)
}

const getComponents = ({ math }) => {
  const a = ({ href, children }) => {
    return (
      <Link href={href}>
        <a>{children}</a>
      </Link>
    )
  }

  const pre = ({ children }) => {
    return math ? (
      <MathJax>{`$$${children.props.children}$$`}</MathJax>
    ) : (
      <p className="text-pink-500">{children.props.children}</p>
    )
  }

  const inlineCode = ({ children }) => {
    return math ? (
      <MathJax inline>{`\\(${children}\\)`}</MathJax>
    ) : (
      <span className="text-pink-500">{children}</span>
    )
  }

  const p = ({ children }) => {
    return <p>{children}</p>
  }

  const components = { a, pre, inlineCode, p }

  const h = {
    linked: ['h2'],
    unlinked: ['h3', 'h4', 'h5', 'h6'],
  }

  const customH1 = false
  if (customH1) {
    const h1 = ({ children }) => {
      const [isPopoverOpen, setIsPopoverOpen] = useState(false)
      return (
        <h1 className="header">
          <Popover
            isOpen={isPopoverOpen}
            reposition={false}
            onClickOutside={() => setIsPopoverOpen(false)}
            positions={['top', 'bottom', 'left', 'right']}
            content={({ position, childRect, popoverRect }) => (
              <ArrowContainer
                position={position}
                childRect={childRect}
                popoverRect={popoverRect}
                arrowColor={tw.theme.colors.blue[100]}
                arrowSize={10}
                className="popover-arrow-container"
                arrowClassName="popover-arrow"
              >
                <div className="bg-blue-100 p-2">
                  <span>Referenced:</span>
                  <div>
                    {references[children].referenced.map((e) => {
                      return (
                        <>
                          <Link href={e.href}>
                            <a>{e.title}</a>
                          </Link>
                        </>
                      )
                    })}
                  </div>
                </div>
              </ArrowContainer>
            )}
          >
            <span
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              className="cursor-pointer"
            >
              {children}
            </span>
          </Popover>
        </h1>
      )
    }
    components.h1 = h1
  } else {
    h.linked.push('h1')
  }

  h.linked.forEach((Tag) => {
    components[Tag] = ({ children }) => (
      <Tag id={children.replace(/ /g, '-')} className="header">
        {children}
      </Tag>
    )
  })

  h.unlinked.forEach((Tag) => {
    components[Tag] = ({ children }) => <Tag className="header">{children}</Tag>
  })
  return components
}

export default getComponents
export { handleMouseUp }
