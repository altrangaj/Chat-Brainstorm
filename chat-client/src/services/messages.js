import axios from 'axios'

const baseUrl = '/api/channels'

const getAll = async (id) => {
	const msgs = await axios.get(`${baseUrl}/${id}`)
	return msgs
}
export default {getAll}