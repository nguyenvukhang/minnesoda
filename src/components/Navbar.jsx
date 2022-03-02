import Link from '@/components/mdx/Link'

const Navbar = () => {
  const Work = () => {
    return process.env.NODE_ENV === 'development' ? (
      <>
        <Link href="/work">Work</Link>
      </>
    ) : null
  }

  const HomeButton = () => {
    return <Link href="/">Home</Link>
  }

  return (
    <div className="my-8 flex flex-row">
      <div className="flex-1 flex">
        <HomeButton />
      </div>
      <div className="flex">
        <Work />
      </div>
    </div>
  )
}

export default Navbar
