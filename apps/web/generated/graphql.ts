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
  isPublic?: InputMaybe<Scalars['Boolean']>
  name: Scalars['String']
}

export type CreateTreeResponse = {
  __typename?: 'CreateTreeResponse'
  errMsg?: Maybe<Scalars['String']>
  success: Scalars['Boolean']
  tree?: Maybe<TreeEntity>
}

export type EditLinksInput = {
  creates?: InputMaybe<Array<CreateLinkInput>>
  removes?: InputMaybe<Array<RemoveLinkInput>>
  updates?: InputMaybe<Array<UpdateLinkInput>>
}

export type EditLinksResponse = {
  __typename?: 'EditLinksResponse'
  errMsg?: Maybe<Scalars['String']>
  success: Scalars['Boolean']
  tree?: Maybe<TreeEntity>
}

export type LinkEntity = {
  __typename?: 'LinkEntity'
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  id: Scalars['String']
  title: Scalars['String']
  tree: TreeEntity
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
  logout: Scalars['Boolean']
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

export type ProviderEntity = {
  __typename?: 'ProviderEntity'
  id: Scalars['String']
  providerId: Scalars['String']
  providerName: Scalars['String']
  user: UserEntity
}

export type Query = {
  __typename?: 'Query'
  getRecentTrees: Array<TreeEntity>
  getTreeById: TreeEntity
  getTrendingTrees: Array<TreeEntity>
  getUserById?: Maybe<UserEntity>
  greeting: Scalars['String']
  me?: Maybe<UserEntity>
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

export type QueryGetUserByIdArgs = {
  userId: Scalars['String']
}

export type RegisterUserInput = {
  email: Scalars['String']
  name?: InputMaybe<Scalars['String']>
  password: Scalars['String']
}

export type RemoveLinkInput = {
  linkId: Scalars['String']
}

export type TreeEntity = {
  __typename?: 'TreeEntity'
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  id: Scalars['String']
  isPublic: Scalars['Boolean']
  links?: Maybe<Array<LinkEntity>>
  name: Scalars['String']
  updatedAt: Scalars['DateTime']
  user: UserEntity
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
  isPublic?: InputMaybe<Scalars['Boolean']>
  name?: InputMaybe<Scalars['String']>
}

export type UpdateTreeResponse = {
  __typename?: 'UpdateTreeResponse'
  errMsg?: Maybe<Scalars['String']>
  success: Scalars['Boolean']
  tree?: Maybe<TreeEntity>
}

export type UserEntity = {
  __typename?: 'UserEntity'
  createdAt: Scalars['DateTime']
  email?: Maybe<Scalars['String']>
  id: Scalars['String']
  image?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  provider?: Maybe<ProviderEntity>
  trees?: Maybe<Array<TreeEntity>>
  updatedAt: Scalars['DateTime']
}

export type CreateTreeMutationVariables = Exact<{
  createTreeInput: CreateTreeInput
}>

export type CreateTreeMutation = {
  __typename?: 'Mutation'
  createTree: {
    __typename?: 'CreateTreeResponse'
    success: boolean
    errMsg?: string | null
    tree?: {
      __typename?: 'TreeEntity'
      id: string
      name: string
      description?: string | null
      isPublic: boolean
      createdAt: any
      user: { __typename?: 'UserEntity'; id: string }
    } | null
  }
}

export type EditLinksMutationVariables = Exact<{
  curLinksInput: EditLinksInput
  treeId: Scalars['String']
}>

export type EditLinksMutation = {
  __typename?: 'Mutation'
  EditLinks: {
    __typename?: 'EditLinksResponse'
    success: boolean
    errMsg?: string | null
    tree?: {
      __typename?: 'TreeEntity'
      id: string
      name: string
      description?: string | null
      viewed: number
      isPublic: boolean
      createdAt: any
      updatedAt: any
      user: {
        __typename?: 'UserEntity'
        id: string
        name?: string | null
        image?: string | null
      }
      links?: Array<{
        __typename?: 'LinkEntity'
        id: string
        title: string
        description?: string | null
        url: string
      }> | null
    } | null
  }
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

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean }

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never }>

export type RefreshTokenMutation = {
  __typename?: 'Mutation'
  refreshToken: {
    __typename?: 'AuthResponse'
    success: boolean
    accessToken?: string | null
    errMsg?: string | null
  }
}

export type GetRecentTreesQueryVariables = Exact<{
  cursorId?: InputMaybe<Scalars['String']>
}>

export type GetRecentTreesQuery = {
  __typename?: 'Query'
  getRecentTrees: Array<{
    __typename?: 'TreeEntity'
    id: string
    name: string
    description?: string | null
    isPublic: boolean
    viewed: number
    createdAt: any
    user: {
      __typename?: 'UserEntity'
      id: string
      name?: string | null
      image?: string | null
    }
    links?: Array<{ __typename?: 'LinkEntity'; id: string }> | null
  }>
}

export type GetTreeByIdQueryVariables = Exact<{
  treeId: Scalars['String']
}>

export type GetTreeByIdQuery = {
  __typename?: 'Query'
  getTreeById: {
    __typename?: 'TreeEntity'
    id: string
    name: string
    description?: string | null
    viewed: number
    isPublic: boolean
    createdAt: any
    updatedAt: any
    user: {
      __typename?: 'UserEntity'
      id: string
      name?: string | null
      image?: string | null
    }
    links?: Array<{
      __typename?: 'LinkEntity'
      id: string
      title: string
      description?: string | null
      url: string
    }> | null
  }
}

export type GetTrendingTreesQueryVariables = Exact<{
  cursorId?: InputMaybe<Scalars['String']>
}>

export type GetTrendingTreesQuery = {
  __typename?: 'Query'
  getTrendingTrees: Array<{
    __typename?: 'TreeEntity'
    id: string
    name: string
    description?: string | null
    isPublic: boolean
    viewed: number
    createdAt: any
    updatedAt: any
    user: {
      __typename?: 'UserEntity'
      id: string
      name?: string | null
      image?: string | null
    }
    links?: Array<{ __typename?: 'LinkEntity'; id: string }> | null
  }>
}

export type GreetingQueryVariables = Exact<{ [key: string]: never }>

export type GreetingQuery = { __typename?: 'Query'; greeting: string }

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: 'Query'
  me?: {
    __typename?: 'UserEntity'
    id: string
    name?: string | null
    email?: string | null
    createdAt: any
    updatedAt: any
  } | null
}

export const CreateTreeDocument = gql`
  mutation CreateTree($createTreeInput: CreateTreeInput!) {
    createTree(createTreeInput: $createTreeInput) {
      success
      errMsg
      tree {
        id
        name
        description
        isPublic
        createdAt
        user {
          id
        }
      }
    }
  }
`

export function useCreateTreeMutation() {
  return Urql.useMutation<CreateTreeMutation, CreateTreeMutationVariables>(
    CreateTreeDocument,
  )
}
export const EditLinksDocument = gql`
  mutation EditLinks($curLinksInput: EditLinksInput!, $treeId: String!) {
    EditLinks(CURLinksInput: $curLinksInput, treeId: $treeId) {
      success
      errMsg
      tree {
        id
        name
        description
        viewed
        isPublic
        createdAt
        updatedAt
        user {
          id
          name
          image
        }
        links {
          id
          title
          description
          url
        }
      }
    }
  }
`

export function useEditLinksMutation() {
  return Urql.useMutation<EditLinksMutation, EditLinksMutationVariables>(
    EditLinksDocument,
  )
}
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
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
  )
}
export const RefreshTokenDocument = gql`
  mutation RefreshToken {
    refreshToken {
      success
      accessToken
      errMsg
    }
  }
`

export function useRefreshTokenMutation() {
  return Urql.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(
    RefreshTokenDocument,
  )
}
export const GetRecentTreesDocument = gql`
  query GetRecentTrees($cursorId: String) {
    getRecentTrees(cursorId: $cursorId) {
      id
      name
      description
      isPublic
      viewed
      createdAt
      user {
        id
        name
        image
      }
      links {
        id
      }
    }
  }
`

export function useGetRecentTreesQuery(
  options?: Omit<Urql.UseQueryArgs<GetRecentTreesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetRecentTreesQuery>({
    query: GetRecentTreesDocument,
    ...options,
  })
}
export const GetTreeByIdDocument = gql`
  query GetTreeById($treeId: String!) {
    getTreeById(treeId: $treeId) {
      id
      name
      description
      viewed
      isPublic
      createdAt
      updatedAt
      user {
        id
        name
        image
      }
      links {
        id
        title
        description
        url
      }
    }
  }
`

export function useGetTreeByIdQuery(
  options: Omit<Urql.UseQueryArgs<GetTreeByIdQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetTreeByIdQuery>({
    query: GetTreeByIdDocument,
    ...options,
  })
}
export const GetTrendingTreesDocument = gql`
  query GetTrendingTrees($cursorId: String) {
    getTrendingTrees(cursorId: $cursorId) {
      id
      name
      description
      isPublic
      viewed
      createdAt
      updatedAt
      user {
        id
        name
        image
      }
      links {
        id
      }
    }
  }
`

export function useGetTrendingTreesQuery(
  options?: Omit<Urql.UseQueryArgs<GetTrendingTreesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetTrendingTreesQuery>({
    query: GetTrendingTreesDocument,
    ...options,
  })
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
export const MeDocument = gql`
  query Me {
    me {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`

export function useMeQuery(
  options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options })
}
