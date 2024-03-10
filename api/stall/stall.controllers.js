const {
  create,
  // getUsers,
  // getUserByUserId,
  // updateUser,
  // deleteUser,
  // getUserByEmail
} = require('./stall.service')

module.exports = {
  createStall: (req, res) => {
    const body = req.body
    create(body, (error, results) => {
      if (error) {
        console.log({error})
        res.status(500).json({
          message: 'Database connection error'
        })
      }
      if(body.user.id === results[0]?.userId) {
        return res.status(409).json({
          responseMessage: "EXHIBITOR HAS STALL ALREADY"
        })
      }
      return res.status(200).json({
        responseMessage: "created stall successfully"
      })
    })
  },
  // getUserByUserId: (req,res) =>{
  //   const {id} = req.params
  //   getUserByUserId(id, (err,results)=> {
  //     if(err) {
  //       console.log(err)
  //       return
  //     }if (!results){
  //       return res.json({
  //         success: 0,
  //         message: 'Record not Found'
  //       })
  //     }
  //     return res.json({
  //       success:1,
  //       data: results
  //     })
  //   })
  // },
  // getUsers: (req,res) => {
  //   getUsers((err,results)=> {
  //     if(err) {
  //       console.log(err)
  //       return
  //     }if (!results){
  //       return res.json({
  //         success: 0,
  //         message: 'Record not Found'
  //       })
  //     }
  //     return res.json({
  //       success:1,
  //       data: results
  //     })
  //   })
  // },
  // updateUsers: (req,res) => {
  //   const body = req.body
  //   const salt = genSaltSync(10)
  //   body.password = hashSync(body.password, salt)
  //   updateUser(body, (err, results) => {
  //     if (err) {
  //       console.log(err);
  //       return res.status(500).json({
  //         success: 0,
  //         message: 'Database error',
  //       });
  //     }
  //     if (results && results.affectedRows === 0) {
  //       return res.status(404).json({
  //         success: 0,
  //         message: 'Record not found',
  //       });
  //     }
  
  //     return res.status(200).json({
  //       success: 1,
  //       message: 'Record updated successfully',
  //     });
  //   });
  // },
  // deleteUser: (req, res) => {
  //   const data = req.body
  //   deleteUser(data, (err, results) => {
  //     if (err) {
  //         console.log(err);
  //         return res.status(500).json({
  //             success: 0,
  //             message: 'Error deleting user'
  //         });
  //     }
  //     if (!results) {
  //         return res.status(404).json({
  //             success: 0,
  //             message: 'User not found'
  //         });
  //     }
  //     return res.json({
  //         success: 1,
  //         message: 'User deleted successfully'
  //     });
  //   });
  // },
}