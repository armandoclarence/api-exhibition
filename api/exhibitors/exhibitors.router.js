const { approvedUsers, bendingUsers } = require('./exhibitors.controllers')

const router = require('express').Router()

router.get('/bending', bendingUsers)
router.get('/approved', approvedUsers)

module.exports = router