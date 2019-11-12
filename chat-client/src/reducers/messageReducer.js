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
export const addMsg = (message,user) => {
	const msgByAuthor =`${user.username}:${message}`
	return {
		type: 'SEND_WEBSOCKET_MESSAGE',
		data: msgByAuthor
	  }
  }

const reducer = (state = [], action) => {
	switch (action.type) {
	case 'INIT_MESSAGES':
		return action
	case 'SOCKET_MESSAGE_RECEIVED':
		console.log('SOCKET_MESSAGE_RECEIVED')
		return action
	case 'SEND_WEBSOCKET_MESSAGE':
		console.log('SEND_WEBSOCKET_MESSAGE')
		return {data:[...state.data,action.data]}
	default:
		return state
	}
}
export default reducer