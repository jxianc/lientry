import { NextPage } from 'next'
import { MainLayout } from '../layouts/MainLayout'

interface FeedProps {}

const Feed: NextPage<FeedProps> = ({}) => {
  return (
    <MainLayout>
      <div>feed page</div>
    </MainLayout>
  )
}

export default Feed
