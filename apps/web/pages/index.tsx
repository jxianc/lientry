import { NextPage } from 'next'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { useLogoutMutation, useMeQuery, User } from '../generated/graphql'
import { BaseLayout } from '../layouts/BaseLayout'
import { removeAccessToken } from '../lib/acess-token-operation'
import { pages } from '../lib/pages'

interface HomeProps {}

const Home: NextPage<HomeProps> = ({}) => {
  const [{ data: meData, fetching }] = useMeQuery()
  const [loading, setLoading] = useState(false)
  const [_, execLogout] = useLogoutMutation()
  const [currentUser, setCurrentUser] = useState<User | null>()

  useEffect(() => {
    if (meData && meData.me) {
      setCurrentUser(meData.me)
    } else {
      setCurrentUser(null)
    }

    if (fetching) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [meData, fetching])

  return (
    <BaseLayout>
      <div className="max-w-xl mx-auto min-h-screen py-10 space-y-4">
        <div className="text-xl font-bold">Lientry dev page</div>
        {loading && <div className="text-gray-600">loading ...</div>}
        {currentUser ? (
          <>
            <div>
              <span className="font-semibold">current user: </span>
              {currentUser.name ? currentUser.name : `usr-${currentUser.id}`}
            </div>
            <button
              className="px-2 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white"
              onClick={async () => {
                removeAccessToken()
                await execLogout()
              }}
            >
              logout
            </button>
          </>
        ) : (
          <div className="text-red-500 font-semibold">no user</div>
        )}
        <div className="flex flex-col">
          {pages.map((p, idx) => (
            <NextLink href={p.url} key={idx} passHref>
              <a className="hover:text-teal-700 hover:underline">{p.name}</a>
            </NextLink>
          ))}
        </div>
      </div>
    </BaseLayout>
  )
}

export default Home
