import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import messageReducer from './reducers/messageReducer'
import loggedUserReducer from './reducers/loggedUserReducer'
import channelsReducer from './reducers/channelsReducer'
import selectedChannelReducer from './reducers/selectedChannelReducer'
import usersReducer from './reducers/usersReducer'
import io from 'socket.io-client'

const createMySocketMiddleware = (url) => {
	return storeAPI => {
		const socket = io(url)
		socket.on('message', (data) => {
			console.log(storeAPI.getState())
			if(storeAPI.getState().channel.id === data.channelID) {
				console.log('MIDDLEWARE DATA:',data)
				storeAPI.dispatch({
					type : 'SOCKET_MESSAGE_RECEIVED',
					data : { channel: data.channelID,
						messages: data.messages }
				})
			}
		})
		socket.on('channel', data => {
			console.log(data,'XXX', storeAPI.getState())
			if(data.users.find(u => u === storeAPI.getState().loggedUser.userId)){
				console.log('hiphei')
				storeAPI.dispatch({
					type: 'SOCKET_ADD_CHANNEL',
					data
				})
			}
		})

		return next => action => {
			if(action.type === 'SEND_WEBSOCKET_MESSAGE' ||
                action.type === 'CREATE_CHANNEL') {
				console.log('EMIT FROM MIDDLEWARE',action)
				socket.emit('action',action)
				return
			}
			return next(action)
		}
	}
}

const reducer = combineReducers({
	messages: messageReducer,
	loggedUser: loggedUserReducer,
	channels: channelsReducer,
	channel: selectedChannelReducer,
	users: usersReducer
})

const store = createStore(reducer,
	composeWithDevTools(
		applyMiddleware(thunk,createMySocketMiddleware('http://localhost:3003'))
	)
)

const render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('root')
	)
}

render()
store.subscribe(render)
