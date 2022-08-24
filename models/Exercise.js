const mongoose = require('mongoose')
const { Schema } = mongoose

const exerciseSchema = new Schema({
  username: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: String,
  duration: Number,
  description: String
}) 

exerciseSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
  }
})

const Exercise = mongoose.model('Exercise', exerciseSchema)

module.exports = Exercise