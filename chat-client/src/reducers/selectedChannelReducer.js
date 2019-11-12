export const setChannel = (id) => {
	return {
		type: 'SET_CHANNEL',
		data: id
	  }
  }

const reducer = (state = "", action) => {
	switch (action.type) {
	case 'SET_CHANNEL':
		return action.data
	default:
		return state
	}
}
export default reducer