import { NextPage } from 'next'
import { BaseLayout } from '../layouts/BaseLayout'
import NextLink from 'next/link'

interface HomeProps {}

const Home: NextPage<HomeProps> = ({}) => {
  return (
    <BaseLayout>
      <div>home page</div>
      <div className="flex flex-col">
        <NextLink href="/sign-in">
          <a>sign in</a>
        </NextLink>
        <NextLink href="/sign-up">
          <a>sign up</a>
        </NextLink>
      </div>
    </BaseLayout>
  )
}

export default Home
