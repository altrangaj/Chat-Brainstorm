import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import  { useField } from '../hooks/field'
import { signUp } from '../reducers/usersReducer'
import { setUser, clearUser, resetUser } from '../reducers/loggedUserReducer'
import { Button, Divider, Form, Grid, Segment, Header, Image, Message, Icon } from 'semantic-ui-react'
import Clock from './Clock'
import ChannelName from './ChannelName'
import './Login.css'
const image = require('./team.jpg')

const Login = (props) => {
	const username = useField('text')
	const password = useField('password')
	
	const [signUp, setSignUp] = useState(false)
	const [message,setMessage] = useState(null)
	
	const showMessage = (m) => {
		setMessage(m)
		setTimeout(() => {
			setMessage(null)
		},5000)
	}

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedChatUser')
		if (loggedUserJSON) {
			try{
				const user = JSON.parse(loggedUserJSON)
				props.resetUser(user)
			} catch (e) {console.log(e.name)}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	const handleInputs = async (event, func) => {
		event.preventDefault()
		try {
			if(!username.input.value || username.input.value.trim().length < 3) {
				showMessage('valid username is required (min length is 3)')
				return
			}
			if(!password.input.value || password.input.value.length < 3) {
				showMessage('valid password is required (min length is 3)')
				return
			}
			const credentials = {
				username:username.input.value.trim(), password:password.input.value
			}
			await func(credentials)
		} catch (exception) {
			showMessage(exception.message)
		}
		username.reset()
		password.reset()
	}
	const handleLogin = (e) => {
		handleInputs(e,props.setUser)
	}
	const handleSignUp = (e) => {
		handleInputs(e,props.signUp)
		setSignUp(false)
	}
	
	const form = (buttonText, eventHandler) => (
		<Form style={{paddingTop:'2em', paddingBottom:'1em'}} onSubmit={eventHandler} >
			<Form.Input
				icon='user'
				iconPosition='left'
				label='Username'
				placeholder='Username'
				{...username.input}
			/>
			<Form.Input
				icon='lock'
				iconPosition='left'
				label='Password'
				{...password.input}
			/>
			<Button style={{borderStyle: 'outset'}} content={buttonText} type="submit" />
		</Form>
	)
	const options = () => (
		<div >
			<Grid columns={2} relaxed='very' stackable >
				<Grid.Column>
					{form('Login', handleLogin)}
				</Grid.Column>
				<Grid.Column verticalAlign='middle'>
					<Button style={{borderStyle: 'outset'}} content='Sign up' icon='signup' size='big' onClick={() => setSignUp(true)} />
				</Grid.Column>
			</Grid>
			<Divider vertical>Or</Divider>
		</div>
	)

	const handleLogout = async (event) => {
		event.preventDefault()
		window.localStorage.removeItem('loggedChatUser')
		props.clearUser()
	}

	if (props.user === null) {
		return (
			<div style={{border:'0px',padding:'0px', maxWidth:'1920px',margin:'auto'}}>
				<Image style={{marginTop:'3rem'}} src={image} />
				<Segment className='metal' style={{border:'0px',padding:'0px', margin:'0rem'}} placeholder>
					{!signUp && options()}
					{signUp && form('Sign Up',handleSignUp)}
				</Segment>
				{message && 
				<Message attached='bottom' warning>
      				<Icon name='warning sign' />
      				{message}
    			</Message>
				}
			</div>
		)
	} else return (
		<div style={{marginTop:'3rem'}}>
			<Segment className='metal' style={{color:'black', padding:'0.3rem'}}>
				<Grid columns={2}>
					<Grid.Column>
						<div style={{ textAlign:'left',display:'inline', float:'left',width:'30%',boxSizing:'border-box', paddingLeft:'0.35rem'}}>
							<Header style={{ textAlign:'center',display:'inline',color:'white', textShadow: '0px 0px 3px black'}} as='h1'><Clock/></Header>
						</div>
						<div style={{textAlign:'right',display:'inline', float:'right',width:'70%',boxSizing:'border-box'}}>	
							{ props.channel && <Header as='h1' style={{fontWeight:'bold', display:'inline', textAlign:'center',color:'white'}}>
								<ChannelName/>
							</Header> }
						</div>			
					</Grid.Column>
					<Grid.Column>
						<div style={{display:'inline-block',verticalAlign: 'middle', float:'right',width:'30%',textAlign:'right',boxSizing:'border-box'}}>
							<Button style={{borderStyle: 'outset',borderRadius:'6px',padding:'0.7em'}} onClick={handleLogout}>logout</Button>	
						</div>
						<div style={{  float:'right',verticalAlign: 'middle',width:'70%',height:'100%',boxSizing:'border-box', marginRight:'2.5em'}}>
							<div style={{textShadow: '0px 0px 3px black',color:'white',whiteSpace: 'nowrap', position:'absolute',top:'35%',paddingLeft:'0.2em',paddingRight:'0.2em',right:'7em',borderRadius:'4px',backgroundColor:'rgba(15, 15, 15,0.6)'}}>{props.user.username} is logged in </div>
						</div>
					</Grid.Column>
				</Grid>
			</Segment>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.loggedUser,
		channel: state.channel
	}
}
export default connect(mapStateToProps,{ setUser, clearUser, resetUser, signUp })(Login)