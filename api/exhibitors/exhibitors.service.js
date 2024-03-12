const pool = require('../../db')

module.exports = {
  bendingUsers: callBack => {
    pool.query(
      `SELECT userId as id,firstname, lastname, email,mobile,user_status as status FROM registration WHERE user_status = ?`,
      ['UU'],
      (error, results) => {
        console.log(results)
        if(error) callBack(error)
        callBack(null, results)
      }
    )
  }, 
  approvedUsers: callBack => {
    pool.query(
      `SELECT userId as id,firstname, lastname, email,mobile,user_status as status FROM registration WHERE user_status = ?`,
      ['AU'],
      (error, results) => {
        if(error) callBack(error)
        callBack(null, results)
      }
    )
  },

}