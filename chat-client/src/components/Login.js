import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import  { useField } from '../hooks/field'
import { signUp } from '../reducers/usersReducer'
import { setUser, clearUser, resetUser } from '../reducers/loggedUserReducer'
import { Button, Divider, Form, Grid, Segment, Header } from 'semantic-ui-react'
import Clock from './Clock'

const Login = (props) => {
	const username = useField('text')
	const password = useField('password')
	
	const [signUp, setSignUp] = useState(false)
    
	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedChatUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			props.resetUser(user)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	const handleInputs = async (event, func) => {
		event.preventDefault()
		try {
			const credentials = {
				username:username.input.value, password:password.input.value
			}
			console.log('credentials:',credentials)
			await func(credentials)
		} catch (exception) {
			console.log(exception)
			//console.log('käyttäjätunnus tai salasana virheellinen')
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
		<Form inverted onSubmit={eventHandler}>
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
			<Button content={buttonText} primary type="submit" />
		</Form>
	)
	const options = () => (
		<div>
			<Grid columns={2} relaxed='very' stackable>
				<Grid.Column>
					{form('Login', handleLogin)}
				</Grid.Column>
				<Grid.Column verticalAlign='middle'>
					<Button content='Sign up' icon='signup' size='big' onClick={() => setSignUp(true)} />
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
			<Segment style={{backgroundColor:'#0C375B', marginTop:'3rem'}} placeholder>
				{!signUp && options()}
				{signUp && form('Sign Up',handleSignUp)}
			</Segment>
		) 
	} else return (
		<div style={{marginTop:'3rem'}}>
			<Segment style={{textAlign:'right',backgroundColor:'#0C375B',color:'#ffffcc'}}>
				<Grid columns={2}>
					<Grid.Column>
						<table style={{width:'100%'}}>
							<tbody>
								<tr >
									<td style={{fontWeight:'bold', width:'50%',textAlign:'left'}}>
										<Header style={{color:'#ffffcc'}} as='h1'><Clock/></Header>
									</td>
									<td style={{whiteSpace: 'nowrap', width:'50%',marginRight:'0%', paddingRight:'0px', borderRight:'0px', textAlign:'right'}}>
										{ props.channel && <Header as='h1' dividing style={{fontWeight:'bold',color:'#ffffcc', display:'inline', textAlign:'right'}}>{props.channel.name}</Header> }
									</td>
								</tr>
							</tbody>
						</table>
					</Grid.Column>
					<Grid.Column >
						<div style={{display:'inline'}}>
							<Header style={{whiteSpace: 'nowrap', display:'inline', marginRight:'2rem',color:'#ffffcc'}} as='h3'>{props.user.username} is logged in &nbsp;</Header>
						</div>
						<div style={{display:'inline'}}>
							<Button onClick={handleLogout}>logout</Button>	
						</div>
					</Grid.Column>
				</Grid>
			</Segment>
		</div>
	)
}
//<Header style={{color:'#ffffcc'}} as='h1'>21:53</Header>
const mapStateToProps = (state) => {
	return {
		user: state.loggedUser,
		channel: state.channel
	}
}
export default connect(mapStateToProps,{ setUser, clearUser, resetUser, signUp })(Login)