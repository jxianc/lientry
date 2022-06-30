import { atom } from 'jotai'

type DashboardDisplay = 'created' | 'saved'

const dashboardDisplayAtom = atom<DashboardDisplay>('created')

const setDashboardDisplayAtom = atom(
  (get) => get(dashboardDisplayAtom),
  (_get, set, display: DashboardDisplay) => set(dashboardDisplayAtom, display),
)

export type { DashboardDisplay }

export { dashboardDisplayAtom, setDashboardDisplayAtom }
