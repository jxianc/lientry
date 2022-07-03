import { Dialog, Transition } from '@headlessui/react'
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React, { Fragment, useRef, useState } from 'react'
import { useCreateTreeMutation } from '../../generated/graphql'
import { gqlErrorHandler } from '../../lib/error-handler'
import { CreateTreeSchema } from '../../lib/input-validation'
import { createTreeInputs } from '../../lib/inputs'
import { InputField } from '../InputField'
import { BaseModal } from './BaseModal'
import { ModalBackground } from './ModalBackground'

interface CreateTreeFormModalProps {
  modalIsOpen: boolean
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const CreateTreeFormModal: React.FC<CreateTreeFormModalProps> = ({
  modalIsOpen,
  setModalIsOpen,
}) => {
  const [bottomErrors, setBottomErrors] = useState<string[]>()
  const [_, execCreateTree] = useCreateTreeMutation()
  const router = useRouter()
  const cancelButtonRef = useRef(null)

  return (
    <BaseModal
      modalIsOpen={modalIsOpen}
      setModalIsOpen={setModalIsOpen}
      initialFocus={cancelButtonRef}
      modalTitle="Create a new tree"
    >
      <Formik
        initialValues={{
          title: '',
          description: '',
        }}
        validationSchema={CreateTreeSchema}
        onSubmit={async ({ title, description }) => {
          const { data, error } = await execCreateTree({
            createTreeInput: {
              name: title,
              description,
            },
          })

          if (error) {
            setBottomErrors(gqlErrorHandler(error.graphQLErrors))
          } else if (data && data.createTree.success) {
            // NOTE if the success field is true, there should be a treeId
            router.push(`/create-tree/${data.createTree.tree!.id}`)
          }
        }}
      >
        {() => (
          <Form>
            <div className="rounded-md space-y-4 text-left">
              {createTreeInputs.map((input, idx) => {
                return <Field key={idx} {...input} component={InputField} />
              })}
            </div>
            {bottomErrors && (
              <ul className="px-2 list-disc list-inside text-left text-red-500 font-semibold">
                {bottomErrors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            )}
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
                create
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </BaseModal>
  )
}
