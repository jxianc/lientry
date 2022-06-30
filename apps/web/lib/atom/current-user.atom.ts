import { atom } from 'jotai'
import { UserEntity } from '../../generated/graphql'

const currUserAtom = atom<UserEntity | null>(null)

const setCurrUserAtom = atom(
  (get) => get(currUserAtom),
  (_get, set, currUser: UserEntity | null) => set(currUserAtom, currUser),
)

export { currUserAtom, setCurrUserAtom }
