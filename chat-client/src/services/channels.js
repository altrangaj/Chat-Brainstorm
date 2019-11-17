import axios from 'axios'

const baseUrl = '/api/channels'

const getChannels = async (user) => {
	const channels = await axios.get(`${baseUrl}/user/${user.userId}`,{ headers: {Authorization: user.token}})
	return channels
}
export default {getChannels}