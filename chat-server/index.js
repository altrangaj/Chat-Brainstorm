const config = require('./utils/config')
const app = require('./app')
const http = require('http')
const Channel = require('./models/channel')
const Note = require('./models/note')

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
		
		try {
			switch (action.type) {
			case 'SEND_WEBSOCKET_MESSAGE': {
				const channel = await Channel.findById(action.data.channel)
				const updatedMsgs = channel.messages.concat(action.data.message)
				await Channel.findByIdAndUpdate(action.data.channel, {messages:updatedMsgs})
				io.emit('message',{channelID: action.data.channel, messages: updatedMsgs}) 
				return
			}
			case 'CREATE_CHANNEL':{
				const newChannel = new Channel({
					name: action.data.name,
					users: action.data.users
				})
				const result = await newChannel.save()
				io.emit('channel', {id: result._id,users: result.users, messages:[],name: result.name})
				return
			}
			case 'ADD_NOTE': {
				const newNote = new Note({...action.data.note, content: ''})
				const result = await newNote.save()
				const channel = await Channel.findById(action.data.channel)
				const notes = channel.notes.concat(result._id)
				await Channel.findByIdAndUpdate(action.data.channel, {notes:notes})
				io.emit('add_note', {channelID: action.data.channel, note:newNote.toJSON()})
				return
			}
			case 'SET_NOTE': {
				const note = action.data.note
				await Note.findByIdAndUpdate(note.id, {...note})
				io.emit('set_note', {channelID: action.data.channel, note: note})
				return
			}
			case 'DELETE_NOTE': {
				const channel = await Channel.findById(action.data.channelID)
				const updatedNotes = channel.notes.filter(n => n != action.data.noteID)
				await Channel.findByIdAndUpdate(action.data.channelID, {notes: updatedNotes})
				await Note.remove({_id: action.data.noteID})
				io.emit('delete_note', { ...action.data})
				return
			}
			}
		} catch (exception) {
			console.log(exception)
		}
	})

})
server.listen(config.PORT)