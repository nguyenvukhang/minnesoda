import Link from 'next/link'
import { MathJax } from 'better-react-mathjax'

/* tailwind genius */
// import resolveConfig from 'tailwindcss/resolveConfig'
// import tailwindConfig from '../tailwind.config.js'
// const tw = resolveConfig(tailwindConfig)

const getComponents = ({ math }) => {
  const a = ({ href, children }) => {
    return (
      <Link href={href}>
        <a>{children}</a>
      </Link>
    )
  }

  const md = {
    block: math ? 'block' : 'hidden',
    inline: math ? 'inline-block' : 'hidden',
    plain: math ? 'hidden' : 'inline-block',
  }

  const pre = ({ children }) => {
    return (
      <>
        <div
          className={`overflow-x-auto overflow-y-hidden text-pink-500 ${md.block}`}
        >
          <MathJax>{`$$${children.props.children}$$`}</MathJax>
        </div>
        <p className={`text-pink-500 ${md.plain}`}>
          {children.props.children}
        </p>
      </>
    )
  }

  const inlineCode = ({ children }) => {
    return (
      <>
        <span className={`text-pink-500 ${md.inline}`}>
          <MathJax inline>{`\\(${children}\\)`}</MathJax>
        </span>
        <span className={`text-pink-500 ${md.plain}`}>
          {children}
        </span>
      </>
    )
  }

  const p = ({ children }) => {
    const className = "overflow-x-auto overflow-y-hidden"
    try {
      if (children.props.mdxType === 'img') {
        return children
      } else {
        return <p className={className}>{children}</p>
      }
    } catch {
      return <p className={className}>{children}</p>
    }
  }

  const img = ({ src, alt }) => {
    return (
      <div className="flex justify-center my-1-h max-h-48">
        <img src={src} alt={alt} className="object-contain" />
      </div>
    )
  }

  const em = ({ children }) => {
    return (
      <span id={children.replace(/ /g, '-')}>{children}</span>
    )
  }

  const components = {
    a,
    em,
    img,
    inlineCode,
    p,
    pre,
  }

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
    components[Tag] = ({ children }) => (
      <Tag className="header">{children}</Tag>
    )
  })
  return components
}

export default getComponents

/* MDX Components Reference
 *
 * p              Paragraph
 * h1             Heading 1       #
 * h2             Heading 2       ##
 * h3             Heading 3       ###
 * h4             Heading 4       ####
 * h5             Heading 5       #####
 * h6             Heading 6       ######
 * thematicBreak  Thematic break  ***
 * blockquote     Blockquote      >
 * ul             List            -
 * ol             Ordered list    1.
 * li             List item
 * table          Table           --- | --- | ---
 * tr             Table row       This | is | a | table row
 * td/th          Table cell
 * pre            Pre             ```pre```
 * code           Code            `code`
 * em             Emphasis        _emphasis_
 * strong         Strong          **strong**
 * delete         Delete          ~~strikethrough~~
 * code           InlineCode
 * hr             Break           ---
 * a              Link            <https://mdxjs.com> or [MDX](https://mdxjs.com)
 * img            Image           ![alt](https://mdx-logo.now.sh)
 */
