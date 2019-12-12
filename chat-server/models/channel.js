const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
mongoose.Promise = global.Promise

const channelSchema = mongoose.Schema({
	name: { type: String, unique: true, required: true },
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
channelSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' })
module.exports = mongoose.model('Channel', channelSchema)
