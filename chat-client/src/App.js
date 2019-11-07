import React, { useState, useEffect, useRef } from 'react'
import openSocket from "socket.io-client";
import  { useField } from './hooks/field'

const App = () => {
  const url = 'http://127.0.0.1:3003'
  const [msgs, setMsgs] = useState([])
  const [socket, setSocket] = useState(openSocket(url))
  const msg = useField('text')
  
  //const socket = useRef(openSocket(url))
  
	useEffect(() => {
    
    socket.on('messages', data => setMsgs(data))
		socket.on('newMessage', data => setMsgs(data.messages))
  }, [])
  const sendMsg = () => {
    const txt = msg.input.value
    socket.emit('message_to_server',{id:'5dbfc45d1b0f5f053c6d0a67', message:txt})
    msg.reset()
  }
  if(msgs.map){
  return (
    <div>
      <div>
        {msgs.map((m,i) => <div key={i}>{m}</div>)}
      </div>
      <form onSubmit={sendMsg}>
				<div>
					<input {...msg.input} />
				</div>
			  <button type="submit">send</button>
			</form>
    </div>
  )} else {return <div></div>}
}

export default App;
