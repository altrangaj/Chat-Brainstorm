import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import Note from './Note'
import {addNote, setNote} from '../reducers/noteReducer'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'

const styles = {
	width: '100%',
	height: 800,
	border: '1px solid black',
	position: 'relative',
}
const DnDContainer = (props) => {
        
	const [menu, setMenu] = useState({visible: false}) 
        
	const [, drop] = useDrop({
		accept: 'note',
		drop(item, monitor) {
			const delta = monitor.getDifferenceFromInitialOffset()
			const left = Math.round(item.left + delta.x)
			const top = Math.round(item.top + delta.y)
			moveBox(item.id, left, top)
			console.log('left:',left,'top:',top)
			return undefined
		},
	})
	const moveBox = (id, left, top) => {
		const content= props.notes.find(n => n.id === id).content
		props.setNote({id: id, top: top, left:left, content: content}, props.channel.id)
	}
	const updateText = (event,id) => {
		console.log(event.target)
		const note= props.notes.find(n => n.id === id)
		props.setNote({id: id, top: note.top, left:note.left, content: event.target.value}, props.channel.id)
	}
	const handleContextMenu = (event) => {
		event.preventDefault()
		console.log('left:',event.nativeEvent.offsetX,'top:',event.nativeEvent.offsetY)
		setMenu({visible: true, style:{position: 'absolute', left:event.nativeEvent.offsetX, top:event.nativeEvent.offsetY}})
	}
	const handleItemClick = () => {
		console.log('add note') 
		props.addNote({left: menu.style.left, top: menu.style.top}, props.channel.id)
		setMenu({visible: false})
	}

	const contextMenu = () => (
		<Menu pointing vertical style={menu.style}>
			<Menu.Item
				name='add note'
				active
				onClick={handleItemClick}
			/></Menu> 
	)
	if(props.notes){
		console.log(props.notes)
		return (
			<div ref={drop} style={styles} onContextMenu={handleContextMenu}>
				{menu.visible && contextMenu()}
				{props.notes.map((b) => (
					<Note
						key={b.id}
						id={b.id}
						left={b.left}
						top={b.top}
					>
						<textarea value={b.content} onChange={(e) => updateText(e,b.id)} />
					</Note>
				))
				}
			</div>
		)} else return <div></div>
}
const mapStateToProps = (state) => {
	return {
		user: state.loggedUser,
		channel: state.channel,
		notes: state.notes
	}
}
export default connect(mapStateToProps,{addNote, setNote})(DnDContainer)