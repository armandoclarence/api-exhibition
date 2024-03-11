const {createStall, getStallById, getStallByUserId, updateStall} = require('./stall.controllers')
const router = require('express').Router()
// const { checkToken} = require('../../auth/token_validation')

router.post('/add', createStall)
router.get('/user/:id', getStallByUserId)
router.put('/:id', updateStall)
router.get('/:id', getStallById)

module.exports = router