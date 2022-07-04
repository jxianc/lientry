import { devtoolsExchange } from '@urql/devtools'
import { authExchange } from '@urql/exchange-auth'
import { Cache, cacheExchange, QueryInput } from '@urql/exchange-graphcache'
import { createClient, dedupExchange, fetchExchange } from 'urql'
import {
  EditLinksMutation,
  GetTreeByIdDocument,
  GetTreeByIdQuery,
} from '../../generated/graphql'
// import { LogoutMutation, MeDocument, MeQuery } from '../../generated/graphql'
import { authExchangeConfig } from './auth-exchange.config'

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
            cache.invalidate('Query', 'getRecentTrees')
            cache.invalidate('Query', 'getTrendingTrees')
          },
          logout(_result, _args, _cache, _info) {
            // customUpdateQuery<LogoutMutation, MeQuery>(
            //   cache,
            //   { query: MeDocument },
            //   _result,
            //   (_res, _q) => {
            //     return {
            //       me: null,
            //     }
            //   },
            // )
            // cache.invalidate('Query', 'getRecentTrees')
            // cache.invalidate('Query', 'getTrendingTrees')
          },
          EditLinks(_result, _args, cache, _info) {
            customUpdateQuery<EditLinksMutation, GetTreeByIdQuery>(
              cache,
              {
                query: GetTreeByIdDocument,
              },
              _result,
              (res, q) => {
                return {
                  // NOTE if the response.success is true, the tree exists
                  getTreeById: res.EditLinks.success
                    ? res.EditLinks.tree!
                    : q.getTreeById,
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
