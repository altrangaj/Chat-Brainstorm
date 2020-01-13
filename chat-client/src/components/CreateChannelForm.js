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
  props.setIn(true)
	
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
        <Message style={{width:'80%', margin:'auto', marginTop:'1.5em',color:'red',backgroundColor:'black'}} attached='bottom' warning>
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
        const chId = await props.channels.find(i => i.name === name.input.value.trim()).id
        await props.setChannel(chId, name.input.value.trim(), props.user)
        await props.makeEmptyMessages()
        await props.makeEmptyNotes()
				
        resetWarnings()	
      }
      setNewChannel()
      props.setChat(true)
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
  const cancel = () => {
    props.setChat(true)
  }

  if(props.users)
    return (
      <div style={{textAlign:'center'}}>
        <Form inverted>
          <Form.Input
            label='Name'
            placeholder='channel name'
            style={{width:'80%', margin:'auto'}}
            {...name.input}
          />
          <div style={{width:'80%', margin:'auto'}}>
            <div style={{color:'white',fontWeight:'bold', paddingBottom:'0.3em'}}>Users</div>
            <Dropdown label='Users' placeholder='users' fluid multiple search selection 
              options={props.users.filter(u => (u.id !== props.user.userId)).map(u => ({key:u.id, text:u.username,value:u.id}))}
              onChange={handleChange}
            />
          </div>
          <div style={{margin:'auto',textAlign:'center'}}>
            <Button type='button' style={{border: '2px solid #b29966',color:'#b29966', backgroundColor:'black',marginTop:'0.9em',display:'inline'}} content='create'  onClick={handleSubmit} />
            <Button type='button' style={{border: '2px solid #b29966',color:'#b29966', backgroundColor:'black', marginLeft:'0.9em',marginTop:'0.9em',display:'inline'}} content='cancel'  onClick={cancel} />
          </div>
        </Form>
        {message && showMessage(message)}
        {props.error && showMessage(props.error.message)}
      </div>
    )
  return <div></div>
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