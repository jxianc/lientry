import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { MainLayout } from '../../layouts/MainLayout'

interface UserPageProps {}

const UserPage: NextPage<UserPageProps> = ({}) => {
  const router = useRouter()
  const { userId } = router.query

  return (
    <MainLayout>
      <div>user individual page</div>
      <div>user id: {userId}</div>
    </MainLayout>
  )
}

export default UserPage
