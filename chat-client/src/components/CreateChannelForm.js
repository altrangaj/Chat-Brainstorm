import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import  { useField } from '../hooks/field'
import { initializeUsers } from '../reducers/usersReducer'
import { createChannel } from '../reducers/channelsReducer'
import { setError } from '../reducers/errorReducer'
import { setChannel } from '../reducers/selectedChannelReducer'
import { makeEmptyMessages } from '../reducers/messageReducer'
import { makeEmptyNotes } from '../reducers/noteReducer'
import { Button, Form, Dropdown, Message, Icon } from 'semantic-ui-react'
import './ChannelForm.css'


const CreateChannelForm = (props) => {

	const [selection, setSelection] = useState([])
	const name = useField('text')
	const [message,setMessage] = useState(null)
	const [channelsCount,setChannelsCount] = useState(props.channels.length)
	let timeout = -1
	const isMounted = useRef(true)
	
	const resetWarnings = () => {
		if(isMounted.current){
			setMessage(null)
			props.setError(null)
		}
	}

	const showMessage = (m) => {
		clearTimeout(timeout)
		if(m) {
			timeout = setTimeout(resetWarnings,5000)
			return (
				<Message style={{marginLeft:'0.9em',marginRight:'0.9em',marginTop:'0.9em'}} attached='bottom' warning>
					<Icon name='warning sign' />
					{ m }
				</Message>
			) 
		}
		else return <div></div>
	}
	
	useEffect(() => {
		props.initializeUsers(props.user)
		if(channelsCount < props.channels.length){
			setChannelsCount(props.channels.length)
			clearTimeout(timeout)
			const setNewChannel = async () => {
				const chId = props.channels.find(i => i.name === name.input.value).id
				await props.setChannel(chId, name.input.value)
				await props.makeEmptyMessages()
				await props.makeEmptyNotes()
				resetWarnings()
				props.setUiComponent('chat')
			}
			setNewChannel()
		}
		return () => {
			showMessage(null)
			isMounted.current = false
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.channels])

	const handleChange = (e,data) => {
		e.preventDefault()
		setSelection(data.value)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const chName = name.input.value.trim()
		if(selection.length > 0 && chName !== '') {
			if(props.channels.find(c => c.name === chName)){
				setMessage('dublicate channel name')
				return
			}
			await props.createChannel(chName, [...selection,props.user.userId], props.user)
		}
		else setMessage('users or name missing')
	}

	if(props.users){
		return (
			<div id='metal_form' >
				<Form inverted>
					<Form.Input
						label='Name'
						placeholder='channel name'
						{...name.input}
					/>
					<div style={{width:'80%', margin:'auto'}}>
						<div style={{color:'white',fontWeight:'bold', paddingBottom:'0.3em'}}>Users</div>
						<Dropdown label='Users' placeholder='users' fluid multiple selection 
							options={props.users.filter(u => (u.id !== props.user.userId)).map(u => ({key:u.id, text:u.username,value:u.id}))}
							onChange={handleChange}
						/>
					</div>
					<div style={{margin:'auto',textAlign:'center'}}>
						<Button type='button' style={{marginTop:'0.9em',display:'inline'}} content='create'  onClick={handleSubmit} />
						<Button type='button' style={{marginLeft:'0.9em',marginTop:'0.9em',display:'inline'}} content='cancel'  onClick={() => {props.setUiComponent('chat')}} />
					</div>
				</Form>
				{message && showMessage(message)}
				{props.error && showMessage(props.error.message)}
			</div>
		)
	} else return <div></div>
}

const mapStateToProps = (state) => {
	return {
		user: state.loggedUser,
		users: state.users,
		channels: state.channels,
		error:state.error
	}
}
export default connect(mapStateToProps,{ initializeUsers,
	createChannel,
	setError,
	setChannel,
	makeEmptyNotes,
	makeEmptyMessages })(CreateChannelForm)