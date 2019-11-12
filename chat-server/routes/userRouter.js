const router = require('express').Router()
const users = require('../controllers/users')


router.post('/signin', users.registerUser)

router.post('/login', users.authenticateUser)

module.exports = router