import { atom } from 'jotai'
import { UserEntity } from '../generated/graphql'

// current user
const currUserAtom = atom<UserEntity | null>(null)

const setCurrUserAtom = atom(
  (get) => get(currUserAtom),
  (_get, set, currUser: UserEntity | null) => set(currUserAtom, currUser),
)

// order by
type OrderBy = 'recent' | 'trend'

const orderByAtom = atom<OrderBy>('recent')

const setOrderByAtom = atom(
  (get) => get(orderByAtom),
  (_get, set, orderBy: OrderBy) => set(orderByAtom, orderBy),
)

export type { OrderBy }
export { currUserAtom, setCurrUserAtom, orderByAtom, setOrderByAtom }
