const config = require('./utils/config')
const app = require('./app')
const http = require('http')
const Channel = require('./models/channel')

const server = http.createServer(app)
/*
server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})*/
const channelID = '5dbfc45d1b0f5f053c6d0a67'
var io = require('socket.io')(server)//server,{path:'/',cookie:false,pingInterval:1000})//.listen(server);

let count = 0
io.on('connection', async socket => {
  console.log(count++,socket.id.slice(8))
  try {
    const channel = await Channel.findById(channelID)
   if(channel && channel.messages) socket.emit('messages', channel.messages)
  } catch (exception) {
    console.log(exception)
  }
  socket.on('disconnect', function () {
    console.log('disconnect:'+count)
    count--
  }) //
  socket.on('action', async message => {
    console.log(message)
    try {
      
        const channel = await Channel.findById(channelID)
        const updatedMsgs = channel.messages.concat(message)
        const result = await Channel.findByIdAndUpdate(channelID, {messages:updatedMsgs})
        //io.origins(updatedMsgs)
        socket.broadcast.emit('message',updatedMsgs) 
      
    } catch (exception) {
      console.log(exception)
    }
  })

})
server.listen(config.PORT)
//app.listen(3003)