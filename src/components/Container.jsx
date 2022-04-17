const Container = ({ children }) => {
  const centering = 'mx-auto px-6'
  const sizing = 'max-w-3xl'
  const margin = 'mb-72'
  const debug = false
  const d = debug ? 'bg-blue-100' : ''
  return <div className={`${centering} ${sizing} ${margin} ${d}`}>{children}</div>
}

export default Container
