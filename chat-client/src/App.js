import React, { useState, useEffect, useRef } from 'react'
import io from "socket.io-client";
import  { useField } from './hooks/field'

const App = () => {
  const [msgs, setMsgs] = useState([])
  const msg = useField('text')
  const url = 'http://127.0.0.1:3003'
  const socket = useRef(io.connect(url))
	useEffect(() => {
    socket.current.on('messages', data => setMsgs(data))
		socket.current.on('newMessage', data => setMsgs(data))
  }, [])
  const sendMsg = () => {
    const txt = msg.input.value
    socket.current.emit('message_to_server',{id:'5d9a9ef7e9f2a26bb4ec4f20', message:txt})
  }
  if(msgs){
  return (
    <div>
      <div>
        {msgs.map(m => <div key={m}>{m}</div>)}
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
