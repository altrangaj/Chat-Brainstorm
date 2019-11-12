import React from 'react'
import  { useField } from '../hooks/field'
import { addMsg } from '../reducers/messageReducer'
import { connect } from 'react-redux'

const MessageForm = (props) => {

  const msg = useField('text')

  const sendMsg = () => {
    const txt = msg.input.value
    props.addMsg(txt,props.user)
    msg.reset()
  }
  
  if(props.user !== null){
    return (
        <div>
        <form onSubmit={sendMsg}>
            <input style={{width:'80%'}} {...msg.input} />
            <button type="submit">send</button>
        </form>
        </div>
    )} else return <div></div>
}

const mapStateToProps = (state) => {
	return {
        user: state.loggedUser
	}
}
export default connect(mapStateToProps, { addMsg })(MessageForm)
