export class OAuthUser {
  id!: string
  emails?: { value: string }[]
  provider!: string
  displayName?: string
  photos?: { value: string }[]
}
