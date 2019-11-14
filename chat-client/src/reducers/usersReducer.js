import usersService from '../services/users'


export const initializeUsers = () => {
	return async dispatch => {
		const data = await usersService.getUsers()
		dispatch({
			type: 'GET_USERS',
			data
		})
	}
}

export const signUp = (userdata) => {
	return async dispatch => {
		const data = await usersService.addUser(userdata)
		console.log('ADD_USER:', data)
		dispatch({
			type: 'ADD_USER',
			data
		})
	}
}

const reducer = (state = [], action) => {
	switch (action.type) {
	case 'GET_USERS':
		return  action.data.data.users
	case 'ADD_USER':
		return [...state, action.data]
	default:
		return state
	}
}
export default reducer