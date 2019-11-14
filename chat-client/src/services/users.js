import axios from 'axios'

const baseUrl = '/api/users'

const getUsers = async () => {
	const users = await axios.get(`${baseUrl}`)
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