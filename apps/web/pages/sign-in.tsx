import { NextPage } from 'next'
import { OAuthButtonsGroup } from '../components/OAuthButtonsGroup'
import { AuthLayout } from '../layouts/AuthLayout'
import NextLink from 'next/link'

interface SignInProps {}

const SignIn: NextPage<SignInProps> = ({}) => {
  return (
    <AuthLayout>
      <div className="max-w-md w-full">
        <h3 className="mb-8 text-center text-lg font-semibold">
          <span className="text-teal-700">Sign in </span>
          to your account
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
          <div className="flex items-end justify-between text-sm font-medium">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 focus:outline-teal-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-gray-600">
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-teal-700 hover:text-teal-600 hover:underline focus:outline-teal-500"
            >
              Forgot your password?
            </a>
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
              or sign in with
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <OAuthButtonsGroup />
        </form>
        <div className="mt-8 text-sm font-medium">
          <span className="text-gray-600">{"Don't have an account? "}</span>
          <NextLink href="/sign-up" passHref>
            <a className="text-teal-700 hover:text-teal-600 hover:underline focus:outline-teal-500">
              Create an account
            </a>
          </NextLink>
        </div>
      </div>
    </AuthLayout>
  )
}

export default SignIn
