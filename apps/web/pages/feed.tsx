import { NextPage } from 'next'
import { BaseLayout } from '../layouts/BaseLayout'

interface FeedProps {}

const Feed: NextPage<FeedProps> = ({}) => {
  return (
    <BaseLayout isMain={true}>
      <div>feed page</div>
    </BaseLayout>
  )
}

export default Feed
