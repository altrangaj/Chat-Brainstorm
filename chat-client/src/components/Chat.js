import React, { useState, useEffect } from 'react'
import { initializeMessages } from '../reducers/messageReducer'
import { Segment, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import ChatWindow from './ChatWindow'
import CreateChannelForm from './CreateChannelForm'
import DnDContainer from './DnDContainer'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { clearUser } from '../reducers/loggedUserReducer'
import ChannelName from './ChannelName'
import Clock from './Clock'
import bg from './minimal1.png'
import bg2 from './minimal2.png'
import { CSSTransition } from 'react-transition-group'

import './Chat.css'

const Chat = (props) => {
  
  const [chat, setChat] = useState(true)
  const [inProp, setInProp] = useState(false)
  const [item, setItem] = useState(null)
	
	

  if(!item) setTimeout(()=>setItem(() => <ChatWindow setChat={setChat} setIn={setInProp}/>),350)

  useEffect(() => {
    setInProp(false)
    if(chat) setTimeout(()=>setItem(() => <ChatWindow setChat={setChat} setIn={setInProp}/>),350)
    else setTimeout(()=>setItem(() => <CreateChannelForm setChat={setChat} setIn={setInProp} />),350)
  },[chat])
	
  document.getElementById('root').style.backgroundImage = `url(${bg})`
  document.getElementById('fg2').style.backgroundImage = `url(${bg2})`

  const dnd = () => (
    <DndProvider backend={HTML5Backend}>
      <DnDContainer/>
    </DndProvider>
  )

	
  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedChatUser')
    document.getElementById('root').style.backgroundPositionX = '0px'
    document.getElementById('root').style.backgroundPositionY = '0px'
    document.getElementById('fg2').style.backgroundPositionX = '0px'
    document.getElementById('fg2').style.backgroundPositionY = '0px'
    setItem(null)
    setInProp(false)
    props.clearUser(props.user)
  }

  if(props.user)
    return (
      <div>
        <Segment  style={{margin:'0',padding:'0',backgroundColor:'transparent'}} placeholder >
          {props.channel && dnd()}
        </Segment>
        <div style={{textAlign:'left',position:'absolute',top:'5%',left:'33%'}}>	
          { props.channel && <span style={{fontWeight:'bold', textAlign:'left',color:'#d4c6aa'}}>
            <ChannelName/>
          </span> }
        </div>	
        <div style={{zIndex:'10',textAlign:'left',position:'absolute',top:'5%',left:'4em'}}>
          <div style={{
            paddingTop:'0.16em', 
            fontFamily: 'Cinzel, serif',
            fontSize: '2.6em', 
            fontWeight:'900',
            textAlign:'left',
            color:'#b29966',
            textShadow: '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black'
          }} ><Clock/></div>
        </div>
        <div style={{ zIndex:'10',position:'absolute',top:'5%',right:'5%',minWidth:'22rem', width:'25vw',paddingRight:'0'}} >  
          <CSSTransition
            in={inProp}
            classNames="transitio"
            timeout={400}
          >
            <div id='chatW' style={{padding:'0rem', borderWidth:'0rem'}}>
              {item}
            </div>
          </CSSTransition>

        </div>
        <div style={{zIndex:'10',position:'absolute',bottom:'2em',left:'2em'}}>
          <div style={{
            borderRadius:'8px 0px 0px 4px', 
            fontSize:'1.2em',
            float:'left',
            display:'inline',
            fontWeight:'700', 
            color:'#e5ddcc',
            whiteSpace: 'nowrap',
            backgroundColor:'rgba(0,0,0,0.7)',
            padding:'0.2em 0.5em 0.2em 0.5em',
            textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
          }}>{props.user.username} is logged in </div>
          <div style={{float:'left',display:'inline'}}>
            <Button style={{
              border: '1px solid #b29966',
              color:'#b29966', 
              backgroundColor:'black',
              fontSize:'1.1em',
              marginLeft:'0em',
              borderRadius:'2px',
              padding:'0.3em 0.4em 0.3em 0.4em'
            }} onClick={handleLogout}>logout</Button>
          </div>
        </div>
        <div style={{
          lineHeight:'1.1em',
          fontSize:'1.1em',
          textAlign:'center', 
          position:'absolute',
          zIndex:'10',
          bottom:'2em',
          right:'2em',
          padding:'0.3em 0.6em 0.3em 0.6em',
          fontWeight:'500',
          border:'solid 2px #665533', 
          color:'#b29966',
          whiteSpace: 'nowrap',
          backgroundColor:'rgba(0,0,0,0.7)',
          textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
        }}>
          <span style={{
            fontWeight:'400',
            color:'#e5ddcc',
            textAlign:'center', 
            borderBottom:'1px solid #b29966'
          }}>connected users</span>
          <ul style={{fontWeight:'400',
            listStyleType:'none',
            marginTop:'0',
            marginBottom:'0',
            padding:'0.2em 0 0 0'
          }}>
            {props.connectedUsers.map((e,i) => <li style={{flex:'right'}} key={i}>{e}</li>)}
          </ul>
        </div>
      </div>
    )
  return <div></div> 
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    user: state.loggedUser,
    channel: state.channel,
    connectedUsers: state.connectedUsers
  }
}
export default connect(mapStateToProps,{ initializeMessages, clearUser })(Chat)
