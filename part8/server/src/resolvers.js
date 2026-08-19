import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { GraphQLError } from 'graphql'
import { PubSub } from 'graphql-subscriptions'
import Author from './models/Author.js'
import Book from './models/Book.js'
import User from './models/User.js'

const pubsub = new PubSub()
const requireUser = (context) => {
  if (!context.currentUser) throw new GraphQLError('not authenticated', { extensions: { code: 'BAD_USER_INPUT' } })
}

export const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allAuthors: () => Author.find({}),
    allBooks: async (_root, args) => {
      const filter = {}
      if (args.genre) filter.genres = args.genre
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (!author) return []
        filter.author = author._id
      }
      return Book.find(filter).populate('author')
    },
    me: (_root, _args, context) => context.currentUser,
  },
  Author: { bookCount: (author) => Book.countDocuments({ author: author._id }) },
  Mutation: {
    addBook: async (_root, args, context) => {
      requireUser(context)
      let author = await Author.findOne({ name: args.author })
      if (!author) author = await new Author({ name: args.author }).save()
      try {
        const book = await new Book({ ...args, author: author._id }).save()
        await book.populate('author')
        await pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      } catch (error) { throw new GraphQLError(error.message, { extensions: { code: 'BAD_USER_INPUT', invalidArgs: args } }) }
    },
    editAuthor: async (_root, args, context) => {
      requireUser(context)
      return Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true, runValidators: true })
    },
    createUser: async (_root, args) => {
      if (args.password.length < 3) throw new GraphQLError('password must have at least 3 characters', { extensions: { code: 'BAD_USER_INPUT' } })
      const passwordHash = await bcrypt.hash(args.password, 10)
      try { return await new User({ username: args.username, favoriteGenre: args.favoriteGenre, passwordHash }).save() }
      catch (error) { throw new GraphQLError(error.message, { extensions: { code: 'BAD_USER_INPUT' } }) }
    },
    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username })
      const valid = user && await bcrypt.compare(args.password, user.passwordHash)
      if (!valid) throw new GraphQLError('wrong credentials', { extensions: { code: 'BAD_USER_INPUT' } })
      return { value: jwt.sign({ username: user.username, id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' }) }
    },
  },
  Subscription: { bookAdded: { subscribe: () => pubsub.asyncIterableIterator(['BOOK_ADDED']) } },
}
