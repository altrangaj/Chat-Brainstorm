import axios from 'axios'

const baseUrl = '/api/channels'

const getChannels = async (id) => {
	const channels = await axios.get(`${baseUrl}/user/${id}`)
	return channels
}
export default {getChannels}