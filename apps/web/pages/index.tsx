import { NextPage } from 'next'
import { Navbar } from '../components/Navbar'
import { BaseLayout } from '../layouts/BaseLayout'

interface HomeProps {}

const Home: NextPage<HomeProps> = ({}) => {
  return (
    <BaseLayout>
      <div>homepage here</div>
    </BaseLayout>
  )
}

export default Home
