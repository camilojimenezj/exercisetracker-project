const mongoose = require('mongoose')
const moment = require('moment')
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
    returnedObject.date = moment(Number(returnedObject.date)).format('ddd MMM DD YYYY').toString()
    delete returnedObject.__v
  }
})

const Exercise = mongoose.model('Exercise', exerciseSchema)

module.exports = Exercise