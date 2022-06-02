import { cacheExchange, createClient, dedupExchange, fetchExchange } from 'urql'
import { devtoolsExchange } from '@urql/devtools'
import { authExchange } from '@urql/exchange-auth'
import { authExchangeConfig } from './auth-exchange.config'

export const client = createClient({
  url: 'http://localhost:3090/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    cacheExchange,
    authExchange(authExchangeConfig),
    fetchExchange,
  ],
})
