const express = require('express')
const app = express()
const port = process.env.PORT  || 3000
const data = require('./data.js')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.send('Welcome to our schedule website')
})

app.get('/users', (req, res) => {
  res.send(data.users)
})

app.get('/users/:id', (req, res) => {
  const object = Number(req.params.id)
  // console.log (req.params.id)
  // console.log (object)
  
  if (object > data.users.length-1)   //Can lead to errors after some deleted entry?  
  res.send("Not found, please check your user number")
  
  else
    res.send(data.users[object])
})

app.get('/schedules', (req, res) => {
  res.send(data.schedules)
})

app.get('/users/:id/schedules', (req, res) => {
  const id = Number(req.params.id)
  // console.log (req.params.id)
  // console.log (id)
  
  let schedules = []

  for (let i = 0; i < data.schedules.length; i++) {
    let currentSchedule = data.schedules[i]
    if (currentSchedule.user_id === id) {
      schedules.push(currentSchedule)
    }
  }
  if (schedules == "") 
    res.send('There is no booking for this user')
  else  
    res.send(schedules) 
})

// POST routes
app.post('/schedules', function (req, res) {
  req.body.user_id = Number(req.body.user_id) //transform to number
  req.body.day = Number(req.body.day) //transform to number
  data.schedules.push(req.body) 
  res.send(req.body)
})

// Password hash
const bcrypt = require('bcrypt')
const saltRounds = 10

app.post('/users', function (req, res) {
  const hash = bcrypt.hashSync(req.body.password, saltRounds) // create the hash password
  req.body.password = hash // changes the password in the request to it's hashed version
  data.users.push(req.body) // Inputs into the database
  res.send(req.body)
})

// app.delete()

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})