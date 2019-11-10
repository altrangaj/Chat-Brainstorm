const config = require('./utils/config')
const app = require('./app')
const http = require('http')
const Channel = require('./models/channel')

const server = http.createServer(app)

const channelID = '5dbfc45d1b0f5f053c6d0a67'
var io = require('socket.io')(server)

let count = 0
io.on('connection', async socket => {
  console.log(count++,socket.id.slice(8))

  socket.on('disconnect', function () {
    console.log('disconnect:'+count)
    count--
  })
  socket.on('action', async action => {
    console.log(action)
    try {
      switch (action.type) {
        case 'SEND_WEBSOCKET_MESSAGE': {
          const channel = await Channel.findById(channelID)
          const updatedMsgs = channel.messages.concat(action.data)
          await Channel.findByIdAndUpdate(channelID, {messages:updatedMsgs})
          socket.broadcast.emit('message',updatedMsgs) 
        }
      }
    } catch (exception) {
      console.log(exception)
    }
  })

})
server.listen(config.PORT)