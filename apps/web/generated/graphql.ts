import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any
}

export type AuthResponse = {
  __typename?: 'AuthResponse'
  accessToken?: Maybe<Scalars['String']>
  errMsg?: Maybe<Scalars['String']>
  success: Scalars['Boolean']
}

export type BaseResponse = {
  __typename?: 'BaseResponse'
  errMsg?: Maybe<Scalars['String']>
  success: Scalars['Boolean']
}

export type CreateLinkInput = {
  description?: InputMaybe<Scalars['String']>
  title: Scalars['String']
  url: Scalars['String']
}

export type CreateTreeInput = {
  description?: InputMaybe<Scalars['String']>
  name: Scalars['String']
}

export type CreateTreeResponse = {
  __typename?: 'CreateTreeResponse'
  errMsg?: Maybe<Scalars['String']>
  success: Scalars['Boolean']
  tree?: Maybe<Tree>
}

export type EditLinksInput = {
  creates?: InputMaybe<Array<CreateLinkInput>>
  removes?: InputMaybe<Array<RemoveLinkInput>>
  updates?: InputMaybe<Array<UpdateLinkInput>>
}

export type EditLinksResponse = {
  __typename?: 'EditLinksResponse'
  errMsg?: Maybe<Scalars['String']>
  links?: Maybe<Array<Link>>
  success: Scalars['Boolean']
}

export type Link = {
  __typename?: 'Link'
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  id: Scalars['String']
  title: Scalars['String']
  tree: Tree
  updatedAt: Scalars['DateTime']
  url: Scalars['String']
}

export type LoginUserInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  EditLinks: EditLinksResponse
  createTree: CreateTreeResponse
  login: AuthResponse
  refreshToken: AuthResponse
  register: AuthResponse
  removeTree: BaseResponse
  updateTree: UpdateTreeResponse
}

export type MutationEditLinksArgs = {
  CURLinksInput: EditLinksInput
  treeId: Scalars['String']
}

export type MutationCreateTreeArgs = {
  createTreeInput: CreateTreeInput
}

export type MutationLoginArgs = {
  loginUserInput: LoginUserInput
}

export type MutationRegisterArgs = {
  registerUserInput: RegisterUserInput
}

export type MutationRemoveTreeArgs = {
  treeId: Scalars['String']
}

export type MutationUpdateTreeArgs = {
  treeId: Scalars['String']
  updateTreeInput: UpdateTreeInput
}

export type Provider = {
  __typename?: 'Provider'
  id: Scalars['String']
  providerId: Scalars['String']
  providerName: Scalars['String']
  user: User
}

export type Query = {
  __typename?: 'Query'
  getRecentTrees: Array<Tree>
  getTreeById: Tree
  getTrendingTrees: Array<Tree>
  greeting: Scalars['String']
  me: User
}

export type QueryGetRecentTreesArgs = {
  cursorId?: InputMaybe<Scalars['String']>
}

export type QueryGetTreeByIdArgs = {
  treeId: Scalars['String']
}

export type QueryGetTrendingTreesArgs = {
  cursorId?: InputMaybe<Scalars['String']>
}

export type RegisterUserInput = {
  email: Scalars['String']
  name?: InputMaybe<Scalars['String']>
  password: Scalars['String']
}

export type RemoveLinkInput = {
  linkId: Scalars['String']
}

export type Tree = {
  __typename?: 'Tree'
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  id: Scalars['String']
  links?: Maybe<Array<Link>>
  name: Scalars['String']
  updatedAt: Scalars['DateTime']
  user: User
  viewed: Scalars['Float']
}

export type UpdateLinkInput = {
  description?: InputMaybe<Scalars['String']>
  linkId: Scalars['String']
  title?: InputMaybe<Scalars['String']>
  url?: InputMaybe<Scalars['String']>
}

export type UpdateTreeInput = {
  description?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
}

export type UpdateTreeResponse = {
  __typename?: 'UpdateTreeResponse'
  errMsg?: Maybe<Scalars['String']>
  success: Scalars['Boolean']
  tree?: Maybe<Tree>
}

export type User = {
  __typename?: 'User'
  createdAt: Scalars['DateTime']
  email?: Maybe<Scalars['String']>
  id: Scalars['String']
  image?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  provider?: Maybe<Provider>
  trees?: Maybe<Array<Tree>>
  updatedAt: Scalars['DateTime']
}

export type LoginMutationVariables = Exact<{
  loginUserInput: LoginUserInput
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login: {
    __typename?: 'AuthResponse'
    accessToken?: string | null
    errMsg?: string | null
    success: boolean
  }
}

export type GreetingQueryVariables = Exact<{ [key: string]: never }>

export type GreetingQuery = { __typename?: 'Query'; greeting: string }

export const LoginDocument = gql`
  mutation Login($loginUserInput: LoginUserInput!) {
    login(loginUserInput: $loginUserInput) {
      accessToken
      errMsg
      success
    }
  }
`

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument)
}
export const GreetingDocument = gql`
  query Greeting {
    greeting
  }
`

export function useGreetingQuery(
  options?: Omit<Urql.UseQueryArgs<GreetingQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GreetingQuery>({ query: GreetingDocument, ...options })
}
