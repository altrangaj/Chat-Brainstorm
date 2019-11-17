const router = require('express').Router()
const channels = require('../controllers/channels')
const authorize = require('../verifytoken.js')


//router.post('/', channels.addChannel)

router.get('/:id',authorize, channels.getMessages)

router.get('/:id/notes', authorize, channels.getNotes)

router.get('/user/:id', authorize, channels.getChannels)

//router.put('/:id', channels.addMessage)

module.exports = router