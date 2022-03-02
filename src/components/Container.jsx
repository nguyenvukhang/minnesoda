const Container = ({ children }) => {
  const centering = 'mx-auto sm:p-0 px-6'
  const sizing = 'max-w-3xl'
  const debug = false
  const d = debug ? 'bg-blue-100' : ''
  return <div className={`${centering} ${sizing} ${d}`}>{children}</div>
}

export default Container
