import type { AppProps } from 'next/app'
import { Provider as UrqlProvider } from 'urql'
import { Provider as JotaiProvider } from 'jotai'
import { client } from '../lib/urql/urql-client'
import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UrqlProvider value={client}>
      <JotaiProvider>
        <ThemeProvider enableSystem={false} attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </JotaiProvider>
    </UrqlProvider>
  )
}

export default MyApp
