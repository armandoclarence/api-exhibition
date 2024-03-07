const pool = require('../../db')

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into registration(firstname, lastname, email, mobile, password, user_type_id)
                  values(?,?,?,?,?,?)`,
      [
        data.firstname,
        data.lastname,
        data.email,
        data.mobile,
        data.password,
        data.user_type_id
      ],
      (error, results, fields) => {
        if(error) callBack(error)
        return callBack(null, results)
      }
    )
  },
  getUsers: callBack => {
    pool.query(
      `select userId,firstname,lastname,email,mobile,password,user_type_id from registration`,
      [],
      (error, results, fields) => {
        if(error) callBack(error)
        return callBack(null, results)
      }
    )
  },
  getUserByUserId: (id, callBack) =>{
    pool.query(
      `select userId,firstname,lastname,email,mobile,password,user_type_id from registration where userId = ?`,
      [id],
      (error, results, fields) => {
        if(error) callBack(error)
        return callBack(null, results[0])
      }
    )
  },
  updateUser: (data, callBack) => {
    pool.query(
      `update registration set firstname =?, lastname =?, email =?, mobile =?, password=? where id = ?`,
      [
        data.firstname,
        data.lastname,
        data.email,
        data.mobile,
        data.password,
        data.id
      ],
      (error, results, fields) => {
        if(error) callBack(error)
        return callBack(null, results)
      }
    )
  },
  deleteUser: (data,callBack) => {
    pool.query(
      `delete from registration where id = ?`,
      [data.id],
      (error, results, fields) => {
        if(error) callBack(error)
        return callBack(null, results[0])
      }
    )
  }
}