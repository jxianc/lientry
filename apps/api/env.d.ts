declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string
      PORT: number
      CLIENT_ORIGIN: string
      DATABASE_URL: string
      ACCESS_TOKEN_SECRET: string
      REFRESH_TOKEN_SECRET: string
      REFRESH_TOKEN_COOKIE_KEY: string
      GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string
      GOOGLE_CALLBACK_URL: string
      GITHUB_CLIENT_ID: string
      GITHUB_CLIENT_SECRET: string
      GITHUB_CALLBACK_URL: string
    }
  }
}

export {}
