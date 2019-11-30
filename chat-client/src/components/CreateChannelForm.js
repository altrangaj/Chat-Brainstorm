import React, { useEffect, useState } from 'react'
//import React from 'react'
import { connect } from 'react-redux'
import  { useField } from '../hooks/field'
import { initializeUsers } from '../reducers/usersReducer'
import { createChannel } from '../reducers/channelsReducer'
import { Button, Form, Dropdown } from 'semantic-ui-react'
import './ChannelForm.css'


const CreateChannelForm = (props) => {

	const [selection, setSelection] = useState([])
	const name = useField('text')
   

	useEffect(() => {
		props.initializeUsers(props.user)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleChange = (e,data) => {
		e.preventDefault()
		console.log('submit:',e.target, data.value)
		setSelection(data.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(selection)
		if(selection.length > 0 && name.input.value !== '') 
			props.createChannel(name.input.value, selection, props.user)
		props.setUiComponent('chat')
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
					<Button style={{marginTop:'0.9em'}} content='create'  onClick={handleSubmit} />
				</Form>

		
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