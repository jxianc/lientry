import { atom } from 'jotai'

interface ErrorAlert {
  index: number
  message: string
}

const errorAlertsAtom = atom<ErrorAlert[]>([])

const setErrorAlertsAtom = atom(
  (get) => get(errorAlertsAtom),
  (_get, set, errorAlerts: ErrorAlert[]) => set(errorAlertsAtom, errorAlerts),
)

export { errorAlertsAtom, setErrorAlertsAtom }
export type { ErrorAlert }
