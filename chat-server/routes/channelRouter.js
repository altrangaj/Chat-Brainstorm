const router = require('express').Router()
const channels = require('../controllers/channels')
const authorize = require('../verifytoken.js')

router.get('/:id',authorize, channels.getMessages)

router.get('/:id/notes', authorize, channels.getNotes)

router.get('/user/:id', authorize, channels.getChannels)

module.exports = router