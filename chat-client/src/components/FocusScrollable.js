import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import Message from './Message'
import { connect } from 'react-redux'
import './FocusScrollable.css'

const FocusScrollable = (props) => {

  if(props.user)
    return (
      <div id='scrollable'>
        <ScrollableFeed>
          {props.messages.map((m,i) => <Message index={props.messages.length - i} key={i} message={m} user={props.user.username} />)}
        </ScrollableFeed>
      </div>
    ) 
  return <div></div>
} 

const mapStateToProps = (state) => {
  return { user: state.loggedUser,
    messages: state.messages } }
export default connect(mapStateToProps, null)(FocusScrollable) 