import { Field, Form, Formik } from 'formik'
import { useAtom } from 'jotai'
import React, { useRef } from 'react'
import { LinkStatus, setLinksAtom } from '../../lib/atom/draft-tree.atom'
import { CreateLinkSchema } from '../../lib/input-validation'
import { createLinkInputs } from '../../lib/inputs'
import { InputField } from '../InputField'
import { BaseModal } from './BaseModal'

interface EditLinkFormModalProps {
  modalIsOpen: boolean
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  linkId: string
  linkStatus: LinkStatus
  title: string
  description?: string | null
  url: string
}

export const EditLinkFormModal: React.FC<EditLinkFormModalProps> = ({
  linkId,
  linkStatus,
  title,
  description,
  url,
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
      modalTitle="Edit your link"
    >
      <Formik
        initialValues={{
          title,
          description: description || '',
          url,
        }}
        validationSchema={CreateLinkSchema}
        onSubmit={async ({ title, description, url }) => {
          const updatedLinks = links.map((l) => {
            if (l.linkId === linkId) {
              ;(l.title = title),
                (l.description = description),
                (l.url = url),
                (l.status = 'edited')
            }
            return l
          })
          setLinks(updatedLinks)
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
                edit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </BaseModal>
  )
}
