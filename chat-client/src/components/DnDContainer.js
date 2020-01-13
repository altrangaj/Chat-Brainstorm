import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useDrop } from 'react-dnd'
import Note from './Note'
import {addNote, setNote, deleteNote} from '../reducers/noteReducer'
import { connect } from 'react-redux'
import map from './noteColors'
import 'react-tippy/dist/tippy.css'
import { Tooltip } from 'react-tippy'
import './DnD.css'


const DnDContainer = (props) => {
        
  const [menu, setMenu] = useState({visible: false}) 
  const [menu2, setMenu2] = useState({visible: false})
  const [pos, setPos] = useState({left:'0px',top:'0px'})
  const [open, setOpen] = useState(undefined)
  const [zIndex, setZIndex] = useState('5')
    


  const [, drop] = useDrop({
    accept: 'note',
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset()
      const left = Math.round(item.left + delta.x)
      const top = Math.round(item.top + delta.y)
      moveNote(item.id, left, top)
      return undefined
    },
  })

  const moveNote = (id, left, top) => {
    const note= props.notes.find(n => n.id === id)
    props.setNote({...note, top: top, left:left}, props.channel.id, props.user)
		
  }
  const handleContextMenu = (event) => {
    event.preventDefault()
    if(menu.visible || menu2.visible){
      setMenu2({visible: false})
      setMenu({visible: false})
      return
    }
    if(event.target.id === 'dnd'){
      let top = event.nativeEvent.offsetY - document.getElementById('wa').offsetHeight
      setMenu({visible: true, style:{zIndex:1000,position: 'absolute', left:event.nativeEvent.offsetX, top}})
      setMenu2({visible: false})
    } else if(event.nativeEvent.target.className !== 'txt-mesta' && event.nativeEvent.target.id !== 'wa') {
      handleContextMenu2(event)
    }
  }
  const handleContextMenu2 = (event) => {

    const left = Number(event.target.offsetParent.style.left.replace('px','')) + Number(event.nativeEvent.offsetX)
    const top = Number(event.target.offsetParent.style.top.replace('px','')) - Number(event.nativeEvent.offsetY)
 
    setMenu2({visible: true, id: event.nativeEvent.target.offsetParent.id, style:{position: 'absolute', left:left, top:top, zIndex:1000}})
    setMenu({visible: false})
  }
  const handleItemClick = (e) => {
    e.preventDefault()
    const date = new Date()
    let top = menu.style.top + document.getElementById('wa').offsetHeight
    props.addNote({left: menu.style.left, top, backgroundColor:'#ffffcc', date: new Date(date.getTime()-date.getTimezoneOffset()*60*1000), author: props.user.username}, props.channel.id, props.user)
    setOpen(false)
    setMenu({visible: false})
  }
  const handleDelete = (e) => {
    e.preventDefault()
    props.deleteNote(menu2.id, props.channel.id, props.user)
  }
  const setColor = (e) => {
    e.preventDefault()
    const note= props.notes.find(n => n.id === menu2.id)
    props.setNote({...note, backgroundColor: e.nativeEvent.target.id}, props.channel.id, props.user)
    hideMenus()
  }
  const contextMenu2 = () => (
    <div className='menu' style={{...menu2.style, width:'9rem'}}>
      <ul className="menu-options">
        <li className="menu-option" onClick={handleDelete}>delete note</li>
        <li className="menu-option">
        
          <div className='dropdown'>
        set color
            <div className="dropdown-content">
              <table style={{width:'6em', padding:'0.2em',background:'black',border:'solid 1px #665533'}}>
                <tbody>
                  <tr>
                    <td><button id='#ffffcc' onClick={setColor} style={{cursor: 'pointer',backgroundColor:map.get('#ffffcc').background, width:'20px',height:'20px'}}></button></td>
                    <td><button id='#ffcccc' onClick={setColor} style={{cursor: 'pointer',backgroundColor:map.get('#ffcccc').background, width:'20px',height:'20px'}}></button></td>
                    <td><button id='#ccffff' onClick={setColor} style={{cursor: 'pointer',backgroundColor:map.get('#ccffff').background, width:'20px',height:'20px'}}></button></td>
                  </tr>
                  <tr>
                    <td><button id='#99ffcc' onClick={setColor} style={{cursor: 'pointer',backgroundColor:map.get('#99ffcc').background, width:'20px',height:'20px'}}></button></td>
                    <td><button id='#ffccff' onClick={setColor} style={{cursor: 'pointer',backgroundColor:map.get('#ffccff').background, width:'20px',height:'20px'}}></button></td>
                    <td><button id='#80ffff' onClick={setColor} style={{cursor: 'pointer',backgroundColor:map.get('#80ffff').background, width:'20px',height:'20px'}}></button></td>
                  </tr>
                  <tr>
                    <td><button id='#ff99c2' onClick={setColor} style={{backgroundColor:map.get('#ff99c2').background, width:'20px',height:'20px'}}></button></td>
                    <td><button id='#99ff99' onClick={setColor} style={{backgroundColor:map.get('#99ff99').background, width:'20px',height:'20px'}}></button></td>
                    <td><button id='#ff99ff' onClick={setColor} style={{backgroundColor:map.get('#ff99ff').background, width:'20px',height:'20px'}}></button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </li>
      </ul>
    </div> 
  )
  const contextMenu = () => (
    <div className='menu'  style={{...menu.style, width:'9rem'}}>
      <ul className="menu-options">
        <li className="menu-option" onClick={handleItemClick}>
   add note
        </li>
      </ul>
    </div> 
  )
  const hideMenus = () => {
    setMenu({visible: false})
    setMenu2({visible: false})
    setOpen(false)
  }
  let offsetX, offsetY
  let moveContent = false
	
  const move = e => {
    if(e.target.className === 'txt-mesta' || e.target.className === 'note' || e.target.className === 'noteHeader') {
      setOpen(false)
    }
		
    if(moveContent && e.target.className !== 'note') {
      document.getElementById('dndWrapper').style.left = `${e.pageX-offsetX}px`
      document.getElementById('dndWrapper').style.top = `${e.pageY-offsetY}px`

      document.getElementById('root').style.backgroundPositionX = 0.5*(e.pageX-offsetX) + 'px'
      document.getElementById('root').style.backgroundPositionY = 0.5*(e.pageY-offsetY) + 'px'
      document.getElementById('fg2').style.backgroundPositionX = 0.25*(e.pageX-offsetX) + 'px'
      document.getElementById('fg2').style.backgroundPositionY = 0.25*(e.pageY-offsetY) + 'px'
    }
  }
  
  const start = e => {
    if(e.target.className === 'dndC'){
      moveContent = true
      offsetX = e.clientX - Number(pos.left.replace('px',''))
      offsetY = e.clientY - Number(pos.top.replace('px',''))
    }
  }
  const stop = e => {
    moveContent = false
    if(e.target.className === 'dndC'){
      setPos({
        left : document.getElementById('dndWrapper').style.left ,
        top :  document.getElementById('dndWrapper').style.top
      })
      setZIndex('5')
    }
  }

  /*  TÄMÄ HÄSSÄKKÄ MUISTIVUOTOVAROITUKSEN TAKIA,
   *  JOTA AIHEUTTAA SETTIMEOUT-FUNKTIO
   */

  let timeoutid = useRef(-1)
  let o = useRef(true)

  const hideTip = useCallback(() => {
    clearTimeout(timeoutid.current)
    if(o.current)
      timeoutid.current = setTimeout(() => {
        setOpen(false)
      },2500)
  },[timeoutid])

  useEffect(() => {
    return () => {
      o.current = false
      hideTip()
    }
  }, [hideTip])

  /******************************************/

  const onpointerover = (e) => {
    if(e.target.id === 'dnd' && !open) {
      setOpen(true)
      return
    }
    setOpen(false)
  }
  const onpointerdown = e => {
    setOpen(false)
    if(e.target.id === 'dnd') setZIndex('2')
  }

  if(props.notes)
    return (
      <div  id='dndWrapper' onContextMenu={handleContextMenu}
        onPointerOver={onpointerover}
        onPointerDown={onpointerdown}
        onPointerOut={() => setOpen(false)}
        onClick={hideMenus}
        onMouseMove={move}
        onMouseDown={start}
        onMouseUp={stop}
        style={{...pos}}>
        <div className='hoverjuttu'>
          <div id='dnd2' className='dndC' style={{zIndex:'3'}} ></div>
          <Tooltip
            open={open}
            title='add note with the right mouse button'
            followCursor='true'
            theme='transparent'
            duration='800'
            onShown={hideTip}
          >
         
            <div ref={drop} id='dnd' className='dndC'
              style={{zIndex:zIndex}}
            >
              <div id='wa'>&nbsp;draggable working area</div>
              {menu.visible && contextMenu()}
              {menu2.visible && contextMenu2()}
              {props.notes.map((b,i) => (
                <Note
                  key={b.id}
                  id={b.id}
                  left={b.left}
                  top={b.top}
                  open={!open}
                  backgroundColor={b.backgroundColor}
                  author={b.author}
                  date={b.date}
                  content={b.content}
                  setOpen={setOpen}
                />
              ))}
            </div>
          </Tooltip>
        </div>
      </div>
    ) 
  return <div>odota</div>
}
const mapStateToProps = (state) => {
  return {
    user: state.loggedUser,
    channel: state.channel,
    notes: state.notes
  }
}
export default connect(mapStateToProps,{addNote, setNote, deleteNote})(DnDContainer)