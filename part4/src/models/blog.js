import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true, minlength: 2 },
  createdAt: { type: Date, default: Date.now },
})

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [commentSchema],
})

blogSchema.set('toJSON', {
  transform: (_document, object) => {
    object.id = object._id.toString()
    delete object._id
    delete object.__v
    object.comments?.forEach((comment) => {
      comment.id = comment._id.toString()
      delete comment._id
    })
  },
})

export default mongoose.model('Blog', blogSchema)
