import React, { useState, useEffect } from 'react'
import { useDrag } from 'react-dnd'
import {setNote } from '../reducers/noteReducer'
import { connect } from 'react-redux'
import './Note.css'


const Note = (props) => {

	const [text, setText] = useState(props.content)

	// onBlur ei toimi ilman tätä
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
		if(note.content !== text)
			await props.setNote({...note, content:text, author:props.user.username, 
				date: new Date(date2.getTime()-date2.getTimezoneOffset()*60*1000).toISOString()}, props.channel.id, props.user)
	}

	const setDate = (date) => {
		return date.slice(8,10)+'.'+date.slice(5,7)+'. '+date.slice(11,16)
	}
	
	return (
		<div className='note' ref={drag} id={props.id} style={{ left:props.left, top:props.top, backgroundColor:props.backgroundColor }} >
		&nbsp; {props.author} {setDate(props.date)}
			<textarea className='txt-mesta' style={{fontSize: '1rem',width:'100%', height:'70%', backgroundColor:props.backgroundColor}} 
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