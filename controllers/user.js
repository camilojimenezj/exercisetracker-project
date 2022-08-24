const Router = require('express').Router()
const User = require('../models/User')
/* const Exercise = require('../models/Exercise') */

// user
Router.post('/', async (req, res) => {
  const { username } = req.body

  const newUser = new User({ username })
  const savedUser = await newUser.save()

  res.json({ username: savedUser.username, _id: savedUser._id })
})

Router.get('/', async (req, res) => {

  const users = await User.find({}).select('username')

  res.json(users)
})

// exercise
Router.post('/:id/exercises', async (req, res) => {
  const { id } = req.params

  const user = await User.findById(id)

  if (!user) res.status(400).json({ error: "user not found" })
  
  const { duration, description, formDate } = req.body

  let date = ''

  if (!formDate) {
    date = new Date().toString().slice(0, 15)
  } else {
    date = new Date(formDate).toString().slice(0, 15)
  }

  const newExercise = {
    description,
    duration: Number(duration),
    date
  }

  user.log = user.log.concat(newExercise)
  await user.save()

  const response = { _id: user._id, username: user.username, ...newExercise }

  res.status(201).json(response)
})

Router.get('/:id/logs', async (req, res) => {
  const { id } = req.params
  
  const user = await User.findById(id)

  res.json(user)

})

module.exports = Router