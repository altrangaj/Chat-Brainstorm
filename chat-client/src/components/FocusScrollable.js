import React from 'react'
import styled from 'styled-components'
import ScrollableFeed from 'react-scrollable-feed'

const FocusScrollable = ({ messages }) => {

  
	const Div = styled.div`
      padding: 0.1em 0.3em;
      border: 1px solid Gray;
      border-radius: 3px;
  `
  
	return (
		<Div style={{ maxHeight: '27em' }}>
			<ScrollableFeed>
				{messages.map((m,i) => <div key={i}>{m}</div>)}
			</ScrollableFeed>
		</Div>
	)
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

export default FocusScrollable