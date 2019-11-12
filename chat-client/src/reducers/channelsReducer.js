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

const reducer = (state = [], action) => {
	switch (action.type) {
	case 'GET_CHANNELS':
		return  action.data.data.channels
	default:
		return state
	}
}
export default reducer