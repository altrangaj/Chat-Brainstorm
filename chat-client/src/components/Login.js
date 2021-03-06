import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import  { useField } from '../hooks/field'
import { signUp } from '../reducers/usersReducer'
import Info from './Info'
import { setUser, clearUser, resetUser } from '../reducers/loggedUserReducer'
import { useTransition, animated } from 'react-spring'
import styled from 'styled-components'
import { Divider, Form, Grid, Segment, Image } from 'semantic-ui-react'
import './Login.css'
const image = require('./meeting.jpg')




const Login = (props) => {
  const username = useField('text')
  const password = useField('password')
  const [signUp, setSignUp] = useState(false)
  const [message,setMessage] = useState(null)
  const [loaded, setLoaded] = useState(false)
  
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
  const transitions = useTransition((!window.localStorage.getItem('loggedChatUser') || !props.user) && loaded , null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  })
  const handleInputs = async (event, func) => {
    event.preventDefault()
    try {
      if(!username.input.value || username.input.value.trim().length < 3) {
        setMessage({content: 'valid username is required (min length is 3)', color:'red'})
        return
      }
      if(!password.input.value || password.input.value.length < 3) {
        setMessage({content: 'valid password is required (min length is 3)', color:'red'})
        return
      }
      const credentials = {
        username:username.input.value.trim(), password:password.input.value
      }
      await func(credentials)
    } catch (exception) {
      setMessage({content:exception.message, color:'red'})
      return
    }
    if(signUp) {
      setMessage({content:`account created for user: ${username.input.value}!`,color:'green'})
      return
    }
    setMessage(null)
  }

  const handleLogin = (e) => {
    handleInputs(e,props.setUser)
  }
  const handleSignUp = async (e) => {
    await handleInputs(e,props.signUp)
    setSignUp(false)
    username.reset()
    password.reset()
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
        style={{color:'#b29966',backgroundColor:'black',border:'solid 1px #b29966',marginBottom:'0.5em'}}
        {...password.input}
      />
      <button className='myButton' autoFocus type="submit">{buttonText}</button>
    </Form>
  )
  const options = () => (
    <div >
      <Grid columns={2} relaxed='very' stackable >
        <Grid.Column>
          {form('Login', handleLogin)}
        </Grid.Column>
        <Grid.Column verticalAlign='middle'>
          <button className='myButton' onClick={() => setSignUp(true)} type='button'>Sign up</button>
        </Grid.Column>
      </Grid>
      <Divider style={{color:'#b29966'}} vertical>Or</Divider>
    </div>
  )
  
  const Div = styled.div`
    animation-name: backGroundAnim;
    animation-timing-function:ease-in;
    animation-duration:500ms;
    width:100vw;
    height:100vh;
  @keyframes backGroundAnim {
    from {background:black;}
    to {background:transparent;}
  }`

  return loaded ? transitions.map(({ item, key, props }) =>
    item && <animated.div key={key} style={props}>
      <div style={{border:'0px',padding:'0px', maxWidth:'1280px',width:'70%',margin:'auto'}}>
        <Image style={{paddingTop:'7vh'}} src={image} />
        <Segment style={{padding:'0px', margin:'0rem',backgroundColor:'black',border:'solid 1px #665533'}} placeholder>
          {!signUp && options()}
          {signUp && form('Sign Up',handleSignUp)}
        </Segment>
        <Info message={message} clear={() => setMessage(null)}/>
      </div>
    </animated.div>
  ) : <Div>
    <Image onLoad={() => setLoaded(true)} style={{display:'none',paddingTop:'7vh'}} src={image} />
    <span style={{position:'absolute',top:'50%',left:'50%',fontSize:'2em',color:'#b29966',marginLeft:'-5rem'}}>
      loading...
    </span>
  </Div>
}

const mapStateToProps = (state) => {
  return {
    user: state.loggedUser
  }
}
export default connect(mapStateToProps,{ setUser, clearUser, resetUser, signUp })(Login)