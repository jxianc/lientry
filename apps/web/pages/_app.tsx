import type { AppProps } from 'next/app'
import { Provider as UrqlProvider } from 'urql'
import { Provider as JotaiProvider } from 'jotai'
import { useAtomsDebugValue } from 'jotai/devtools'
import { client } from '../lib/urql/urql-client'
import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'

// development only
const DebugAtoms = () => {
  useAtomsDebugValue()
  return null
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UrqlProvider value={client}>
      <JotaiProvider>
        <DebugAtoms />
        <ThemeProvider enableSystem={false} attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </JotaiProvider>
    </UrqlProvider>
  )
}

export default MyApp
