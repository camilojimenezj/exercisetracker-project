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
  
  let { duration, description, date } = req.body

  if(!date) date = new Date().toString().slice(0, 15)
  
  const newExercise = {
    date,
    duration: Number(duration),
    description
  }

  user.logs = user.logs.concat(newExercise)
  await user.save()

  const response = {username: user.username, ...newExercise, _id: user._id}

  res.status(201).json(response)
})

Router.get('/:id/logs', async (req, res) => {
  const { id } = req.params
  
  const user = await User.findById(id)

  res.json(user)

})

module.exports = Router