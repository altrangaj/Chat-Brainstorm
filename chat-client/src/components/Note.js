import React, { useState, useEffect } from 'react'
import { useDrag } from 'react-dnd'
import {setNote } from '../reducers/noteReducer'
import { connect } from 'react-redux'
import { useTransition, animated } from 'react-spring'
import 'react-tippy/dist/tippy.css'
import { Tooltip } from 'react-tippy'
import map from './noteColors'
import './Note.css'


const Note = (props) => {

  const [text, setText] = useState(props.content)
  const [pr, set] = useState(props)
  const [show, setShow] = useState(true)

  // onBlur ei toimi ilman tätä
  useEffect(() => {
    setText(props.content)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.content])

  useEffect(() => {
    set(props)
  }, [props])

  useEffect(() => {
    return () => {setShow(false)}
  }, [props.channel])

  const onChange = (event) => {
    setText(event.target.value)
  }

  const transitions = useTransition(show, null, {
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0)' },
    config: { mass: 1.2, tension: 280, friction: 18, precision:0.005 }
  })

  const [{ isDragging }, drag] = useDrag({
    item: { id:props.id, left:props.left, top:props.top, type: 'note' },
    collect: monitor => {
      return {isDragging: monitor.isDragging()}
    },
  })
  if (isDragging) {
    return <div ref={drag} />
  }
	
  const updateText = async (Id) => {
    const note= props.notes.find(n => n.id === Id)
    const date2 = new Date()
    if(note.content !== text)
      await props.setNote({...note, content:text, author:props.user.username, 
        date: new Date(date2.getTime()-date2.getTimezoneOffset()*60*1000).toISOString()}, props.channel.id, props.user)
  }

  const setDate = (date) => {
    if(date) return date.slice(8,10)+'.'+date.slice(5,7)+'. '+date.slice(11,16)
  }

  return transitions.map(({ item, key, props }) => (
    item && <animated.div key={key} className='note' ref={drag} id={pr.id} style={{left:pr.left,top:pr.top,...map.get(pr.backgroundColor),...props}}  >
      <Tooltip
        title='open Edit Note - menu with the right mouse button'
        followCursor='true'
        theme='transparent'
        duration='800'
        delay='300'
        trigger="mouseenter">
        <div className='noteHeader' style={{marginTop:'0px',marginBottom:'0px'}} >{pr.author} {setDate(pr.date)}</div>
      </Tooltip>
      <textarea className='txt-mesta' style={{
        textAlign:'center',
        border: '0px solid transparent',
        paddingLeft:'0.2em',
        fontSize: '1rem',
        lineHeight:'1.1rem',
        width:'100%', 
        height:'70%',
        ...map.get(pr.backgroundColor) }} 
      value={text} onChange={onChange}  onBlur={() => updateText(pr.id)} />
    </animated.div>)
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.loggedUser,
    channel: state.channel,
    notes: state.notes
  }
}

export default connect(mapStateToProps,{setNote})(Note)