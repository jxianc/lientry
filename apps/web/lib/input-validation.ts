import * as Yup from 'yup'
import YupPassword from 'yup-password'

YupPassword(Yup)

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password is too short')
    .minUppercase(1, 'Password must contains at least 1 uppercase')
    .minSymbols(1, 'Password must contains at least 1 symbols')
    .minNumbers(1, 'Password must contains at least 1 number')
    .required('Password is required'),
})

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
})

// TODO add validation for createTree
const CreateTreeSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
})

// TODO add validation for createLink
const CreateLinkSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  url: Yup.string().url('Invalid url').required('Url is required'),
})

export { SignUpSchema, SignInSchema, CreateTreeSchema, CreateLinkSchema }
