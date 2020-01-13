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
      <div style={{background:'black',border:'none'}}>
        <input placeholder='write your msg here' style={{
          padding:'0.1em 0 0.1em 0',
          fontWeight:'500',
          fontSize:'1.2em',
          paddingLeft:'0.4em',
          lineHeight:'1.2em',
          backgroundColor:'black',
          borderTop: 'none',
          borderBottom: '1px solid #b29966',
          borderLeft:'none',
          borderRight:'none',
          color:'#b29966',
          width:'80%'}} 
        onKeyPress={keyPressed} {...msg.input} />
        <button style={{
          cursor: 'pointer',
          padding:'0.2em 0 0.15em 0',
          border:'1px solid #b29966',
          color:'#b29966',
          marginTop:'0px',
          backgroundColor:'black',
          fontFamily: 'Lato,Helvetica Neue,Arial,Helvetica,sans-serif', 
          fontWeight:'700',
          width:'20%'}} 
        onClick={sendMsg}>send</button>
        {warning && <div style={{color:'red',backgroundColor:'black',border:'2px solid red',padding:'1em',margin:'0em'}}>{warning}</div>}
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
