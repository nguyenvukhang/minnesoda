const Menubar = ({ state, components }) => {
  const [math, setMath] = state
  const toggleButtonColor = math ? 'text-pink-500' : 'text-neutral-400'
  const env = process.env.NODE_ENV

  const Reload = () => {
    return env === 'development' ? (
      <>
        <components.a href="#">Reload</components.a>
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
        <span className={`${toggleButtonColor} cursor-pointer hover:underline`}>
          {math ? ' on' : ' off'}
        </span>
      </a>
    )
  }

  return (
    <div className="mb-8 flex flex-row">
      <div className="flex-1">
        <components.a href="/">Home</components.a>{' '}
      </div>
      <div className="flex">
        <Reload />
        <MathToggle />
      </div>
    </div>
  )
}

export default Menubar
