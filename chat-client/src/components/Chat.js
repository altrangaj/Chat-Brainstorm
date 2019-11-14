import React, { useState } from 'react'
import { initializeMessages } from '../reducers/messageReducer'
import { Rail, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import FocusScrollable from './FocusScrollable'
import MessageForm from './MessageForm'
import DropDownContainer from './DropDownContainer'
import CreateChannelForm from './CreateChannelForm'
import './Chat.css'

const Chat = (props) => {
  
	const [uiComponent, setUiComponent] = useState('chat')

	const chat = () => {
		return (
			<div>
				<Segment.Inline style={{textAlign:'right'}}>
          create a new channel
					<button style={{marginLeft:'0.5em'}} onClick={() => setUiComponent('createChannel')}>create</button>
				</Segment.Inline>
				<DropDownContainer user={props.user} />
				{ props.messages && <FocusScrollable messages={props.messages} />}
				<MessageForm />
			</div>
		)
	}
  


	if(props.user !== null){
		return (
			<div>
				<Segment className='segmentStyle' placeholder>
					<Rail attached internal position='right'>  
						<Segment>
							{uiComponent === 'chat' && chat()}
							{uiComponent === 'createChannel' && <CreateChannelForm setUiComponent={setUiComponent} />}
						</Segment>
					</Rail>
				</Segment>
			</div>
		)} else return <div>kukkuu</div> 
    
}

const mapStateToProps = (state) => {
	console.log('tilapäivitys',state)
	return {
		messages: state.messages.data,
		user: state.loggedUser
	}
}
export default connect(mapStateToProps,{ initializeMessages })(Chat)
