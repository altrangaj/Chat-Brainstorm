import React from 'react'
import  { useField } from '../hooks/field'
import { addMsg } from '../reducers/messageReducer'
import { connect } from 'react-redux'

const MessageForm = (props) => {

	const msg = useField('text')

	const sendMsg = () => {
		const txt = msg.input.value
		props.addMsg(txt,props.user, props.channel.id)
		msg.reset()
	}
  
	if(props.user !== null){
		return (
			<div>
				<input style={{width:'80%'}} {...msg.input} />
				<button style={{width:'20%'}} onClick={sendMsg}>send</button>
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
