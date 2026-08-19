import 'dotenv/config'

export const PORT = Number(process.env.PORT || 3003)
export const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.MONGODB_URI_TEST
  : process.env.MONGODB_URI
export const SECRET = process.env.SECRET || 'development-secret-change-me'
