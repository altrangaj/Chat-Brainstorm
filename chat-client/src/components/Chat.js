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
			<div >
				<Segment.Inline style={{color:'#ffffcc'}}>
					<table style={{width:'100%'}}>
						<tbody>
							<tr >
								<td style={{fontWeight:'bold', width:'50%'}}>
										channel 
								</td>
								<td style={{whiteSpace: 'nowrap', width:'50%',marginRight:'0%', paddingRight:'0px', borderRight:'0px', textAlign:'right'}}>
									<div style={{whiteSpace: 'nowrap', display:'inline'}}>create new channel</div>
									<div style={{marginLeft:'0.5em', display:'inline'}}>
										<button  onClick={() => setUiComponent('createChannel')}>create</button>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</Segment.Inline>
				<DropDownContainer user={props.user} />
				{ props.messages && <FocusScrollable messages={props.messages} />}
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
				<Segment className='segmentStyle' style={{backgroundColor: '#01011A', borderRadius:'0px 0px 30px 30px'}} placeholder>
					{props.channel && dnd()}
					<Rail attached internal position='right' style={{ minWidth:'22rem', width:'25vw'}} >  
						<Segment style={{backgroundColor:'#0C375B'}}>
							{uiComponent === 'chat' && chat()}
							{uiComponent === 'createChannel' && <CreateChannelForm setUiComponent={setUiComponent} />}
						</Segment>
					</Rail>
				</Segment>
			</div>
		)} else return <div></div> 
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
