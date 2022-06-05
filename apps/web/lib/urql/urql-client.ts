import { createClient, dedupExchange, fetchExchange } from 'urql'
import { devtoolsExchange } from '@urql/devtools'
import { authExchange } from '@urql/exchange-auth'
import { cacheExchange, QueryInput, Cache } from '@urql/exchange-graphcache'
import { authExchangeConfig } from './auth-exchange.config'
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  useMeQuery,
} from '../../generated/graphql'

function customUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query,
) {
  return cache.updateQuery(qi, (data: any) => fn(result, data as any) as any)
}

export const client = createClient({
  url: 'http://localhost:3090/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login(_result, _args, cache, _info) {
            cache.invalidate('Query', 'me')
          },
          logout(_result, _args, cache, _info) {
            customUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (_res, _q) => {
                return {
                  me: null,
                }
              },
            )
          },
        },
      },
    }),
    authExchange(authExchangeConfig),
    fetchExchange,
  ],
})
