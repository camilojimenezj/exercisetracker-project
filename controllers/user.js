const Router = require('express').Router()
const User = require('../models/User')
const Exercise = require('../models/Exercise')
const moment = require('moment')

// users
Router.post('/', async (req, res, next) => {
  try {
    const { username } = req.body
  
    const newUser = new User({ username })
    const savedUser = await newUser.save()
  
    res.json({ username: savedUser.username, _id: savedUser._id })
  } catch (error) {
    next(error)
  }
})

Router.get('/', async (req, res) => {

  const users = await User.find({}).select('username')

  res.json(users)
})

// exercise
Router.post('/:id/exercises', async (req, res, next) => {
  try {
    const { id } = req.params
    let { duration, description, date } = req.body
    const user = await User.findById(id)
  
    if (!user) return res.status(400).json({ error: "user not found" })
  
    if (!date) {
      date = Date.now()
    } else {
      date = moment(date, 'YYYY-MM-DD').unix() * 1000
    }
  
    const exercise = {
      date,
      duration: Number(duration),
      description
    }
  
    const newExercise = new Exercise(exercise)
  
    const savedExersice = await newExercise.save()
  
    user.log = user.log.concat(savedExersice._id)
    await user.save()
  
    const response = {
      _id: user._id,
      username: user.username,
      date: moment(date).format('ddd MMM DD YYYY'),
      duration: exercise.duration,
      description: exercise.description
    }
  
    res.status(201).json(response)
    
  } catch (error) {
    next(error)
  }
})

Router.get('/:id/logs', async (req, res, next) => {
  try {
    const { id } = req.params
    let { from = 0, to, limit } = req.query
  
    from = moment(from, 'YYYY-MM-DD') 
    to = moment(to, 'YYYY-MM-DD') 
    
    const user = await User.findById(id).populate({
      path: 'log',
      match: { date: { $gte: from, $lte: to } },
      options: { limit: Number(limit) },
      select: 'date description duration'
    })
  
    res.json(user)
    
  } catch (error) {
    next(error)
  }
})


module.exports = Router