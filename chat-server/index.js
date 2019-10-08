const config = require('./utils/config')
const app = require('./app')
const http = require('http')
const Channel = require('./models/channel')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})

var io = require('socket.io').listen(server);

let count = 0
io.sockets.on('connection', async socket => {
  console.log(count++)
  try {
    const channel = await Channel.findById('5d9a9ef7e9f2a26bb4ec4f20')
    socket.emit('messages', channel.messages)
  } catch (exception) {
    console.log(exception)
  }
  socket.on('disconnect', function () {
    console.log('disconnect:'+count)
    count--
  })
  socket.on('message_to_server', async data => {
    try {
      const channel = await Channel.findById(data.id)
      const updatedMsgs = channel.messages.concat(data.message)
      const result = await Channel.findByIdAndUpdate(data.id, {messages:updatedMsgs})
      io.sockets.emit('newMessage',{ ...result.toJSON(),messages:updatedMsgs}) 
    } catch (exception) {
      console.log(exception)
    }
  })

})