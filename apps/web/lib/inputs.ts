import { InputFieldProps } from '../components/InputField'

const signUpInputs: InputFieldProps[] = [
  {
    label: 'Email address',
    name: 'email',
    type: 'email',
    autoComplete: 'email',
    required: true,
    placeholder: 'Email address',
    isEdge: 'top',
  },
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
    isEdge: 'bottom',
  },
]

const signInInputs: InputFieldProps[] = [
  {
    label: 'Email address',
    name: 'email',
    type: 'email',
    autoComplete: 'email',
    required: true,
    placeholder: 'Email address',
    isEdge: 'top',
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    autoComplete: 'current-password',
    required: true,
    placeholder: 'Password',
    isEdge: 'bottom',
  },
]

export { signUpInputs, signInInputs }
