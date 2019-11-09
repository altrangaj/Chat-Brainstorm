import messageService from '../services/messages'
const id = '5dbfc45d1b0f5f053c6d0a67'

export const initializeMessages = (id) => {
	return async dispatch => {
		const msgs = await messageService.getAll(id)
		dispatch({
			type: 'INIT_MESSAGES',
			data: msgs
		})
	}
}/*
export const initializeMessages = (msgs) => {
	return {
			type: 'INIT_MESSAGES',
			data: msgs
	}
}*/
export const addMsg = (message) => {
	return {
		type: 'SEND_WEBSOCKET_MESSAGE',
		data: message
	  }
  }
const reducer = (state = [], action) => {
	switch (action.type) {
	case 'INIT_MESSAGES':
		return action.data
	case 'SOCKET_MESSAGE_RECEIVED':
		return action.data
	case 'SEND_WEBSOCKET_MESSAGE':
		return [...state.data,action.data]
	default:
		return state
	}
}
export default reducer