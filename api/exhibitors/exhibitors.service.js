const pool = require('../../db')

module.exports = {
  bendingUsers: callBack => {
    pool.query(
      `SELECT * FROM registration WHERE user_status = ?`,
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
      `SELECT * FROM registration WHERE user_status = ?`,
      ['AU'],
      (error, results) => {
        if(error) callBack(error)
        callBack(null, results)
      }
    )
  },

}