import React from 'react'
import { useDrag } from 'react-dnd'

const style = {
	position: 'absolute',
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.8rem 0rem 0rem 0rem',
	cursor: 'move',
}
const Note = ({ id, left, top, children }) => {
	const [{ isDragging }, drag] = useDrag({
		item: { id, left, top, type: 'note' },
		collect: monitor => {
			return {isDragging: monitor.isDragging()}
		},
	})
	if (isDragging) {
		return <div ref={drag} />
	}
	return (
		<div ref={drag} style={{ ...style, left, top }}>
			{children}
		</div>
	)
}
export default Note