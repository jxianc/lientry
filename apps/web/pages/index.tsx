import { NextPage } from 'next'
import { BaseLayout } from '../layouts/BaseLayout'

interface HomeProps {}

const Home: NextPage<HomeProps> = ({}) => {
  return (
    <BaseLayout isMain={true}>
      <div>homepage here</div>
    </BaseLayout>
  )
}

export default Home
