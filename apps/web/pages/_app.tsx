import type { AppProps } from 'next/app'
import { Provider as UrqlProvider } from 'urql'
import { Provider as JotaiProvider } from 'jotai'
import { client } from '../lib/urql/urql-client'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UrqlProvider value={client}>
      <JotaiProvider>
        <Component {...pageProps} />
      </JotaiProvider>
    </UrqlProvider>
  )
}

export default MyApp
