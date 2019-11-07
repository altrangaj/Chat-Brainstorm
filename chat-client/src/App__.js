import React, { Component, useState, useEffect, useRef } from 'react'
import openSocket from "socket.io-client";
import  { useField } from './hooks/field';

class App extends Component {
  
  constructor() {
    super();
    this.socket = openSocket('http://127.0.0.1:3003')
    this.socket.on("messages", data => this.setState({ msgs: data }))
    this.socket.on("newMessage", data => this.setState({ msgs: data.messages }))
    this.state = {
      msgs: [],
      msg: ""
    };
  }
  /*
  componentWillMount() {
    const { endpoint } = this.state;
    this.socket = openSocket(endpoint);
    //this.setState({connection: socket})
    this.socket.on("messages", data => this.setState({ msgs: data }));
    this.socket.on("newMessage", data => this.setState({ msgs: data.messages }));
  }*/
  /*
  const [msgs, setMsgs] = useState([])
  const msg = useField('text')
  const url = 'http://127.0.0.1:3003'
  const socket = useRef(openSocket(url))
  
	useEffect(() => {
    
    socket.current.on('messages', data => setMsgs(data))
		socket.current.on('newMessage', data => setMsgs(data))
  }, [])
  */

  //if(msgs.map){
    render(){
      const sendMsg = () => {
        this.socket.emit('message_to_server',{id:'5dbfc45d1b0f5f053c6d0a67', message:this.state.msg})
        this.setState({msg:''})
      }
      if(this.state.msgs.map){    
  return (
    <div>
      <div>
        {this.state.msgs.map(m => <div key={m}>{m}</div>)}
      </div>
      <form onSubmit={sendMsg}>
				<div>
					<input
            value={this.state.msg} 
            onChange={(event) => this.setState({msg:event.target.value})}
           />
				</div>
			  <button type="submit">send</button>
			</form>
    </div>
  )} else {return <div></div>}
}}

export default App;
