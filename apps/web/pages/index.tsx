import { NextPage } from 'next'

interface HomeProps {}

const Home: NextPage<HomeProps> = ({}) => {
  return (
    <div>
      <div className="text-red-400">hello world</div>
    </div>
  )
}

export default Home
