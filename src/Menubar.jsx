const Menubar = ({ state, components, router }) => {
  const isPhysics = router.pathname.split('/')[1] === 'physics' && router.pathname.split('/').length >= 3
  const [math, setMath] = state
  const toggleButtonColor = math
    ? 'text-pink-500'
    : 'text-neutral-400'
  const env = process.env.NODE_ENV

  const Work = () => {
    return env === 'development' ? (
      <>
        <components.a href="/work">Work</components.a>
        <div className="w-12" />
      </>
    ) : null
  }

  const MathToggle = () => {
    return (
      <a
        className="text-accent cursor-pointer hover:underline"
        onClick={() => setMath(!math)}
      >
        Math:
        <span
          className={`${toggleButtonColor} cursor-pointer hover:underline`}
        >
          {math ? ' on' : ' off'}
        </span>
      </a>
    )
  }

  const HomeButton = () => {
    return isPhysics ? (
      <>
        <components.a href="/physics">Physics</components.a>
      </>
    ) : (
      <components.a href="/">Home</components.a>
    )
  }

  return (
    <div className="mb-8 flex flex-row">
      <div className="flex-1 flex">
        <HomeButton />
      </div>
      <div className="flex">
        <Work />
        <MathToggle />
      </div>
    </div>
  )
}

export default Menubar
