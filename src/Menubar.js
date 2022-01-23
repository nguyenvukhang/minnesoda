const Menubar = ({ state, components }) => {
  const [math, setMath] = state
  const toggleButtonColor = math ? 'text-accent' : 'text-neutral-400'
  const env = process.env.NODE_ENV
  return (
    <div className="mb-8 flex flex-row">
      <div className="flex-1">
        <components.a href="/">Home</components.a>{' '}
      </div>
      <div className="flex">
        {env === 'development' ? (
          <>
            <components.a href="#">Reload</components.a>
            <div className="w-12" />
          </>
        ) : null}
        <a
          className={`${toggleButtonColor} cursor-pointer hover:underline`}
          onClick={() => setMath(!math)}
        >
          Math
        </a>
      </div>
    </div>
  )
}

export default Menubar
