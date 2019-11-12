import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import  { useField } from '../hooks/field'
import { setUser, clearUser, resetUser } from '../reducers/loggedUserReducer'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'


const Login = (props) => {
    const username = useField('text')
    const password = useField('password')
    
    useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedChatUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			props.resetUser(user)
		}
		 // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const credentials = {
				username:username.input.value, password:password.input.value
			}
			console.log('credentials:',credentials)
			await props.setUser(credentials)

			username.reset()
			password.reset()

		} catch (exception) {
			console.log(exception)
			username.reset()
			password.reset()
			console.log('käyttäjätunnus tai salasana virheellinen')
		}}

	const handleLogout = async (event) => {
		event.preventDefault()
		window.localStorage.removeItem('loggedChatUser')
		props.clearUser()

    }
    if (props.user === null) {
		return (
			
		<Segment placeholder>
			<Grid columns={2} relaxed='very' stackable>
				<Grid.Column>
					<Form onSubmit={handleLogin}>
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

					<Button content='Login' primary type="submit" />
					</Form>
				</Grid.Column>

				<Grid.Column verticalAlign='middle'>
					<Button content='Sign up' icon='signup' size='big' />
				</Grid.Column>
				</Grid>

			<Divider vertical>Or</Divider>
		</Segment>
		) 
	} else return (
        <Segment textAlign='right'>
            <Form onSubmit={handleLogout}>
                <Button type="submit">logout</Button>
            </Form>
		</Segment>
    )
}

const mapStateToProps = (state) => {
	return {
        user: state.loggedUser
	}
}
export default connect(mapStateToProps,{ setUser, clearUser, resetUser })(Login)