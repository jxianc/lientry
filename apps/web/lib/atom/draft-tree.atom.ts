import { atom } from 'jotai'

// tree info
interface TreeInfo {
  id: string
  title: string
  description?: string | null
  createdAt: string
  isPublic: boolean
}

const treeInfoAtom = atom<TreeInfo | null>(null)

const setTreeInfoAtom = atom(
  (get) => get(treeInfoAtom),
  (_get, set, treeInfo: TreeInfo | null) => set(treeInfoAtom, treeInfo),
)

// links
type LinkInitialStatus = 'ori' | 'new'

type LinkStatus = 'none' | 'added' | 'edited' | 'deleted'

interface LinkAtom {
  linkId: string
  title: string
  description?: string | null
  url: string
  initialStatus: LinkInitialStatus
  status: LinkStatus
}

const linksAtom = atom<LinkAtom[]>([])

const setLinksAtom = atom(
  (get) => get(linksAtom),
  (_get, set, links: LinkAtom[]) => set(linksAtom, links),
)

// edited tree info and links
const editedTreeAtom = atom<boolean>(false)

const setEditedTreeAtom = atom(
  (get) => get(editedTreeAtom),
  (_get, set, editedTree: boolean) => set(editedTreeAtom, editedTree),
)

export type { TreeInfo, LinkAtom, LinkInitialStatus, LinkStatus }
export {
  treeInfoAtom,
  setTreeInfoAtom,
  linksAtom,
  setLinksAtom,
  setEditedTreeAtom,
}
