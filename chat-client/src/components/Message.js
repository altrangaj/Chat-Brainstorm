import React from 'react'


const Message = (props) => {

	const name = props.message.split(':',1)
	const msg = props.message.replace(name + ':', '')
	let style = {marginBottom:'1rem', marginLeft:'0px', padding:'8px', backgroundColor:'#020231'}

	if(props.user == name){
		style.textAlign = 'right'
	}


	return (
		<div style={style}>
			<span style={{color:'red'}}>{name}</span><br/>
			{msg}
		</div>
	)
}
export default Message
