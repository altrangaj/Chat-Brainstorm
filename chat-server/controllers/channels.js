const Channel = require('../models/channel')

const channelController = {
	getMessages: async (request, response, next) => {
		try {
			const channel = await Channel.findById(request.params.id)
			response.json(channel.messages) 
		} catch (exception) {
			next(exception)
		}
	},
	getNotes: async (request, response, next) => {
		try {
			const channel = await Channel.findById(request.params.id).populate('notes')
			const chs = channel.notes.map(ch => ch.toJSON())
			response.json(chs) 
		} catch (exception) {
			next(exception)
		}
	},
	getChannels: async (request, response, next) => {
		try {
			const data = await Channel.find({users:{$in:[request.params.id]}})
			const channels = data.map(ch => ch.toJSON())
			response.json({channels: channels}) 
		} catch (exception) {
			next(exception)
		}
	}
}
module.exports = channelController