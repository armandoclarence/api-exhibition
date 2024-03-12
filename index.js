require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const userRouter = require('./api/users/user.router')
const stallRouter = require('./api/stall/stall.router')
const exhibitorRouter = require('./api/exhibitors/exhibitors.router')
const {getUserByEmail, updateUserByEmail} = require('./api/users/user.service') 
app.use(cors())
app.use(express.json())

app.use('/users' ,userRouter)
app.use('/stall' ,stallRouter)
app.use('/exhitors', exhibitorRouter)

app.post('/user/authorize', (req,res) => {
  const {emailId} = req.body
  console.log(req.body)
  getUserByEmail(emailId, (error, user) => {
    if (error) {
      console.error('Error retrieving user:', error);
    } else {
      if (user) {
        console.log('User found:', user);
        // Update the user's information
        updateUserByEmail(emailId, (updateError, updateResult) => {
          if (updateError) {
            console.error('Error updating user:', updateError);
          } else {
            console.log('User updated successfully:', updateResult);
          }
        });
      } else {
        console.log('User not found');
      }
    }
  });
})


app.listen(process.env.APP_PORT, ()=> {
  console.log(`app listening in port : ${process.env.APP_PORT}`)
})
