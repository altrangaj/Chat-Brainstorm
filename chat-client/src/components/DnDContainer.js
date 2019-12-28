import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import Note from './Note'
import {addNote, setNote, deleteNote} from '../reducers/noteReducer'
import { connect } from 'react-redux'
import { Menu, Dropdown } from 'semantic-ui-react'
import map from './noteColors'

import './DnD.css'



const DnDContainer = (props) => {
        
	const [menu, setMenu] = useState({visible: false}) 
	const [menu2, setMenu2] = useState({visible: false})
	const [pos, setPos] = useState({left:'0px',top:'0px'})
		
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

		if(event.target.id === 'dnd'){
			let top = event.nativeEvent.offsetY - document.getElementById('wa').offsetHeight
			setMenu({visible: true, style:{zIndex:1000,position: 'absolute', left:event.nativeEvent.offsetX, top}})
			setMenu2({visible: false})
		} else if(event.nativeEvent.target.className !== 'txt-mesta' && event.nativeEvent.target.id !== 'wa') {
			handleContextMenu2(event)
		}
	}
	const handleContextMenu2 = (event) => {
		const left = Number(event.target.style.left.replace('px','')) + Number(event.nativeEvent.offsetX)
		const top = Number(event.target.style.top.replace('px','')) - Number(event.nativeEvent.offsetY)
		setMenu2({visible: true, id: event.nativeEvent.target.id, style:{position: 'absolute', left:left, top:top, zIndex:1000}})
		setMenu({visible: false})
	}
	const handleItemClick = (e) => {
		e.preventDefault()
		const date = new Date()
		let top = menu.style.top + document.getElementById('wa').offsetHeight
		
		props.addNote({left: menu.style.left, top, backgroundColor:'#ffffcc', date: new Date(date.getTime()-date.getTimezoneOffset()*60*1000), author: props.user.username}, props.channel.id, props.user)
		setMenu({visible: false})
	}
	const handleDelete = (e) => {
		e.preventDefault()
		props.deleteNote(menu2.id, props.channel.id, props.user)
	}
	const setColor = (e) => {
		e.preventDefault()
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
								<td><button id='#ffffcc' onClick={setColor} style={{backgroundColor:map.get('#ffffcc'), width:'20px',height:'20px'}}></button></td>
								<td><button id='#ffcccc' onClick={setColor} style={{backgroundColor:map.get('#ffcccc'), width:'20px',height:'20px'}}></button></td>
								<td><button id='#ccffff' onClick={setColor} style={{backgroundColor:map.get('#ccffff'), width:'20px',height:'20px'}}></button></td>
							</tr>
							<tr>
								<td><button id='#99ffcc' onClick={setColor} style={{backgroundColor:map.get('#99ffcc'), width:'20px',height:'20px'}}></button></td>
								<td><button id='#ffccff' onClick={setColor} style={{backgroundColor:map.get('#ffccff'), width:'20px',height:'20px'}}></button></td>
								<td><button id='#80ffff' onClick={setColor} style={{backgroundColor:map.get('#80ffff'), width:'20px',height:'20px'}}></button></td>
							</tr>
							<tr>
								<td><button id='#ff99c2' onClick={setColor} style={{backgroundColor:map.get('#ff99c2'), width:'20px',height:'20px'}}></button></td>
								<td><button id='#99ff99' onClick={setColor} style={{backgroundColor:map.get('#99ff99'), width:'20px',height:'20px'}}></button></td>
								<td><button id='#ff99ff' onClick={setColor} style={{backgroundColor:map.get('#ff99ff'), width:'20px',height:'20px'}}></button></td>
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
	const hideMenus = () => {
		setMenu({visible: false})
		setMenu2({visible: false})
	}

	let offsetX, offsetY
	let moveContent = false
	const move = e => {
		if(moveContent && e.target.className !== 'note') {
			e.target.style.left = `${e.pageX-offsetX}px`
			e.target.style.top = `${e.pageY-offsetY}px`
			
			document.getElementById('root').style.backgroundPositionX = 0.5*(e.pageX-offsetX) + 'px'
			document.getElementById('root').style.backgroundPositionY = 0.5*(e.pageY-offsetY) + 'px'
		}
	}
	const start = e => {
		if(e.target.id === 'dnd'){
			moveContent = true
			offsetX = e.clientX - Number(pos.left.replace('px',''))
			offsetY = e.clientY - Number(pos.top.replace('px',''))
		}
	}
	
	const stop = e => {
		moveContent = false
		if(e.target.id === 'dnd'){
			setPos({
				left :e.target.style.left,
				top : e.target.style.top 
			})
		}
	}

	if(props.notes){
		return (
			<div className='hoverjuttu'>
				
				<div ref={drop} id='dnd' onContextMenu={handleContextMenu} style={pos} onClick={hideMenus} onMouseMove={move} onMouseDown={start} onMouseUp={stop} >
					<div id='wa'>&nbsp;draggable working area</div>
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
					))}
				</div>
			</div>
		)} else return <div>odota</div>
}
const mapStateToProps = (state) => {
	return {
		user: state.loggedUser,
		channel: state.channel,
		notes: state.notes
	}
}
export default connect(mapStateToProps,{addNote, setNote, deleteNote})(DnDContainer)