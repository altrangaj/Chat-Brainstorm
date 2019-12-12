import React, { useState } from 'react'
import  { useField } from '../hooks/field'
import { addMsg } from '../reducers/messageReducer'
import { connect } from 'react-redux'
/*eslint-disable eqeqeq*/
const MessageForm = (props) => {

	const [warning, setWarning] = useState(null)
	const msg = useField('text')

	const sendMsg = async () => {
		const txt = msg.input.value
		if(props.channel != ''){
			setWarning(null)
			await props.addMsg(txt,props.user, props.channel.id)
		} else {
			setWarning('select channel first')
			setTimeout(() => {
				setWarning(null)
			},5000)
		}
		msg.reset()
	}
  
	if(props.user !== null){
		return (
			<div>
				<input style={{width:'80%'}} {...msg.input} />
				<button style={{width:'20%'}} onClick={sendMsg}>send</button>
				{warning && <div style={{color:'red',backgroundColor:'white',border:'2px solid red',padding:'1em',margin:'0.5em'}}>{warning}</div>}
			</div>
		)} else return <div></div>
}

const mapStateToProps = (state) => {
	return {
		user: state.loggedUser,
		channel: state.channel
	}
}
export default connect(mapStateToProps, { addMsg })(MessageForm)
