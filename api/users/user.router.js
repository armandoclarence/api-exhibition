const {createUser, getUsers, getUserByUserId, updateUsers, deleteUser, login} = require('./user.controllers')
const router = require('express').Router()
const { checkToken} = require('../../auth/token_validation')

router.post('/', createUser)
router.get('/', checkToken, getUsers)
router.get('/:id', checkToken, getUserByUserId)
router.patch('/', checkToken, updateUsers)
router.delete('/', checkToken, deleteUser)
router.post('/login', login)

module.exports = router