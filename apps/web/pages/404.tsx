import { NextPage } from 'next'
import { MainLayout } from '../layouts/MainLayout'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

interface NotFoundProps {}

const NotFound: NextPage<NotFoundProps> = ({}) => {
  const router = useRouter()

  return (
    <MainLayout>
      <div className="flex flex-col space-y-10 mt-10 items-center text-center justify-center content-center">
        <div>
          <div className="text-2xl font-bold">Oops! Not found</div>
          <div className="">The page you are looking for was not found</div>
        </div>
        <div className="flex space-x-1">
          <div>If this is a bug, please open an issue</div>
          <NextLink href={'https://github.com/jxianc/lientry/issues'} passHref>
            <a
              className="hover:underline text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
          </NextLink>
          .
        </div>
      </div>
    </MainLayout>
  )
}

export default NotFound
