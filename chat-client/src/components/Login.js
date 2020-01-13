import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import  { useField } from '../hooks/field'
import { signUp } from '../reducers/usersReducer'
import { setUser, clearUser, resetUser } from '../reducers/loggedUserReducer'
import { useTransition, animated } from 'react-spring'
import { Button, Divider, Form, Grid, Segment, Image, Message, Icon } from 'semantic-ui-react'
import './Login.css'

const image = require('./meeting.jpg')

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
    const setU = async () => {
      const loggedUserJSON = window.localStorage.getItem('loggedChatUser')
      if (loggedUserJSON) {
        try{
          const user = await JSON.parse(loggedUserJSON)
          await props.resetUser(user)
        } catch (e) {console.log(e.name)}
      }
    }
    setU()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const transitions = useTransition(!props.user, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })
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
    <Form inverted style={{paddingTop:'2em', paddingBottom:'1em'}} onSubmit={eventHandler} >
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
        style={{color:'#b29966',backgroundColor:'black',border:'solid 1px #b29966'}}
        {...password.input}
      />
      <Button style={{color:'#b29966',backgroundColor:'black',border:'solid 1px #b29966'}}  content={buttonText} type="submit" />
    </Form>
  )
  const options = () => (
    <div >
      <Grid columns={2} relaxed='very' stackable >
        <Grid.Column>
          {form('Login', handleLogin)}
        </Grid.Column>
        <Grid.Column verticalAlign='middle'>
          <Button style={{ color:'#b29966',backgroundColor:'black',border:'solid 1px #b29966'}} content='Sign up' icon='signup' size='big' onClick={() => setSignUp(true)} />
        </Grid.Column>
      </Grid>
      <Divider style={{color:'#b29966'}} vertical>Or</Divider>
    </div>
  )

   
  return transitions.map(({ item, key, props }) =>
    item && <animated.div key={key} style={props}>
      <div style={{border:'0px',padding:'0px', maxWidth:'1280px',width:'70%',margin:'auto'}}>
        <Image style={{paddingTop:'7vh'}} src={image} />
        <Segment style={{padding:'0px', margin:'0rem',backgroundColor:'black',border:'solid 3px #665533'}} placeholder>
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
    </animated.div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.loggedUser,
    channel: state.channel
  }
}
export default connect(mapStateToProps,{ setUser, clearUser, resetUser, signUp })(Login)