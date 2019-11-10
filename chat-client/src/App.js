import React, { useEffect } from 'react'
import  { useField } from './hooks/field'
import { initializeMessages,addMsg } from './reducers/messageReducer'
import { connect } from 'react-redux'


const App = (props) => {
  
  const msg = useField('text')
  
	useEffect(() => {
    console.log('useEffect')
    props.initializeMessages('5dbfc45d1b0f5f053c6d0a67')
   // eslint-disable-next-line react-hooks/exhaustive-deps
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
