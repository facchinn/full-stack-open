import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, minlength: 3 },
  name: String,
  passwordHash: { type: String, required: true },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
})

userSchema.set('toJSON', {
  transform: (_document, object) => {
    object.id = object._id.toString()
    delete object._id
    delete object.__v
    delete object.passwordHash
  },
})

export default mongoose.model('User', userSchema)
