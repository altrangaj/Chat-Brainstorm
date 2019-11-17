import messageService from '../services/messages'

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
		return {data:action.data.messages}
	case 'SEND_WEBSOCKET_MESSAGE':
		return {data:[...state.data,action.data.message]}
	default:
		return state
	}
}

export default reducer