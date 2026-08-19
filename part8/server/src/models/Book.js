import mongoose from 'mongoose'
const schema = new mongoose.Schema({ title: { type: String, required: true }, published: { type: Number, required: true }, author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true }, genres: [{ type: String }] })
schema.index({ title: 1, author: 1 }, { unique: true })
schema.set('toJSON', { transform: (_doc, object) => { object.id = object._id.toString(); delete object._id; delete object.__v } })
export default mongoose.model('Book', schema)
