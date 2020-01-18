import React from 'react'
import FocusScrollable from './FocusScrollable'
import MessageForm from './MessageForm'
import DropDownContainer from './DropDownContainer'
import { connect } from 'react-redux'


const ChatWindow = (props) => {
  props.setIn(true)

  const handle = () => {	
    props.setChat(false)
  }
  return (
    <div>
      <div style={{backgroundColor: 'black',color:'white',borderBottom:'1px solid #443922'}}>
        <table style={{width:'100%', borderTop:'1px solid #443922'}}>
          <tbody>
            <tr >
              <td style={{paddingLeft:'0.6em',fontSize:'1.2em',fontWeight:'bold',paddingBottom:'0em', width:'50%'}}>
                <div style={{
                  fontFamily: 'Abhaya Libre, serif',
                  fontWeight:'800',
                  baddingBottom:'0px', 
                  marginBottom:'-0.2em',
                  color:'#e9d396'}}>
									CHANNEL 
                </div>
              </td>
              <td style={{
                whiteSpace: 'nowrap', 
                width:'50%',
                marginRight:'0%', 
                paddingRight:'0px', 
                borderRight:'0px', 
                textAlign:'right'}}>
                <div style={{
                  color:'#d4c6aa',
                  fontSize:'1.3em',
                  fontFamily: 'Abhaya Libre, serif',
                  fontWeight:'700',
                  baddingBottom:'0px', 
                  whiteSpace: 'nowrap', 
                  display:'inline'}}>
                  create new channel
                </div>
                <div style={{marginLeft:'0.5em', display:'inline'}}>
                  <button style={{
                    cursor: 'pointer',
                    border: '1px solid #887144',
                    color:'#b29966', 
                    backgroundColor:'black', 
                    fontFamily: 'Lato,Helvetica Neue,Arial,Helvetica,sans-serif', 
                    fontWeight:'700'}}  onClick={handle}>create</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <DropDownContainer user={props.user} />
      <FocusScrollable/>
      <MessageForm />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.loggedUser
  }
}
export default connect(mapStateToProps)(ChatWindow)