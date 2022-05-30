import { NextPage } from 'next'
import { Container } from '../components/Container'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import NextLink from 'next/link'

interface HomeProps {}

const Home: NextPage<HomeProps> = ({}) => {
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-x min-h-screen">
        <div>
          <div className="flex flex-col space-y-2 text-center items-center justify-center lg:min-h-screen max-h-screen p-4">
            <h1 className="text-5xl font-bold">Lientry</h1>
            <h2 className="text-lg font-semibold">
              A place to store your links and share it to other people
            </h2>
          </div>
        </div>
        <div>
          <div className="flex flex-col min-h-screen max-h-screen items-center justify-center text-center p-4">
            <div className="max-w-md w-full">
              <h3 className="mb-8 text-center text-lg font-semibold">
                Sign in to your account
              </h3>
              <form className="space-y-4">
                <div className="rounded-md -space-y-px">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-t-md focus:outline-none focus:border-teal-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-b-md focus:outline-none focus:border-teal-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 focus:outline-teal-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="font-medium text-sm flex flex-col items-end">
                    <NextLink href="/sign-up" passHref>
                      <a className="text-teal-700 hover:text-teal-600 hover:underline focus:outline-teal-500">
                        Sign up
                      </a>
                    </NextLink>
                    <a
                      href="#"
                      className="text-teal-700 hover:text-teal-600 hover:underline focus:outline-teal-500"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-700 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    Sign in
                  </button>
                </div>
                <div className="relative flex py-2 px-0.5 items-center">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-3 text-sm text-gray-400">
                    or
                  </span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <div className="flex flex-row space-x-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center space-x-2 w-full py-2 px-4 bg-[#4285F4] hover:bg-[#3772d0] text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#84b3ff]"
                  >
                    <FaGoogle />
                    <span>Google</span>
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center space-x-2 w-full py-2 px-4 bg-[#333] hover:bg-[#272727] text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5f5f5f]"
                  >
                    <FaGithub />
                    <span>GitHub</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Home
