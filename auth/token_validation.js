const { verify } = require('jsonwebtoken')

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization")
    console.log(req.headers)
    console.log(req)
    if (token) {
      token = token.slice(7)
      verify(token, "qwe1234", (err, decoded) => {
        if (err) {
          res.json({
            success: 0,
            message: "Invalid token"
          })
        } else {
          next()
        }
      })
    } else {
      res.json({
        success: 0,
        message: "Access denied! unauthorize user"
      })
    }
  }
}