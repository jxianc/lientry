import { Field, Form, Formik } from 'formik'
import { useAtom } from 'jotai'
import React, { useRef } from 'react'
import {
  setEditedTreeAtom,
  setTreeInfoAtom,
} from '../../lib/atom/draft-tree.atom'
import { CreateTreeSchema } from '../../lib/input-validation'
import { createTreeInputs } from '../../lib/inputs'
import { InputField } from '../InputField'
import { ToggleButtonInput } from '../ToggleButtonInput'
import { BaseModal } from './BaseModal'

interface EditTreeFormModalProps {
  modalIsOpen: boolean
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  description?: string | null
  isPublic: boolean
}

export const EditTreeFormModal: React.FC<EditTreeFormModalProps> = ({
  modalIsOpen,
  setModalIsOpen,
  title,
  description,
  isPublic,
}) => {
  // jotai state
  const [treeInfo, setTreeInfo] = useAtom(setTreeInfoAtom)
  const [_, setEditedTree] = useAtom(setEditedTreeAtom)

  // useRef
  const cancelButtonRef = useRef(null)

  return (
    <BaseModal
      modalIsOpen={modalIsOpen}
      setModalIsOpen={setModalIsOpen}
      modalTitle="Edit your tree"
    >
      <Formik
        initialValues={{
          title,
          description: description || '',
          isPublic,
        }}
        validationSchema={CreateTreeSchema}
        onSubmit={async ({ title, description, isPublic }) => {
          const updatedTreeInfo = {
            ...treeInfo!, // NOTE this should be fine lol
            title,
            description,
            isPublic,
          }
          setEditedTree(true)
          setTreeInfo(updatedTreeInfo)
          setModalIsOpen(false)
        }}
      >
        {({}) => (
          <Form>
            <div className="rounded-md space-y-4 text-left">
              {createTreeInputs.map((input, idx) => {
                if (input.type === 'checkbox') {
                  return <ToggleButtonInput key={idx} {...input} />
                } else {
                  return <Field key={idx} {...input} component={InputField} />
                }
              })}
            </div>
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
    </BaseModal>
  )
}
