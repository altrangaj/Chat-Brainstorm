import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import Note from './Note'
import {addNote, setNote, deleteNote} from '../reducers/noteReducer'
import { connect } from 'react-redux'
import { Menu, Dropdown } from 'semantic-ui-react'
//import './DnD.css'

const styles = {
	width: '100%',
	height: '85vh',
	position: 'relative',
	fontSize:'9px',
	borderRadius:'0px 0px 30px 30px',
	
}//#bd7201
const DnDContainer = (props) => {
        
	const [menu, setMenu] = useState({visible: false}) 
	const [menu2, setMenu2] = useState({visible: false})
	
	
	const [, drop] = useDrop({
		accept: 'note',
		drop(item, monitor) {
			const delta = monitor.getDifferenceFromInitialOffset()
			const left = Math.round(item.left + delta.x)
			const top = Math.round(item.top + delta.y)
			moveNote(item.id, left, top)
			return undefined
		},
	})
	const moveNote = (id, left, top) => {
		const note= props.notes.find(n => n.id === id)
		props.setNote({...note, top: top, left:left}, props.channel.id, props.user)
	}

	const handleContextMenu = (event) => {
		event.preventDefault()
		if(event.target.id === 'workArea'){
			setMenu({visible: true, style:{position: 'absolute', left:event.nativeEvent.offsetX, top:event.nativeEvent.offsetY}})
		} else if(event.nativeEvent.target.className !== 'txt-mesta') {
			handleContextMenu2(event)
		}
	}
	const handleContextMenu2 = (event) => {
		event.preventDefault()
		console.log(event.target.style)
		const left = Number(event.target.style.left.replace('px','')) + Number(event.nativeEvent.offsetX)
		const top = Number(event.target.style.top.replace('px','')) - Number(event.nativeEvent.offsetY)
		setMenu2({visible: true, id: event.nativeEvent.target.id, style:{position: 'absolute', left:left, top:top, zIndex:1000}})
	}
	const handleItemClick = () => {
		const date = new Date()
		props.addNote({left: menu.style.left, top: menu.style.top, backgroundColor:'#ffffcc', date: new Date(date.getTime()-date.getTimezoneOffset()*60*1000), author: props.user.username}, props.channel.id, props.user)
		setMenu({visible: false})
	}
	const handleDelete = () => {
		props.deleteNote(menu2.id, props.channel.id, props.user)
	}
	const setColor = (e) => {
		const note= props.notes.find(n => n.id === menu2.id)
		props.setNote({...note, backgroundColor: e.nativeEvent.target.id}, props.channel.id, props.user)
		hideMenus()
	}
	const contextMenu2 = () => (
		<Menu pointing vertical style={{...menu2.style, width:'9rem'}}>
			<Menu.Item
				name='delete note'
				active
				onClick={handleDelete}
			/>
			<Dropdown item text='set color'>
				<Dropdown.Menu >
					<table style={{width:'6em'}}>
						<tbody>
							<tr>
								<td><button id='#ffffcc' onClick={setColor} style={{backgroundColor:'#ffffcc', width:'20px',height:'20px'}}></button></td>
								<td><button id='#ffcccc' onClick={setColor} style={{backgroundColor:'#ffcccc', width:'20px',height:'20px'}}></button></td>
								<td><button id='#ccffff' onClick={setColor} style={{backgroundColor:'#ccffff', width:'20px',height:'20px'}}></button></td>
							</tr>
							<tr>
								<td><button id='#99ffcc' onClick={setColor} style={{backgroundColor:'#99ffcc', width:'20px',height:'20px'}}></button></td>
								<td><button id='#ffccff' onClick={setColor} style={{backgroundColor:'#ffccff', width:'20px',height:'20px'}}></button></td>
								<td><button id='#80ffff' onClick={setColor} style={{backgroundColor:'#80ffff', width:'20px',height:'20px'}}></button></td>
							</tr>
							<tr>
								<td><button id='#ff99c2' onClick={setColor} style={{backgroundColor:'#ff99c2', width:'20px',height:'20px'}}></button></td>
								<td><button id='#99ff99' onClick={setColor} style={{backgroundColor:'#99ff99', width:'20px',height:'20px'}}></button></td>
								<td><button id='#ff99ff' onClick={setColor} style={{backgroundColor:'#ff99ff', width:'20px',height:'20px'}}></button></td>
							</tr>
						</tbody>
					</table>
				</Dropdown.Menu>
			</Dropdown>
		</Menu> 
	)
	const contextMenu = () => (
		<Menu pointing vertical style={{...menu.style, width:'9rem'}}>
			<Menu.Item
				name='add note'
				active
				onClick={handleItemClick}
			/>
             
		</Menu> 
	)
	const hideMenus = (event) => {
		setMenu({visible: false})
		setMenu2({visible: false})
	}

	if(props.notes){
		return (
			<div ref={drop} style={styles} id='workArea' onContextMenu={handleContextMenu} onClick={hideMenus}>
				{menu.visible && contextMenu()}
				{menu2.visible && contextMenu2()}
                
				{props.notes.map((b) => (
					<Note
						key={b.id}
						id={b.id}
						left={b.left}
						top={b.top}
						backgroundColor={b.backgroundColor}
						author={b.author}
						date={b.date}
						content={b.content}
                       
					/>
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
export default connect(mapStateToProps,{addNote, setNote, deleteNote})(DnDContainer)