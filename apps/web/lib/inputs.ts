import { InputFieldProps } from '../components/InputField'

const emailInput: InputFieldProps = {
  label: 'Email address',
  name: 'email',
  type: 'email',
  autoComplete: 'email',
  required: true,
  placeholder: 'Email address',
}

const signUpInputs: InputFieldProps[] = [
  emailInput,
  {
    label: 'Display name',
    name: 'displayName',
    type: 'text',
    required: false,
    placeholder: 'Display name',
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    autoComplete: 'current-password',
    required: true,
    placeholder: 'Password',
    helperText: [
      'Length should be at least 8 characters',
      'Should contains at least 1 uppercase letters',
      'Should contains at least 1 special character',
      'Should contains at least 1 number',
    ],
  },
]

const signInInputs: InputFieldProps[] = [
  emailInput,
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    autoComplete: 'current-password',
    required: true,
    placeholder: 'Password',
  },
]

const createTreeInputs: InputFieldProps[] = [
  {
    label: 'Title',
    name: 'title',
    type: 'text',
    required: true,
    placeholder: 'title',
  },
  {
    label: 'Description',
    name: 'description',
    type: 'text',
    required: false,
    placeholder: 'description',
  },
]

export { signUpInputs, signInInputs, createTreeInputs }
