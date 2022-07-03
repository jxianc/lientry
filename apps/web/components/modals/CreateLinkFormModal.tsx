import { Field, Form, Formik } from 'formik'
import { useAtom } from 'jotai'
import React, { useRef } from 'react'
import { setLinksAtom } from '../../lib/atom/draft-tree.atom'
import { CreateLinkSchema } from '../../lib/input-validation'
import { createLinkInputs } from '../../lib/inputs'
import { InputField } from '../InputField'
import { BaseModal } from './BaseModal'

interface CreateLinkFormModalProps {
  modalIsOpen: boolean
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const CreateLinkFormModal: React.FC<CreateLinkFormModalProps> = ({
  modalIsOpen,
  setModalIsOpen,
}) => {
  // jotai state
  const [links, setLinks] = useAtom(setLinksAtom)

  // useRef
  const cancelButtonRef = useRef(null)

  return (
    <BaseModal
      modalIsOpen={modalIsOpen}
      setModalIsOpen={setModalIsOpen}
      initialFocus={cancelButtonRef}
      modalTitle="Add a new link"
    >
      <Formik
        initialValues={{
          title: '',
          description: '',
          url: '',
        }}
        validationSchema={CreateLinkSchema}
        onSubmit={async ({ title, description, url }) => {
          setLinks([
            ...links,
            {
              linkId: links.length.toString(), // TODO this is hacky but it works for now
              title,
              description,
              url,
              initialStatus: 'new',
              status: 'added',
            },
          ])
          setModalIsOpen(false)
        }}
      >
        {() => (
          <Form>
            <div className="rounded-md space-y-4 text-left">
              {createLinkInputs.map((input, idx) => {
                return <Field key={idx} {...input} component={InputField} />
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
                add
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </BaseModal>
  )
}
