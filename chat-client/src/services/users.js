import axios from 'axios'

const baseUrl = '/api/users'

const getUsers = async (user) => {
	const users = await axios.get(`${baseUrl}`, { headers: {Authorization: user.token}})
	return users
}
const addUser = async (data) => {
	try {
		const newData = await axios.post(`${baseUrl}/signup`, data)
		return newData.data
	} catch (exception) {
		console.log(exception)
	}
}
export default { getUsers, addUser }