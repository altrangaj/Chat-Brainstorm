const config = require('./utils/config')
const app = require('./app')
const http = require('http')
const Channel = require('./models/channel')

const server = http.createServer(app)
/*
server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})*/

var io = require('socket.io')(server,{cookie:false})//server,{path:'/',cookie:false,pingInterval:1000})//.listen(server);

let count = 0
io.on('connection', async socket => {
  console.log(count++,socket.id.slice(8))
  try {
    const channel = await Channel.findById('5dbfc45d1b0f5f053c6d0a67')
   if(channel && channel.messages) socket.emit('messages', channel.messages)
  } catch (exception) {
    console.log(exception)
  }
  socket.on('disconnect', function () {
    console.log('disconnect:'+count)
    count--
  }) //
  socket.on('message_to_server', async data => {
    try {
      const channel = await Channel.findById(data.id)
      const updatedMsgs = channel.messages.concat(data.message)
      const result = await Channel.findByIdAndUpdate(data.id, {messages:updatedMsgs})
      //io.origins(updatedMsgs)
      socket.broadcast.emit('newMessage',{ ...result.toJSON(),messages:updatedMsgs}) 
    } catch (exception) {
      console.log(exception)
    }
  })

})
server.listen(config.PORT)