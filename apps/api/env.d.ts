declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string
      DATABASE_URL: string
      ACCESS_TOKEN_SECRET: string
      REFRESH_TOKEN_SECRET: string
      REFRESH_TOKEN_COOKIE_KEY: string
    }
  }
}

export {}
