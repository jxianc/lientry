import { NextPage } from 'next'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { useMeQuery, User } from '../generated/graphql'
import { BaseLayout } from '../layouts/BaseLayout'
import { pages } from '../lib/pages'

interface HomeProps {}

const Home: NextPage<HomeProps> = ({}) => {
  const [{ data, fetching, error }] = useMeQuery()
  const [currentUser, setCurrentUser] = useState<User>()

  useEffect(() => {
    if (data && data.me) {
      setCurrentUser(data.me)
    }
  }, [data])

  return (
    <BaseLayout>
      <div className="max-w-xl mx-auto min-h-screen py-10 space-y-4">
        <div className="text-xl font-bold">Lientry dev page</div>
        {fetching && <div className="text-gray-600">loading ...</div>}
        {currentUser ? (
          <div>
            <span className="font-semibold">current user: </span>
            {currentUser.name ? currentUser.name : `usr-${currentUser.id}`}
          </div>
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
