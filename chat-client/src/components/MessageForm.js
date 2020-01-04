import React, { useState } from 'react'
import  { useField } from '../hooks/field'
import { addMsg, removeAnimation } from '../reducers/messageReducer'
import { connect } from 'react-redux'
/*eslint-disable eqeqeq*/
const MessageForm = (props) => {

  const [warning, setWarning] = useState(null)
  const msg = useField('text')

  const sendMsg = async () => {
    const txt = msg.input.value
    if(props.channel != ''){
      setWarning(null)
      await props.removeAnimation()
      await props.addMsg(txt,props.user, props.channel.id)
    } else {
      setWarning('select channel first')
      setTimeout(() => {
        setWarning(null)
      },5000)
    }
    msg.reset()
  }
  
  const keyPressed = event => { if(event.key === 'Enter') sendMsg() }

  if(props.user)
    return (
      <div>
        <input style={{backgroundColor:'#e6e6e6',width:'80%'}} onKeyPress={keyPressed} {...msg.input} />
        <button style={{width:'20%'}} onClick={sendMsg}>send</button>
        {warning && <div style={{color:'red',backgroundColor:'white',border:'2px solid red',padding:'1em',margin:'0em'}}>{warning}</div>}
      </div>
    )
  return <div></div>
}

const mapStateToProps = (state) => {
  return {
    user: state.loggedUser,
    channel: state.channel
  }
}
export default connect(mapStateToProps, { addMsg,removeAnimation })(MessageForm)
