import mongoose from 'mongoose'
const schema = new mongoose.Schema({ username: { type: String, required: true, unique: true, minlength: 3 }, passwordHash: { type: String, required: true }, favoriteGenre: { type: String, required: true } })
schema.set('toJSON', { transform: (_doc, object) => { object.id = object._id.toString(); delete object._id; delete object.__v; delete object.passwordHash } })
export default mongoose.model('LibraryUser', schema)
