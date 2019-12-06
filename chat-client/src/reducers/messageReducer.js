import messageService from '../services/messages'

/*eslint-disable eqeqeq*/

export const initializeMessages = (id, user) => {
	return async dispatch => {
		const msgs = await messageService.getMessages(id, user)
		dispatch({
			type: 'INIT_MESSAGES',
			data: msgs
		})
	}
}
export const addMsg = (message, user, channel) => {
	const msgByAuthor =`${user.username}:${message}`
	return {
		type: 'SEND_WEBSOCKET_MESSAGE',
		data: { message: msgByAuthor,
			channel, token: user.token }
	  }
}

const reducer = (state = [], action) => {
	switch (action.type) {
	case 'INIT_MESSAGES':
		return action
	case 'SOCKET_MESSAGE_RECEIVED':
		const msgs = action.data.messages.slice()
		msgs[msgs.length-1] = 'UUSIVIESTI:'+msgs[msgs.length-1]
		return {data:msgs}
	case 'SEND_WEBSOCKET_MESSAGE':
		const msgs2 = state.data.map((m) => (m.split(':',1) == 'UUSIVIESTI' ? m.replace('UUSIVIESTI:', '') : m))
		return {data:[...msgs2,action.data.message]}
	default:
		return state
	}
}

export default reducer