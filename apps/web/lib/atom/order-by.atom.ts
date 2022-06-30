import { atom } from 'jotai'

type OrderBy = 'recent' | 'trend'

const orderByAtom = atom<OrderBy>('recent')

const setOrderByAtom = atom(
  (get) => get(orderByAtom),
  (_get, set, orderBy: OrderBy) => set(orderByAtom, orderBy),
)

export type { OrderBy }

export { orderByAtom, setOrderByAtom }
