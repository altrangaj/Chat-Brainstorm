import React from 'react'
import './Message.css'


const Message = (props) => {

	/*eslint-disable eqeqeq*/

	let name = props.message.split(':',1)
	let msg = props.message.replace(name + ':', '')
	let uus = false

	if(name == 'UUSIVIESTI'){
		name = msg.split(':',1)
		msg = msg.replace(name + ':', '')
		uus=true
	}

	const setMessage = () => {
		if(uus) return (
			<div className='message' >
				{msg}
			</div>
		)
		else return (
			<div style={{padding:'8px',borderRadius:'6px',backgroundColor:'rgba(5, 5, 5,0.5)'}}>
				{msg}
			</div>
		)
	}

	let style = {marginRight:'0.7rem',marginLeft:'0.3rem',marginBottom:'0.5rem',backgroundColor:'transparent', display:'inline-block', float:'left'}

	if(props.user == name){
		style.textAlign = 'right'
		style.float = 'right'

	}

	return (
		<div>
			<div style={{clear:'left'}}></div>
			<div style={style}>
				<span style={{color:'white'}}>{name}</span><br/>
				{setMessage()}
			</div>
			<div style={{clear:'right'}}></div>
		</div>
	)
}
export default Message
