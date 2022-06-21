import { Dialog, Transition } from '@headlessui/react'
import { Field, Form, Formik } from 'formik'
import React, { Fragment } from 'react'
import { SignInSchema } from '../lib/input-validation'
import { createTreeInputs } from '../lib/inputs'
import { InputField } from './InputField'

interface CreateTreeFormModalProps {
  modalIsOpen: boolean
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const CreateTreeFormModal: React.FC<CreateTreeFormModalProps> = ({
  modalIsOpen,
  setModalIsOpen,
}) => {
  return (
    <Transition.Root show={modalIsOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-20 inset-20 overflow-y-auto"
        onClose={setModalIsOpen}
      >
        <div className="flex items-end justify-center text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-li-gray-1100/50 dark:bg-li-gray-1300/50 backdrop-filter backdrop-blur-sm transition-opacity" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block rounded-[0.3rem] overflow-hidden transform transition-all w-full max-w-2xl">
              <div className="bg-white dark:bg-li-gray-1500 p-6">
                <div className="text-left space-y-4">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-bold">
                    Create a new tree
                  </Dialog.Title>
                  <div className="text-base">
                    <Formik
                      initialValues={{
                        name: '',
                        description: '',
                      }}
                      validationSchema={SignInSchema}
                      onSubmit={async ({ name, description }) => {
                        console.log('submitted')
                      }}
                    >
                      {() => (
                        <Form className="space-y-4">
                          <div className="rounded-md space-y-4 text-left mb-20">
                            {createTreeInputs.map((input, idx) => {
                              return (
                                <Field
                                  key={idx}
                                  {...input}
                                  component={InputField}
                                />
                              )
                            })}
                          </div>
                          <div className="flex space-x-4 justify-end">
                            <button
                              type="button"
                              className="py-1.5 px-4 rounded-[0.3rem] hover:bg-li-gray-200"
                              onClick={() => setModalIsOpen(false)}
                            >
                              cancel
                            </button>
                            <button
                              type="submit"
                              className="bg-li-green-main text-white py-1.5 px-4 rounded-[0.3rem]"
                            >
                              create
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
