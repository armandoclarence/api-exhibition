const {
  create,
  updateStall,
  getStallById,
  getStallByUserId
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
      if(results[0]?.user_status === 'UU') {
        return res.status(401).json({
          responseMessage: "Can't make a stall, Unauthorized User"
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
  updateStall: (req,res) => {
    const body = req.body
    updateStall(body, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          message: 'Database error',
        });
      }
      if (results && results.affectedRows === 0) {
        return res.status(404).json({
          message: 'Data not found',
        });
      }
  
      return res.status(200).json({
        message: 'Data updated successfully',
      });
    })
  },
  getStallByUserId: (req,res) => {
    const {id} = req.params
    console.log(id)
    getStallByUserId(id, (error, results) => {
      if (error) {
        console.log({error})
        res.status(500).json({
          message: 'Database connection error'
        })
      }
      console.log(results)
      return res.status(200).json({
        ...results
      })
    })
  },
  getStallById : (req,res) => {
    const {id} = req.params
    getStallById(id, (error, results) => {
      if (error) {
        console.log({error})
        res.status(500).json({
          message: 'Database connection error'
        })
        return
      }
      console.log(results)
      return res.status(200).json({
        ...results
      })
    })
  }
}