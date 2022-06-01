import { NextPage } from 'next'
import { OAuthButtonsGroup } from '../components/OAuthButtonsGroup'
import { AuthLayout } from '../layouts/AuthLayout'
import NextLink from 'next/link'
import { signInInputs } from '../lib/inputs'
import { InputField } from '../components/InputField'
import { Form, Formik } from 'formik'

interface SignInProps {}

const SignIn: NextPage<SignInProps> = ({}) => {
  return (
    <AuthLayout>
      <div className="max-w-md w-full text-xs md:text-sm">
        <h3 className="mb-6 lg:mb-8 text-center text-sm md:text-base lg:text-lg font-semibold">
          <span className="text-teal-700">Sign in </span>
          to your account
        </h3>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={({ email, password }) => {
            console.log('submitted')
            console.log('email', email)
            console.log('password', password)
          }}
        >
          {() => (
            <Form className="space-y-4">
              <div className="rounded-md -space-y-px">
                {signInInputs.map((input, idx) => (
                  <InputField key={idx} {...input} />
                ))}
              </div>
              <div className="flex items-end justify-between text-xs md:text-sm font-medium">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 focus:outline-teal-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-gray-600"
                  >
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
                  className="w-full py-2 px-4 border border-transparent font-medium rounded-md text-white bg-teal-700 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Sign in
                </button>
              </div>
              <div className="relative flex py-2 px-0.5 items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-3 text-gray-400">
                  or sign in with
                </span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <OAuthButtonsGroup />
            </Form>
          )}
        </Formik>
        <div className="mt-8 font-medium">
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