import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {initializeChannels} from '../reducers/channelsReducer'
import {initializeNotes} from '../reducers/noteReducer'
import { setChannel } from '../reducers/selectedChannelReducer'
import { initializeMessages } from '../reducers/messageReducer'

/*eslint-disable eqeqeq*/
const DropDownContainer = (props) => {

  useEffect(() => {
    props.initializeChannels(props.user)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleChange =  async e => {
    e.preventDefault()
    const index = e.target.selectedIndex
    const name = e.target.childNodes[index].value
    if(name !== 'select:'){
      const chId = props.channels.find(i => i.name == name).id
      await props.setChannel(chId, name, props.user)
      await props.initializeMessages(chId, props.user)
      await props.initializeNotes(chId, props.user)
    }
  }
	
  if(props.channels.length !== 0){
    return (
      <div>
        <select onChange={handleChange} 
          style={{border:'none',paddingLeft:'0.4em',
            fontSize:'1.4em',
            fontFamily: 'Abhaya Libre, serif',
            fontWeight:'900',
            color:'#b29966',
            borderColor:'black',
            backgroundColor:'black',
            width:'100%'}}>
          {[{name:'select:'},...props.channels].map((channel,i) => (<option value={channel.name} key={i}>{channel.name}</option>))}
        </select>
      </div>
    )    
  } else return (<div></div>)}

const mapStateToProps = (state) => {
  return {
    channels: state.channels,
    channel: state.channel,
    user: state.loggedUser
  }
}
export default connect(
  mapStateToProps,
  { initializeChannels, 
    setChannel, 
    initializeMessages,
    initializeNotes })(DropDownContainer)