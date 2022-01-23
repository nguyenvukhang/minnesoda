import Head from 'next/head'
import Favicon from '../src/Favicon'

export default function CustomHead() {
  return (
    <Head>
      <title>minnesoda</title>
      <meta property="og:title" content="minnesoda" key="title" />
      <Favicon/>
    </Head>
  )
}
