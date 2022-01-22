import { Popover, ArrowContainer } from 'react-tiny-popover'
import Link from 'next/link'
import { MathJax } from 'better-react-mathjax'
import React, { useState } from 'react'
import references from '../pages/references.json'

/* tailwind genius */
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config.js'
const tw = resolveConfig(tailwindConfig)

function handleMouseUp(setFloatRect) {
  const selection = window.getSelection()
  const query = selection.toString().toLowerCase().trim()

  if (query === '') {
    return
  }

  if (references.hasOwnProperty(query)) {
    console.log('has reference!')
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    setFloatRect({
      top: rect.y + rect.height,
      left: rect.x,
      display: 'block',
      position: 'absolute',
      boxShadow: "2px 2px 2px #AAAAAA"
    })
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
    linked: ['h1', 'h2'],
    unlinked: ['h3', 'h4', 'h5', 'h6'],
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
