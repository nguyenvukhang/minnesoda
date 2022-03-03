import NextLink from 'next/link'

const Link = ({ href, children, className }) => {
  const i = href[0]
  const isInternal = i === '/' || i === '#'
  return isInternal ? (
    <NextLink href={href}>
      <a className={className}>{children}</a>
    </NextLink>
  ) : (
    <a
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      {children}
    </a>
  )
}

export default Link
