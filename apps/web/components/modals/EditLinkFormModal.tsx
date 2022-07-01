import { Transition, Dialog } from '@headlessui/react'
import { Formik, Form, Field } from 'formik'
import React, { Fragment, useRef } from 'react'
import { CreateLinkSchema } from '../../lib/input-validation'
import { createLinkInputs } from '../../lib/inputs'
import { InputField } from '../InputField'
import { ModalBackground } from './ModalBackground'

interface EditLinkFormModalProps {
  modalIsOpen: boolean
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  linkId: string
  title: string
  description?: string | null
  url: string
}

export const EditLinkFormModal: React.FC<EditLinkFormModalProps> = ({
  title,
  description,
  url,
  modalIsOpen,
  setModalIsOpen,
}) => {
  // useRef
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={modalIsOpen} as={Fragment}>
      <Dialog
        initialFocus={cancelButtonRef}
        as="div"
        className="fixed z-20 inset-20 overflow-y-auto"
        onClose={setModalIsOpen}
      >
        <div className="flex items-end justify-center text-center sm:block sm:p-0">
          <ModalBackground />
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
              <div className="bg-white dark:bg-li-gray-1400 p-6">
                <div className="text-left space-y-4">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-bold">
                    Edit your link
                  </Dialog.Title>
                  <div className="text-base">
                    <Formik
                      initialValues={{
                        title,
                        description: description || '',
                        url,
                      }}
                      validationSchema={CreateLinkSchema}
                      onSubmit={async ({ title, description, url }) => {
                        console.log(title, description, url)
                        setModalIsOpen(false)
                      }}
                    >
                      {() => (
                        <Form>
                          <div className="rounded-md space-y-4 text-left">
                            {createLinkInputs.map((input, idx) => {
                              return (
                                <Field
                                  key={idx}
                                  {...input}
                                  component={InputField}
                                />
                              )
                            })}
                          </div>
                          {/* {bottomErrors && (
                            <ul className="px-2 list-disc list-inside text-left text-red-500 font-semibold">
                              {bottomErrors.map((err, idx) => (
                                <li key={idx}>{err}</li>
                              ))}
                            </ul>
                          )} */}
                          <div className="flex space-x-4 justify-end mt-20">
                            <button
                              type="button"
                              ref={cancelButtonRef}
                              className="py-1.5 px-4 rounded-[0.3rem] hover:bg-li-gray-200 dark:hover:bg-li-gray-1300"
                              onClick={() => setModalIsOpen(false)}
                            >
                              cancel
                            </button>
                            <button
                              type="submit"
                              className="bg-li-green-btn hover:bg-li-green-btn-hov dark:bg-li-green-btn-hov dark:hover:bg-li-green-btn text-white py-1.5 px-4 rounded-[0.3rem]"
                            >
                              edit
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
