import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import  { useField } from '../hooks/field'
import { signUp } from '../reducers/usersReducer'
import { setUser, clearUser, resetUser } from '../reducers/loggedUserReducer'
import { Button, Divider, Form, Grid, Segment, Header } from 'semantic-ui-react'

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
		<Form onSubmit={eventHandler}>
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
			<Segment placeholder>
				{!signUp && options()}
				{signUp && form('Sign Up',handleSignUp)}
			</Segment>
		) 
	} else return (
		<div>
			<Segment textAlign='right'>
				<Grid columns={2}>
					<Grid.Column>
						{ props.channel && <Header as='h1' dividing>{props.channel.name}</Header> }
					</Grid.Column>
					<Grid.Column >
						<Form onSubmit={handleLogout}>
							<Button type="submit">logout</Button>
						</Form>
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