const router = require('express').Router()
const users = require('../controllers/users')


router.get('/', users.getAll)

router.post('/signup', users.registerUser)

router.post('/login', users.authenticateUser)

module.exports = router