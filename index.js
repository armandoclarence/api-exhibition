require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const userRouter = require('./api/users/user.router')
app.use(cors())
app.use(express.json())

app.use('/user/createuser' ,userRouter)
// app.get('/', (req,res) => {
//   res.send('Hello World')
// })

// app.get('/exhibitors/approved', (req,res) =>{
//   res.send('Hello World')
// })

// app.get('/exhibitors/bending', (req,res) =>{
//   res.send('Hello World')
// })

// app.post('/user/authorize', (req,res) => {
//   res.send('Hello World')
// })

// app.post('/stall/add', (req,res) => {
//   res.send('Hello World')
// })

// app.get('/stall/user/:id', (req,res) => {
//   res.send('Hello World')
// })

// app.get('/stall/:id', (req,res) => {
//   res.json({"id":1,"stallName":"New Stall","stallDescription":"All Books are available sdfsdf","photoUrl":"www.books.com sadfsdf","videoUrl":"www.youtube.com/zigzagcodingsadfasdf","brochureUrl":"www.broucher.comsadfsdf","user":{"id":2,"firstname":"hari","lastname":"s","email":"hari@gmail.com","password":"$2a$10$aCO7/e1DCH4M4Qt8.dwO9.fLQAUZlpOJc46IrLc4qvbhhb68e2moe","mobile":"123456789","status":"AU","user_type_id":2,"authorities":null,"username":"hari@gmail.com","accountNonExpired":true,"accountNonLocked":true,"credentialsNonExpired":true,"enabled":true}})
// })

// app.put('/stall/:id', (req,res) => {
//   res.send('Hello World')
// })

// app.post('/user/login', (req,res) => {
//   res.send('Hello World')
// })

// app.post('/user/createuser', (req,res) => {
//   res.send('Hello World')
// })

app.listen(process.env.APP_PORT, ()=> {
  console.log(`app listening in port : ${process.env.APP_PORT}`)
})
