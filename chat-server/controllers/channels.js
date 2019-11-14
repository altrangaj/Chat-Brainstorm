const Channel = require('../models/channel')

const channelController = {
	addChannel: async (request, response, next) => {
		if (!request.body.name || request.body.users.length === 0) response.status(400).end()
		try {
			const channel = new Channel({
				name: request.body.name,
				messages:[],
				users: request.body.users
			})
			console.log(request.body.name)
			const result = await channel.save()
			response.status(201).json(result)
		} catch (exception) {
			next(exception)
		}
	},
	getMessages: async (request, response, next) => {
		try {
			const channel = await Channel.findById(request.params.id)
			response.json(channel.messages) 
		} catch (exception) {
			next(exception)
		}
	},
	addMessage: async (request, response, next) => {
		try {
			const channel = await Channel.findById(request.params.id)
			const updatedMsgs = channel.messages.concat(request.body.message)
			const result = await Channel.findByIdAndUpdate(request.params.id, {messages:updatedMsgs})
			response.json({ ...result.toJSON(),messages:updatedMsgs}) 
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