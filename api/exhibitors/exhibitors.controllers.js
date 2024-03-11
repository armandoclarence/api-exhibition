const { bendingUsers, approvedUsers } = require('./exhibitors.service')

module.exports = {
  bendingUsers: (req, res) => {
    bendingUsers((error, results) => {
      console.log({results})
      if (error) {
        console.log({error})
        res.status(500).json({
          message: 'Database connection error'
        })
      }
      return res.status(200).json({
        results
      })
    })
  },
  approvedUsers: (req,res) => {
    approvedUsers((error, results) => {
      console.log({results})
      if (error) {
        console.log(error);
        return res.status(500).json({
          message: 'Database error',
        });
      }
      return res.status(200).json({
        results
      });
    })
  },
}