const router = require('express').Router()
const channels = require('../controllers/channels')
const authorize = require('../verifytoken.js')


router.post('/', channels.addChannel)

router.get('/:id', channels.getMessages)

router.get('/user/:id', channels.getChannels)

router.put('/:id', channels.addMessage)

module.exports = router