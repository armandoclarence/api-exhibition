const {createStall} = require('./stall.controllers')
const router = require('express').Router()
const { checkToken} = require('../../auth/token_validation')

router.post('/add', createStall)
// router.get('/', checkToken, getUsers)
// router.get('/:id', checkToken, getUserByUserId)
// router.patch('/', checkToken, updateUsers)
// router.delete('/', checkToken, deleteUser)

module.exports = router