import React, { useState, useEffect } from 'react'
import { initializeMessages } from '../reducers/messageReducer'
import { connect } from 'react-redux'
import ChatWindow from './ChatWindow'
import CreateChannelForm from './CreateChannelForm'
import DnDContainer from './DnDContainer'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { clearUser } from '../reducers/loggedUserReducer'
import ChannelName from './ChannelName'
import { Segment } from 'semantic-ui-react'
import Clock from './Clock'
import { useTransition, animated } from 'react-spring'
import { CSSTransition } from 'react-transition-group'
import './Chat.css'

const Chat = (props) => {
  
  const [chat, setChat] = useState(true)
  const [inProp, setInProp] = useState(false)
  const [item, setItem] = useState(null)
  const [user, setUser] = useState({})
  const [connected, setConnected] = useState([])
	
  useEffect(() => {
    if(!props.user) setUser({})
    else setUser(props.user)
  },[props.user])

  useEffect(() => {
    setConnected(props.connectedUsers)
  },[props.connectedUsers])

  if(!item) setTimeout(()=>setItem(() => <ChatWindow setChat={setChat} setIn={setInProp}/>),500)

  useEffect(() => {
    setInProp(false)
    if(chat) setTimeout(()=>setItem(() => <ChatWindow setChat={setChat} setIn={setInProp}/>),500)
    else setTimeout(()=>setItem(() => <CreateChannelForm setChat={setChat} setIn={setInProp} />),500)
  },[chat])
	
  const transitions = useTransition(props.user, null, {
    from: { transform: 'scaleX(0)' },
    enter: { transform: 'scaleX(1)' },
    leave: { transform: 'scaleX(0)' },
    config: {duration:350}
  })

  const dnd = () => (
    <DndProvider backend={HTML5Backend}>
      <DnDContainer/>
    </DndProvider>
  )

  const handleLogout = async (event) => {
    event.preventDefault()
    document.getElementById('root').style.backgroundPositionX = '0px'
    document.getElementById('root').style.backgroundPositionY = '0px'
    document.getElementById('bg').style.backgroundPositionX = '0px'
    document.getElementById('bg').style.backgroundPositionY = '0px'
    setItem(null)
    setInProp(false)
    props.clearUser(props.user)
  }

  return (
    <div>
      <Segment  style={{margin:'0',padding:'0',backgroundColor:'transparent'}} placeholder >
        {props.channel && dnd()}
      </Segment>
      <div style={{position:'absolute',top:'3em',left:'33%'}}>	
        { props.channel && <span style={{fontWeight:'bold', color:'#d4c6aa'}}>
          <ChannelName/>
        </span> }
      </div>
      {transitions.map(({ item, key, props }) =>
        item && <animated.div key={key} style={{...props,zIndex:'10',position:'absolute',top:'3em',left:'3em'}}>
          <div style={{
            paddingTop:'0.16em', 
            fontFamily: 'Cinzel, serif',
            fontSize: '2.6em', 
            fontWeight:'700',
            textAlign:'left',
            color:'#b29966',
            textShadow: '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black'
          }} ><Clock/></div>
        </animated.div> )}
      {props.user && <div style={{ zIndex:'10',position:'absolute',top:'3em',right:'3em',minWidth:'22rem', width:'25vw',paddingRight:'0'}} >  
        <CSSTransition
          in={inProp}
          classNames="transitio"
          timeout={550}
        >
          <div id='chatW' style={{padding:'0rem', borderWidth:'0rem'}}>
            {item}
          </div>
        </CSSTransition>
      </div>}
      {transitions.map(({ item, key, props }) =>
        item && <animated.div key={key} style={{...props,zIndex:'10',position:'absolute',bottom:'3em',left:'3em'}}>
          <div style={{
            borderRadius:'2px 0px 0px 2px', 
            fontSize:'1.2em',
            float:'left',
            display:'inline',
            fontWeight:'700', 
            color:'#e5ddcc',
            whiteSpace: 'nowrap',
            backgroundColor:'rgba(0,0,0,0.7)',
            marginTop:'1px',
            padding:'0.15em 0.5em 0.2em 0.35em',
            textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
          }}>{user.username} is logged in </div>
          <div style={{float:'left',display:'inline'}}>
            <button style={{
              cursor: 'pointer',
              border: '1px solid #665533',
              color:'#b29966', 
              backgroundColor:'black',
              fontSize:'1.1em',
              marginLeft:'0em',
              borderRadius:'2px',
              fontFamily: 'Lato,Helvetica Neue,Arial,Helvetica,sans-serif',
              fontWeight:'700',
              padding:'0.25em 0.4em 0.25em 0.4em'
            }} onClick={handleLogout}>logout</button>
          </div>
        </animated.div>)}
      {transitions.map(({ item, key, props }) =>
        item && <animated.div key={key} style={{...props,
          lineHeight:'1.1em',
          fontSize:'1.1em',
          textAlign:'center', 
          position:'absolute',
          zIndex:'10',
          bottom:'3em',
          right:'3em',
          padding:'0.3em 0.6em 0.3em 0.6em',
          fontWeight:'500',
          border:'solid 1px #665533', 
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
            {connected.map((e,i) => <li style={{flex:'right'}} key={i}>{e}</li>)}
          </ul>
        </animated.div>)}
    </div>
  )
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
