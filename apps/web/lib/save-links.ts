import {
  CreateLinkInput,
  EditLinksInput,
  RemoveLinkInput,
  UpdateLinkInput,
} from '../generated/graphql'
import { LinkAtom } from './atom/draft-tree.atom'

const saveLinks = (links: LinkAtom[]): EditLinksInput => {
  const creates: CreateLinkInput[] = []
  const updates: UpdateLinkInput[] = []
  const removes: RemoveLinkInput[] = []

  for (const link of links) {
    if (link.initialStatus === 'new' && link.status !== 'deleted') {
      creates.push({
        title: link.title,
        description: link.description,
        url: link.url,
      })
    } else if (link.initialStatus === 'ori') {
      if (link.status === 'edited') {
        updates.push({
          linkId: link.linkId,
          title: link.title,
          description: link.description,
          url: link.url,
        })
      } else if (link.status === 'deleted') {
        removes.push({
          linkId: link.linkId,
        })
      }
    }
  }

  return {
    creates,
    updates,
    removes,
  }
}

export { saveLinks }
