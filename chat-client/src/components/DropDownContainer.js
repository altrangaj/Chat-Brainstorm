import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {initializeChannels} from '../reducers/channelsReducer'
import {initializeNotes} from '../reducers/noteReducer'
import { setChannel } from '../reducers/selectedChannelReducer'
import { initializeMessages } from '../reducers/messageReducer'

const DropDownContainer = (props) => {

	useEffect(() => {
		/*
        const fetchData = async () => {
            await props.initializeChannels(props.user.userId)
        }
        fetchData()*/
		props.initializeChannels(props.user.userId)
		
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleChange =  e => {
		e.preventDefault()
		const index = e.target.selectedIndex
		const name = e.target.childNodes[index].value
		if(name !== 'select:'){
			const chIndex = props.channels.find(i => i.name === name).id
			props.setChannel(chIndex, name)
			props.initializeMessages(chIndex)
			props.initializeNotes(chIndex)
		}
	}

	if(props.channels.length !== 0){
        
		return (
			<div>
				<select onChange={handleChange} style={{width:'100%'}}>
					{[{name:'select:'},...props.channels].map((channel,i) => (<option value={channel.name} key={i}>{channel.name}</option>))}
				</select>
			</div>
		)    
	} else return (<div></div>)}

const mapStateToProps = (state) => {
	return {
		channels: state.channels,
		channel: state.channel
	}
}
export default connect(
	mapStateToProps,
	{ initializeChannels, 
		setChannel, 
		initializeMessages,
		initializeNotes })(DropDownContainer)