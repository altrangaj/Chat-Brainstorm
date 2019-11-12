import axios from 'axios'
const baseUrl = '/api/users'

const login = async credentials => {
	const response = await axios.post(`http://localhost:3003${baseUrl}/login`, credentials)
	console.log('user-response.data: ', response.data)
	return response.data
}

export default { login }