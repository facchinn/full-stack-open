import mongoose from 'mongoose'
const schema = new mongoose.Schema({ name: { type: String, required: true, unique: true }, born: Number })
schema.set('toJSON', { transform: (_doc, object) => { object.id = object._id.toString(); delete object._id; delete object.__v } })
export default mongoose.model('Author', schema)
