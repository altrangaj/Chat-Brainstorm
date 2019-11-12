import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {initializeChannels} from '../reducers/channelsReducer'
import { setChannel } from '../reducers/selectedChannelReducer'

const DropDownContainer = (props) => {

    useEffect(() => {
        const fetchData = async () => {
            await props.initializeChannels(props.user.userId)
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChange = e => {
        e.preventDefault()
        const index = e.target.selectedIndex
        const name = e.target.childNodes[index].value
        if(name !== 'select:') props.setChannel(props.channels.find(i => i.name === name).id)
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
	console.log('tilapäivitys dropdownista',state)
	return {
        channels: state.channels
	}
}
export default connect(mapStateToProps,{ initializeChannels, setChannel })(DropDownContainer)