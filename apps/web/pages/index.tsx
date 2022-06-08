import { NextPage } from 'next'
import { MainLayout } from '../layouts/MainLayout'

interface HomeProps {}

const Home: NextPage<HomeProps> = ({}) => {
  return (
    <MainLayout>
      <div>homepage</div>
    </MainLayout>
  )
}

export default Home
