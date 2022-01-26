import Link from 'next/link'
import { MathJax } from 'better-react-mathjax'

/* tailwind genius */
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config.js'
const tw = resolveConfig(tailwindConfig)

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
    plainMath: math ? 'hidden' : 'inline-block',
  }

  const color = {
    mathjax: {
      inline: 'text-pink-500/90',
      block: 'text-pink-500/90 mb-1-h bg-gray-50/50 border',
    },
    plainMath: 'text-pink-500/90',
  }

  /* math/code blocks */
  const pre = ({ children }) => {
    const increasedSpacing = children.props.children.replace(
      /\\\\\n/g,
      '\\\\[0.4em]\n'
    )
    return (
      <>
        <div
          className={`overflow-x-auto overflow-y-hidden ${color.mathjax.block} ${md.block}`}
        >
          <MathJax>{`$$${increasedSpacing}$$`}</MathJax>
        </div>
        <div
          className={`${color.plainMath} ${md.plainMath} mb-1-h border`}
        >
          <pre className="font-jetbrains bg-gray-50 p-4">
            {children.props.children}
          </pre>
        </div>
      </>
    )
  }

  /* inline math/code */
  const inlineCode = ({ children }) => {
    return (
      <>
        <span className={`${color.mathjax.inline} ${md.inline}`}>
          <MathJax inline>{`\\(${children}\\)`}</MathJax>
        </span>
        <span className={`${color.plainMath} ${md.plainMath}`}>
          {children}
        </span>
      </>
    )
  }

  const p = ({ children }) => {
    if (children.props?.mdxType === 'img') {
      return children
    } else {
      return <p>{children}</p>
    }
  }

  const img = ({ src, alt }) => {
    return (
      <div className="flex justify-center my-1-h max-h-48">
        <img src={src} alt={alt} className="object-contain" />
      </div>
    )
  }

  /* italics as tagged elements */
  const em = ({ children }) => {
    return <span id={children.replace(/ /g, '-')}>{children}</span>
  }

  const h1 = ({ children }) => {
    return (
      <h1 id={children.replace(/ /g, '-')} className="header">
        {children.toUpperCase()}
      </h1>
    )
  }

  const table = ({ children }) => {
    return (
      <div className="overflow-x-auto sm:overflow-x-visible">
        <table className="w-full table-fixed">{children}</table>
      </div>
    )
  }

  const components = {
    a,
    em,
    img,
    inlineCode,
    h1,
    p,
    pre,
    table,
  }

  const h = {
    linked: ['h2'],
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
