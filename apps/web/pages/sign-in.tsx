import { Field, Form, Formik } from 'formik'
import { NextPage } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { InputField } from '../components/InputField'
import { OAuthButtonsGroup } from '../components/OAuthButtonsGroup'
import { useLoginMutation } from '../generated/graphql'
import { AuthLayout } from '../layouts/AuthLayout'
import { setAccessToken } from '../lib/acess-token-operation'
import { gqlErrorHandler } from '../lib/error-handler'
import { SignInSchema } from '../lib/input-validation'
import { signInInputs } from '../lib/inputs'

interface SignInProps {}

const SignIn: NextPage<SignInProps> = ({}) => {
  const [{ fetching }, execLogin] = useLoginMutation()
  const [bottomErrors, setBottomErrors] = useState<string[]>()
  const router = useRouter()

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
          validationSchema={SignInSchema}
          onSubmit={async ({ email, password }) => {
            const { data, error } = await execLogin({
              loginUserInput: { email, password },
            })
            if (error) {
              setBottomErrors(gqlErrorHandler(error.graphQLErrors))
            } else if (data && data.login.success && data.login.accessToken) {
              setAccessToken(data.login.accessToken)
              router.push('/')
            }
          }}
        >
          {() => (
            <Form className="space-y-4">
              <div className="rounded-md space-y-4 text-left">
                {signInInputs.map((input, idx) => {
                  return <Field key={idx} {...input} component={InputField} />
                })}
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
              {bottomErrors && (
                <ul className="px-2 list-disc list-inside text-left text-red-500 font-semibold">
                  {bottomErrors.map((err, idx) => (
                    <li key="idx">{err}</li>
                  ))}
                </ul>
              )}
              <div>
                <button
                  type="submit"
                  className="mt-12 inline-flex items-center justify-center w-full py-2 px-4 border border-transparent font-medium rounded-md text-white bg-teal-700 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  {fetching && (
                    <svg
                      className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
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
