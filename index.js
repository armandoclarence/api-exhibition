require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const userRouter = require('./api/users/user.router')
const stallRouter = require('./api/stall/stall.router')
const exhibitorRouter = require('./api/exhibitors/exhibitors.router')
app.use(cors())
app.use(express.json())

app.use('/users' ,userRouter)
app.use('/stall' ,stallRouter)
app.use('/exhitors', exhibitorRouter)

// app.post('/user/authorize', (req,res) => {
//   res.send('Hello World')
// })


app.listen(process.env.APP_PORT, ()=> {
  console.log(`app listening in port : ${process.env.APP_PORT}`)
})
