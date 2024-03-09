const pool = require('../../db')

module.exports = {
  create: (data, callBack) => {
    console.log(data)
    pool.query(
      `INSERT into registration(firstName, lastName, email, mobile, password, user_type_id)
                  VALUES(?,?,?,?,?,?)`,
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
      `SELECT * FROM registration`,
      [],
      (error, results, fields) => {
        if(error) callBack(error)
        return callBack(null, results)
      }
    )
  },
  getUserByUserId: (id, callBack) =>{
    pool.query(
      `SELECT * FROM registration where userId = ?`,
      [id],
      (error, results, fields) => {
        if(error) callBack(error)
        return callBack(null, results[0])
      }
    )
  },
  updateUser: (data, callBack) => {
    // Check if the user with the provided userId exists in the database
    pool.query(
      `SELECT * FROM registration WHERE userId = ?`,
      [data.userId],
      (error, results) => {
        if (error) {
          callBack(error);
          return;
        }
        // If no user with the provided userId exists, return an error
        if (results.length === 0) {
          const err = new Error('User not found');
          err.statusCode = 404; // Set a custom status code
          callBack(err);
          return;
        }
        
        // Proceed with the update operation if the user exists
        pool.query(
          `UPDATE registration SET firstName = ?, lastName = ?, email = ?, mobile = ?, password = ? WHERE userId = ?`,
          [
            data.firstName,
            data.lastName,
            data.email,
            data.mobile,
            data.password,
            data.userId
          ],
          (updateError, updateResults) => {
            if (updateError) {
              callBack(updateError);
              return;
            }
            callBack(null, updateResults);
          }
        );
      }
    );
  },
  deleteUser: (data,callBack) => {
    pool.query(
      `DELETE FROM registration where userId = ?`,
      [data.userId],
      (error, results, fields) => {
        if(error) callBack(error)
        return callBack(null, results.affectedRows)
      }
    )
  },
  getUserByEmail: (email, callBack) => {
    pool.query(
      `SELECT * FROM registration where email = ?`,
      [email],
      (error, results, fields) => {
        if(error) callBack(error)
        return callBack(null, results[0])
      }
    )
  }
}