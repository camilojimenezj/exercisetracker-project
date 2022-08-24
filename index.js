require('dotenv').config()
require('./mongo')
const express = require('express')
const app = express()
const cors = require('cors')
const userRouter = require('./controllers/user')

// Middlewares
app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})
app.use('/api/users', userRouter)

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
