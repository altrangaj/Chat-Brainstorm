import axios from 'axios'

const baseUrl = '/api/channels'

const getMessages = async (id) => {
	const msgs = await axios.get(`${baseUrl}/${id}`)
	return msgs.data
}
export default {getMessages}