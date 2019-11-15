const mongoose = require('mongoose')

const channelSchema = mongoose.Schema({
	name: String,
	messages: [String],
	users: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
	notes: [{type: mongoose.Schema.Types.ObjectId, ref:'Note'}]
})
channelSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})
module.exports = mongoose.model('Channel', channelSchema)
// Channels.find({users:{$in:[user._id]}})