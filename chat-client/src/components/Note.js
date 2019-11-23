import React,{ useState, useEffect } from 'react'
import { useDrag } from 'react-dnd'
import {setNote } from '../reducers/noteReducer'
import { connect } from 'react-redux'

const style = {
	position: 'absolute',
	border: '1px dashed gray',
	padding: '0rem 0rem 0rem 0rem',
	cursor: 'move',
	fontSize:'9px',
	width: '7rem',
	height: '4rem'
}
const Note = (props) => {

	const [text, setText] = useState(props.content)

	useEffect(() => {
		setText(props.content)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.content])

	const onChange = (event) => {
		setText(event.target.value)
	}

	const [{ isDragging }, drag] = useDrag({
		item: { id:props.id, left:props.left, top:props.top, type: 'note' },
		collect: monitor => {
			return {isDragging: monitor.isDragging()}
		},
	})
	if (isDragging) {
		return <div ref={drag} />
	}

	const updateText = async (Id) => {
		const note= props.notes.find(n => n.id === Id)
		const date2 = new Date()
		await props.setNote({...note, content:text, author:props.user.username, 
			date: new Date(date2.getTime()-date2.getTimezoneOffset()*60*1000)}, props.channel.id, props.user)
	}
	
	return (
		<div ref={drag} id={props.id} style={{ ...style, left:props.left, top:props.top, backgroundColor:props.backgroundColor }} >
		&nbsp; {props.author} {props.date.slice(8,10)}.{props.date.slice(5,7)}. {props.date.slice(11,16)}
		<textarea className='txt-mesta' style={{fontSize: '1rem',width:'7rem', height:'3.8rem',backgroundColor:props.backgroundColor}} 
		value={text} onChange={onChange}  onBlur={() => updateText(props.id)} />
		</div>
	)
}
const mapStateToProps = (state) => {
	return {
		user: state.loggedUser,
		channel: state.channel,
		notes: state.notes
	}
}
export default connect(mapStateToProps,{setNote})(Note)