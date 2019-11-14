import channelsService from '../services/channels'


export const initializeChannels = (id) => {
	return async dispatch => {
		const data = await channelsService.getChannels(id)
		dispatch({
			type: 'GET_CHANNELS',
			data
		})
	}
}

export const createChannel = (name, users) => {
	return {
		type: 'CREATE_CHANNEL',
		data: { name, users }
	}
}

const reducer = (state = [], action) => {
	switch (action.type) {
	case 'GET_CHANNELS':
		return  action.data.data.channels
	case 'SOCKET_ADD_CHANNEL':
		const newState = state.concat(action.data)
		return newState
	default:
		return state
	}
}
export default reducer