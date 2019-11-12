import React, { useEffect } from 'react'
import { initializeMessages } from '../reducers/messageReducer'
import { Rail, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import FocusScrollable from './FocusScrollable'
import MessageForm from './MessageForm'
import DropDownContainer from './DropDownContainer'


const Chat = (props) => {
  
    useEffect(() => {
        console.log('useEffect')
        props.initializeMessages('5dbfc45d1b0f5f053c6d0a67')
       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
  if(props.messages && props.messages.map && props.user !== null){
    return (
      <Segment>
        <Rail attached internal position='right'>
          <Segment>
          <DropDownContainer user={props.user} />
          <FocusScrollable messages={props.messages} />
          <MessageForm />
          </Segment>
        </Rail>
      </Segment>
    )} else {return (<div>kukkuu</div>)}
}

const mapStateToProps = (state) => {
	console.log('tilapäivitys',state)
	return {
    messages: state.messages.data,
    user: state.loggedUser
	}
}
export default connect(mapStateToProps,{ initializeMessages })(Chat)
