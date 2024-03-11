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
    create(body, (error, results) => {
      if (error) {
        console.log(error)
        res.status(500).json({
          message: 'Database connection error'
        })
      }
      return res.status(200).json({
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
        return res.status(500).json({
          message: 'User not Found'
        })
      }
      return res.status(200).json({
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
          message: 'Users not Found'
        })
      }
      return res.json({
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
          message: 'Database error',
        });
      }
      if (results && results.affectedRows === 0) {
        return res.status(404).json({
          message: 'Record not found',
        });
      }
  
      return res.status(200).json({
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
            message: 'Error deleting user'
        });
      }
      if (!results) {
        return res.status(404).json({
          message: 'User not found'
        });
      }
      return res.json({
          message: 'User deleted successfully'
      });
    });
  },
  login: (req, res) => {
    const body = req.body
    console.log(body.email)
    getUserByEmail(body.email, (err, results) => {
      if (err) console.log(err)
      console.log(results)
      if (!results) {
        return res.json({
          data: "Invalid email or password"
        })  
      }
      const result = compareSync(body.password, results.password)
      if (result) {
        const { email,user_type_id, userId } = results
        const jsontoken = sign({ sub: email, user_type_id , userId  }, "qwe1234", {
          expiresIn: "1h"
        })
        return res.json({
          message: "login successfully",
          token: jsontoken
        })
      } else {
        return res.json({
          data: "Invalid email or password"
        })
      }
    })
  }
} 