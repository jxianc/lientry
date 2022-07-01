import { atom } from 'jotai'

interface TreeInfo {
  id: string
  title: string
  description?: string | null
}

const treeInfoAtom = atom<TreeInfo | null>(null)

const setTreeInfoAtom = atom(
  (get) => get(treeInfoAtom),
  (_get, set, treeInfo: TreeInfo | null) => set(treeInfoAtom, treeInfo),
)

type LinkStatus = 'original' | 'added' | 'edited' | 'deleted'

interface LinkAtom {
  linkId: string
  title: string
  description?: string | null
  url: string
  status: LinkStatus
}

const linksAtom = atom<LinkAtom[]>([])

const setLinksAtom = atom(
  (get) => get(linksAtom),
  (_get, set, links: LinkAtom[]) => set(linksAtom, links),
)

export type { TreeInfo, LinkAtom, LinkStatus }
export { treeInfoAtom, setTreeInfoAtom, linksAtom, setLinksAtom }
