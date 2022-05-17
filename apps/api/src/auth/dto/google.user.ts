export class GoogleUser {
  id!: string
  emails?: { value: string; verified: 'true' | 'false' }[]
  provider!: string
  displayName?: string
  photos?: { value: string }[]
}
