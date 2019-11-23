import React, {useState, useEffect} from 'react'


const Clock = () => {

	const [time, setTime] = useState('')
	let timeoutId = -1

	useEffect(() => {
		updateTime()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const updateTime = () => {
		const date = new Date()
        // const localDate = new Date(date.getTime()-date.getTimezoneOffset()*60*1000)
        //jostain syystä tämä date onkin jo Suomiajassa
		clearTimeout(timeoutId)
		setTime(date.toString().slice(16,24))
		timeoutId=setTimeout(updateTime,1000)
	}

	return (
		<div>
			{time}
		</div>
	)
}
export default Clock