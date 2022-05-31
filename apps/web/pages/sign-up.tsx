import { NextPage } from 'next'
import NextLink from 'next/link'
import { AuthLayout } from '../layouts/AuthLayout'
import { OAuthButtonsGroup } from '../components/OAuthButtonsGroup'

interface SignUpProps {}

const SignUp: NextPage<SignUpProps> = ({}) => {
  return (
    <AuthLayout>
      <div className="max-w-md w-full text-xs md:text-sm">
        <h3 className="mb-6 lg:mb-8 text-center text-sm md:text-base lg:text-lg font-semibold">
          <span className="text-teal-700">Sign up </span>
          for an account
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
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-t-md focus:outline-none focus:border-teal-500 focus:z-10 text-xs md:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="display-name" className="sr-only">
                Display name
              </label>
              <input
                id="display-name"
                name="name"
                type="text"
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:z-10 text-xs md:text-sm"
                placeholder="Display name"
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
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-b-md focus:outline-none focus:border-teal-500 focus:z-10 text-xs md:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent font-medium rounded-md text-white bg-teal-700 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Sign up
            </button>
          </div>
          <div className="relative flex py-2 px-0.5 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-3 text-gray-400">
              or continue with
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <OAuthButtonsGroup />
        </form>
        <div className="mt-8 font-medium">
          <span className="text-gray-600">{'Already have an account? '}</span>
          <NextLink href="/sign-in" passHref>
            <a className="text-teal-700 hover:text-teal-600 hover:underline focus:outline-teal-500">
              Sign in
            </a>
          </NextLink>
        </div>
      </div>
    </AuthLayout>
  )
}

export default SignUp
