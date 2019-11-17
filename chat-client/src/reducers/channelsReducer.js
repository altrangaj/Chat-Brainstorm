import channelsService from '../services/channels'


export const initializeChannels = (user) => {
	return async dispatch => {
		const data = await channelsService.getChannels(user)
		dispatch({
			type: 'GET_CHANNELS',
			data
		})
	}
}

export const createChannel = (name, users, user) => {
	return {
		type: 'CREATE_CHANNEL',
		data: { name, users, token:user.token }
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