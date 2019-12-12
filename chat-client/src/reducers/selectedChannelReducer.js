export const setChannel = (id, name) => {
	return async dispatch => {
		dispatch ({
			type: 'SET_CHANNEL',
			data: {id, name}
		})
	}
}

const reducer = (state = '', action) => {
	switch (action.type) {
	case 'SET_CHANNEL':
		return action.data
	default:
		return state
	}
}
export default reducer