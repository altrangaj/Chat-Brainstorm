import axios from 'axios'

const baseUrl = '/api/users'

const getUsers = async (user) => {
	const users = await axios.get(`${baseUrl}`, { headers: {Authorization: user.token}})
	return users
}
const addUser = async (data) => {
	let newData = null
	try {
		newData = await axios.post(`${baseUrl}/signup`, data)
		return newData.data
	} catch (exception) {
		return newData
	}
}
export default { getUsers, addUser }