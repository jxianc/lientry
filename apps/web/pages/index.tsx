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
    <BaseLayout isMain={true}>
      <div>homepage here</div>
    </BaseLayout>
  )
}

export default Home
