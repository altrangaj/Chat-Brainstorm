import noteService from '../services/notes'

export const initializeNotes = (id) => {
	return async dispatch => {
		const notes = await noteService.getNotes(id)
		dispatch({
			type: 'INIT_NOTES',
			data: notes
		})
	}
}
export const addNote = (note, channel) => {
	return {
		type: 'ADD_NOTE',
		data: { note: note,
			channel }
	}
}
export const setNote = (note, channel) => {
	return {
		type: 'SET_NOTE',
		data: { note, channel }
	}
}

const reducer = (state = [], action) => {
	switch (action.type) {
	case 'INIT_NOTES':
		return action.data
	case 'SOCKET_ADD_NOTE':
		console.log('SOCKET_ADD_NOTE',action.data)
		return state.concat(action.data)
	case 'SOCKET_SET_NOTE':
		console.log('SOCKET_SET_NOTE',action.data)
		return state.map(n => (action.data.id === n.id ? action.data : n))
	default:
		return state
	}
}
//props.notes.map((b) => (id === b.id ? {id: id, top: b.top, left:b.left, content: event.target.value} : b))
export default reducer