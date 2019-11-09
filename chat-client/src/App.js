import React, { useState, useEffect, useRef } from 'react'
import openSocket from "socket.io-client";
import  { useField } from './hooks/field'
import { initializeMessages,addMsg } from './reducers/messageReducer'
import { connect } from 'react-redux'
import messageService from './services/messages'

const App = (props) => {
 // const url = 'http://127.0.0.1:3003'
 // const [msgs, setMsgs] = useState([])
 // const [socket, setSocket] = useState(openSocket(url))
  const msg = useField('text')
  
  //const socket = useRef(openSocket(url))
  
	useEffect(() => {
    props.initializeMessages('5dbfc45d1b0f5f053c6d0a67')
    //messageService.getAll('5dbfc45d1b0f5f053c6d0a67')
    //.then(msgs => props.initializeMessages(msgs))
    //socket.on('messages', data => setMsgs(data))
		//socket.on('newMessage', data => setMsgs(data.messages))
  }, [])
  const sendMsg = () => {
    const txt = msg.input.value
    props.addMsg(txt)
    msg.reset()
  }
  if(props.messages && props.messages.map){
  return (
    <div>
      <div>
        {props.messages.map((m,i) => <div key={i}>{m}</div>)}
      </div>
      <form onSubmit={sendMsg}>
				<div>
					<input {...msg.input} />
				</div>
			  <button type="submit">send</button>
			</form>
    </div>
  )} else {return <div>kukkuu</div>}
}
const mapStateToProps = (state) => {
	console.log('tilapäivitys',state)
	return {
		messages: state.data,
	}
}
export default connect(mapStateToProps,{ initializeMessages, addMsg })(App)
