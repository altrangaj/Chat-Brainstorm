import React, { useEffect, useState } from 'react'
//import React from 'react'
import { connect } from 'react-redux'
import  { useField } from '../hooks/field'
import { initializeUsers } from '../reducers/usersReducer'
import { createChannel } from '../reducers/channelsReducer'
import { Button, Form, Dropdown, Message, Icon } from 'semantic-ui-react'
import './ChannelForm.css'


const CreateChannelForm = (props) => {

	const [selection, setSelection] = useState([])
	const name = useField('text')
	const [message,setMessage] = useState(null)
	
	const showMessage = (m) => {
		setMessage(m)
		setTimeout(() => {
			setMessage(null)
			
		},5000)
	}

	useEffect(() => {
		props.initializeUsers(props.user)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleChange = (e,data) => {
		e.preventDefault()
		setSelection(data.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if(selection.length > 0 && name.input.value !== '') {
			props.createChannel(name.input.value, selection, props.user)
			props.setUiComponent('chat')
		}
		else showMessage('users or name missing')
		
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
							options={props.users.map(u => ({key:u.id, text:u.username,value:u.id}))}
							onChange={handleChange}
						/>
					</div>
					<div style={{margin:'auto',textAlign:'center'}}>
						<Button style={{marginTop:'0.9em',display:'inline'}} content='create'  onClick={handleSubmit} />
						<Button style={{marginLeft:'0.9em',marginTop:'0.9em',display:'inline'}} content='cancel'  onClick={() => {props.setUiComponent('chat')}} />
					</div>
				</Form>
				{message && 
				<Message style={{marginLeft:'0.9em',marginRight:'0.9em',marginTop:'0.9em'}} attached='bottom' warning>
      				<Icon name='warning sign' />
      				{message}
    			</Message>
				}
		
			</div>
		)
	} else return <div>niinpäniin</div>
}

const mapStateToProps = (state) => {
	return {
		user: state.loggedUser,
		users: state.users
	}
}
export default connect(mapStateToProps,{ initializeUsers, createChannel })(CreateChannelForm)