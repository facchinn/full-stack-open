import 'dotenv/config'
import http from 'node:http'
import cors from 'cors'
import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@as-integrations/express5'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import User from './models/User.js'
import { typeDefs } from './schema.js'
import { resolvers } from './resolvers.js'

if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) throw new Error('MONGODB_URI and JWT_SECRET are required')
await mongoose.connect(process.env.MONGODB_URI)

const schema = makeExecutableSchema({ typeDefs, resolvers })
const app = express()
const httpServer = http.createServer(app)
const wsServer = new WebSocketServer({ server: httpServer, path: '/graphql' })
const serverCleanup = useServer({ schema }, wsServer)
const server = new ApolloServer({ schema, plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), { async serverWillStart() { return { async drainServer() { await serverCleanup.dispose() } } } }] })
await server.start()

app.get('/health', (_request, response) => response.json({ status: 'ok' }))
app.use('/graphql', cors(), express.json(), expressMiddleware(server, { context: async ({ req }) => {
  const authorization = req.headers.authorization || ''
  if (!authorization.toLowerCase().startsWith('bearer ')) return {}
  try { const decoded = jwt.verify(authorization.substring(7), process.env.JWT_SECRET); return { currentUser: await User.findById(decoded.id) } }
  catch { return {} }
} }))

const port = Number(process.env.PORT || 4000)
httpServer.listen(port, () => console.log(`GraphQL server ready at http://localhost:${port}/graphql`))
