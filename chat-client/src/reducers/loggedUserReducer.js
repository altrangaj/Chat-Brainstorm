import loginService from '../services/login'


export const setUser = (gredentials) => {
	return async dispatch => {
		const data = await loginService.login(gredentials)

		window.localStorage.setItem(
			'loggedChatUser', JSON.stringify(data)
		)
		dispatch({
			type: 'SET_USER',
			data
		})
	}
}

export const clearUser = () => {
	window.localStorage.removeItem('loggedChatUser')
	return { type: 'CLEAR_USER' }
}
export const resetUser = data => ({ type:'SET_USER', data })

const reducer = (state = null, action) => {
	switch (action.type) {
	case 'SET_USER':
		return  action.data
	case 'CLEAR_USER':
		return null
	default:
		return state
	}
}
export default reducer