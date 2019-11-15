import axios from 'axios'

const baseUrl = '/api/channels'

const getNotes = async (id) => {
	const notes = await axios.get(`${baseUrl}/${id}/notes`)
	return notes.data
}
export default {getNotes}