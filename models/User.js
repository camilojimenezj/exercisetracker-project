const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  logs: [{
    date: String,
    duration: Number,
    description: String
  }]
}) 

userSchema.virtual('count').get(function () {
  if (!this.logs) {
    return null
  }
  return this.logs.length
})

userSchema.set('toJSON', {
  virtuals: true,
  transform: (document, returnedObject) => {
    if (returnedObject.count === null) {
      delete returnedObject.count
    }
    delete returnedObject.__v
    delete returnedObject.id
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
