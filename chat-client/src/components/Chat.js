import React, { useState } from 'react'
import { initializeMessages } from '../reducers/messageReducer'
import { Rail, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import FocusScrollable from './FocusScrollable'
import MessageForm from './MessageForm'
import DropDownContainer from './DropDownContainer'
import CreateChannelForm from './CreateChannelForm'
import DnDContainer from './DnDContainer'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import './Chat.css'

const Chat = (props) => {
  
	const [uiComponent, setUiComponent] = useState('chat')

	const chat = () => {
		return (
			<div>
				<Segment.Inline style={{textAlign:'right', color:'#ffffcc'}}>
          create new channel
					<button style={{marginLeft:'0.5em'}} onClick={() => setUiComponent('createChannel')}>create</button>
				</Segment.Inline>
				<DropDownContainer user={props.user} />
				{ props.messages && <FocusScrollable messages={props.messages} style={{}}/>}
				<MessageForm />
			</div>
		)
	}
  
	const dnd = () => (
		<DndProvider backend={HTML5Backend}>
			<DnDContainer />
		</DndProvider>
	)

	if(props.user !== null){
		return (
			<div>
				<Segment className='segmentStyle' style={{backgroundColor: '#01011A'}} placeholder>
					{props.channel && dnd()}
					<Rail attached internal position='right' >  
						<Segment style={{backgroundColor:'#0C375B'}}>
							{uiComponent === 'chat' && chat()}
							{uiComponent === 'createChannel' && <CreateChannelForm setUiComponent={setUiComponent} />}
						</Segment>
					</Rail>
				</Segment>
				<Segment style={{backgroundColor:'#0C375B', marginTop:'0%', height:'10px', padding:'0px'}}></Segment>
			</div>
		)} else return <div>kukkuu</div> 
    
}

const mapStateToProps = (state) => {
	//console.log('tilapäivitys',state)
	return {
		messages: state.messages.data,
		user: state.loggedUser,
		channel: state.channel
	}
}
export default connect(mapStateToProps,{ initializeMessages })(Chat)
