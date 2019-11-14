import messageService from '../services/messages'

export const initializeMessages = (id) => {
	return async dispatch => {
		const msgs = await messageService.getMessages(id)
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
			channel }
	  }
}

const reducer = (state = [], action) => {
	switch (action.type) {
	case 'INIT_MESSAGES':
		return action
	case 'SOCKET_MESSAGE_RECEIVED':
		console.log('SOCKET_MESSAGE_RECEIVED',action.data)
		return {data:action.data.messages}
	case 'SEND_WEBSOCKET_MESSAGE':
		console.log('SEND_WEBSOCKET_MESSAGE')
		return {data:[...state.data,action.data.message]}
	default:
		return state
	}
}
export default reducer