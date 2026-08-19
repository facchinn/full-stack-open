import 'dotenv/config'

export const PORT = Number(process.env.PORT || 3001)
export const MONGODB_URI = process.env.MONGODB_URI
export const STATIC_DIR = process.env.STATIC_DIR || 'dist'
