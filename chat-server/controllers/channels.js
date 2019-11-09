const router = require('express').Router()
const Channel = require('../models/channel')

router.post('/', async (request, response, next) => {
    if (!request.body.name) response.status(400).end()
    try {
      const channel = new Channel({
        name: request.body.name,
        messages:[]
      })
      console.log(request.body.name)
      const result = await channel.save()
      response.status(201).json(result)
    } catch (exception) {
      next(exception)
    }
})
router.get('/:id', async (request, response, next) => {
  try {
    const channel = await Channel.findById(request.params.id)
    response.json(channel.messages) 
  } catch (exception) {
    next(exception)
  }
})

router.put('/:id', async (request, response, next) => {
    try {
      const channel = await Channel.findById(request.params.id)
      const updatedMsgs = channel.messages.concat(request.body.message)
      const result = await Channel.findByIdAndUpdate(request.params.id, {messages:updatedMsgs})
      /*
      response.setHeader('set-cookie', [
        'same-site-cookie=bar; SameSite=Lax',
        'cross-site-cookie=foo; SameSite=None; Secure',
      ])*/
      response.json({ ...result.toJSON(),messages:updatedMsgs}) 
    } catch (exception) {
      next(exception)
    }
})
module.exports = router