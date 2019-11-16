import React from 'react'
import { useDrag } from 'react-dnd'

const style = {
	position: 'absolute',
	border: '1px dashed gray',
	padding: '0rem 0rem 0rem 0rem',
	cursor: 'move',
	fontSize:'9px',
	width: '7rem',
	height: '4rem'
}
const Note = ({ id, left, top, children, backgroundColor, author, date}) => {
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
		<div ref={drag} id={id} style={{ ...style, left, top, backgroundColor }} >
		&nbsp; {author} {date.slice(8,10)}.{date.slice(5,7)}. {date.slice(11,16)}
			{children}
		</div>
	)
}
export default Note