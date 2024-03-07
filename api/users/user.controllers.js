const { create, getUsers, getUserByUserId, updateUser, deleteUser } = require('./user.service')
const { genSaltSync, hashSync } = require('bcrypt')

module.exports = {
  createUser: (req, res) => {
    const body = req.body
    const salt = genSaltSync(10)
    body.password = hashSync(body.password, salt)
    create(body, (error, results) => {
      if (error) {
        console.log(error)
        res.status(500).json({
          success: 0,
          message: 'Database connection error'
        })
      }
      return res.status(200).json({
        success: 1,
        data: results
      })
    })
  },
  getUserByUserId: (req,res) =>{
    const {id} = req.params
    getUserByUserId(id, (err,results)=> {
      if(err) {
        console.log(err)
        return
      }if (!results){
        return res.json({
          success: 0,
          message: 'Record not Found'
        })
      }
      return res.json({
        success:1,
        data: results
      })
    })
  },
  getUsers: (req,res) => {
    getUsers((err,results)=> {
      if(err) {
        console.log(err)
        return
      }if (!results){
        return res.json({
          success: 0,
          message: 'Record not Found'
        })
      }
      return res.json({
        success:1,
        data: results
      })
    })
  },
  updateUsers: (req,res) => {
    const {body} = req
    const salt = genSaltSync(10)
    body.password = hashSync(body.password, salt)
    updateUser((err,results)=> {
      if(err) {
        console.log(err)
        return
      }if (!results){
        return res.json({
          success: 0,
          message: 'Record not Found'
        })
      }
      return res.json({
        success:1,
        data: results
      })
    })
  }
} 