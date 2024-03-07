const {createUser} = require('./user.controllers')
const router = require('express').Router()

router.post('/', createUser)

module.exports = router