import React from 'react'
import styled from 'styled-components'
import ScrollableFeed from 'react-scrollable-feed'
import Message from './Message'
import { connect } from 'react-redux'

const FocusScrollable = (props) => {

  
	const Div = styled.div`
      padding: 0.1em 0.3em;
  `
  //backgroundImage:'linear-gradient(rgba(46, 66, 107,0.8),rgba(153, 51, 102,0.8))'
	//backgroundImage:'linear-gradient(rgba(153,115,8,0.6),rgba(255, 153, 0,0.8))'
	if(props.user){
		return (
			<Div style={{ height: '33em',backgroundImage:'linear-gradient(rgba(102, 102, 102,0.8),rgba(30,30, 30,0.8))', color:'#d9d9d9' }}>
				<ScrollableFeed>
					{props.messages.map((m,i) => <Message index={props.messages.length - i} key={i} message={m} user={props.user.username} />)}
				</ScrollableFeed>
			</Div>
		)} else return <div></div>
} 


/*
const FocusScrollable = ({ messages }) => {

  const messagesEndRef = useRef()

  const Div = styled.div`
    padding: 0.1em 0.3em;
    border: 1px solid Gray;
    border-radius: 3px;
`

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages.length]);

  return (
    <Div style={{ overflow: 'auto', maxHeight: '27em' }}>
      {messages.map((m, i) => <div key={i}>{m}</div>)}
      <div ref={messagesEndRef} />
    </Div>
  )
}*/


/*import React, { useRef, useLayoutEffect } from 'react'
import useStayScrolled from 'react-stay-scrolled'
import styled from 'styled-components'
 
const FocusScrollable = ({ messages }) => {
  const listRef = useRef()
  const { scrollBottom } = useStayScrolled(listRef);

  const Div = styled.div`
    padding: 0.1em 0.3em;
    border: 1px solid Gray;
    border-radius: 3px;
`

  useLayoutEffect(() => {
    scrollBottom()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length])
 
  return (
    <Div ref={listRef} style={{ overflow: 'auto', maxHeight: '27em' }}>
        {messages.map((m,i) => <div key={i}>{m}</div>)}
    </Div>
  )
} */

const mapStateToProps = (state) => {
	return { user: state.loggedUser } }
export default connect(mapStateToProps, null)(FocusScrollable) 