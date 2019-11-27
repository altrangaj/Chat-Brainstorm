import React from 'react'


const Message = (props) => {

	const name = props.message.split(':',1)
	const msg = props.message.replace(name + ':', '')
	let style = {marginRight:'0.7rem',marginLeft:'0.3rem',marginBottom:'0.5rem',backgroundColor:'transparent', display:'inline-block', float:'left'}

	if(props.user == name){
		style.textAlign = 'right'
		style.float = 'right'

	}

//border:'1px solid #b3d9ff', 
	return (
		<div>
			<div style={{clear:'left'}}></div>
			<div style={style}>
				<span style={{color:'white'}}>{name}</span><br/>
				<div style={{padding:'8px',borderRadius:'6px',backgroundColor:'rgba(5, 5, 5,0.5)'}}>
					{msg}
				</div>
			</div>
			<div style={{clear:'right'}}></div>
		</div>
	)
}
export default Message
