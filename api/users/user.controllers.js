const {
  create,
  getUsers,
  getUserByUserId,
  updateUser,
  deleteUser,
  getUserByEmail
} = require('./user.service')
const { genSaltSync, hashSync, compareSync } = require('bcrypt')
const {sign} = require('jsonwebtoken')

module.exports = {
  createUser: (req, res) => {
    const body = req.body
    const salt = genSaltSync(10)
    body.password = hashSync(body.password, salt)
    console.log(body)
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
    const body = req.body
    const salt = genSaltSync(10)
    body.password = hashSync(body.password, salt)
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: 'Database error',
        });
      }
      if (results && results.affectedRows === 0) {
        return res.status(404).json({
          success: 0,
          message: 'Record not found',
        });
      }
  
      return res.status(200).json({
        success: 1,
        message: 'Record updated successfully',
      });
    });
  },
  deleteUser: (req, res) => {
    const data = req.body
    deleteUser(data, (err, results) => {
      if (err) {
          console.log(err);
          return res.status(500).json({
              success: 0,
              message: 'Error deleting user'
          });
      }
      if (!results) {
          return res.status(404).json({
              success: 0,
              message: 'User not found'
          });
      }
      return res.json({
          success: 1,
          message: 'User deleted successfully'
      });
  });
  },
  login: (req, res) => {
    const body = req.body
    getUserByEmail(body.email, (err, results) => {
      if (err) console.log(err)
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        })
      }
      const result = compareSync(body.password, results.password)
      if (results) {
        console.log(results)
        const { email,user_type_id, userId } = results
        const jsontoken = sign({ sub: email, user_type_id,userId  }, "qwe1234", {
          expiresIn: "1h"
        })
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken
        })
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        })
      }
    })
  }
} 