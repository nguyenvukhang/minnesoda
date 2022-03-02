const Container = ({ children }) => {
  const centering = 'mx-auto'
  const sizing = 'max-w-4xl'
  return <div className={`${centering} ${sizing}`}>{children}</div>
}

export default Container
