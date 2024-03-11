const pool = require('../../db')

module.exports = {
  create: (data, callBack) => {
    console.log(data)
    pool.query(
      `SELECT * FROM registration WHERE userId = ?`,
      [
        data.user.id
      ],
      (error, results) => {
        if(error) {
          return callBack(error)
        }
        if(results.length === 0 && results[0].user_status === 'AU'){
          pool.query(
            `INSERT into stall(stallName, stallDescription, photoUrl, videoUrl, brochureUrl,userId)
                        VALUES(?,?,?,?,?,?)`,
            [
              data.stallName,
              data.stallDescription,
              data.photoUrl,
              data.videoUrl,
              data.brochureUrl,
              data.user.id
            ],
            (error, results) => {
              if(error) callBack(error)
              return callBack(null, results)
            }
          )
        }
        return callBack(null, results)
      }
    )
  },
  updateStall: (data, callBack) => {
      // Check if the user with the provided userId exists in the database
      console.log(data)
        
    pool.query(
      `UPDATE stall SET stallName = ?, stallDescription = ?, photoUrl = ?, videoUrl = ?, brochureUrl = ? WHERE userId = ?`,
      [
        data.stallName,
        data.stallDescription,
        data.photoUrl,
        data.videoUrl,
        data.brochureUrl,
        data.user.id
      ],
      (updateError, updateResults) => {
        if (updateError) {
          callBack(updateError);
          return;
        }
        console.log(updateResults)
        return callBack(null, updateResults);
      }
    )
  }, 
  getStallByUserId: (id, callBack) => {
    pool.query(
      `SELECT * FROM stall WHERE userId = ?`,
      [id],
      (error, results) => {
        if (error) {
          callBack(error);
          return;
        }
        // If no user with the provided userId exists, return an error
        if (results.length === 0) {
          const err = new Error('Stall not found');
          err.statusCode = 404; // Set a custom status code
          callBack(err);
          return;
        }
        return callBack(null, results[0])
      }
    )
  },
  getStallById: (id, callBack) => {
    pool.query(
      `SELECT * FROM stall WHERE id = ?`,
      [id],
      (error, results) => {
        if (error) {
          callBack(error);
          return;
        }
        // If no user with the provided userId exists, return an error
        if (results.length === 0) {
          const err = new Error('Stall not found');
          err.statusCode = 404; // Set a custom status code
          callBack(err);
          return;
        }
        return callBack(null, results[0])
      }
    )
  }
}