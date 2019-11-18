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
import noteReducer from './reducers/noteReducer'
import io from 'socket.io-client'

const createMySocketMiddleware = () => {
	return storeAPI => {
		let socket = io('ws://localhost:3003')
		
		socket.on('reconnect_attempt', () => {
			socket.io.opts.query = {
				token: storeAPI.getState().loggedUser.token
			}
		})
		socket.on('message', (data) => {
			if(storeAPI.getState().channel.id === data.channelID) {
				storeAPI.dispatch({
					type : 'SOCKET_MESSAGE_RECEIVED',
					data : { channel: data.channelID, messages: data.messages }
				})
			}
		})
		socket.on('add_note', (data) => {
			if(storeAPI.getState().channel.id === data.channelID) {
				storeAPI.dispatch({
					type : 'SOCKET_ADD_NOTE',
					data : data.note
				})
			}
		})
		socket.on('delete_note', (data) => {
			if(storeAPI.getState().channel.id === data.channelID) {
				storeAPI.dispatch({
					type : 'SOCKET_DELETE_NOTE',
					data : data.noteID
				})
			}
		})
		socket.on('set_note', (data) => {
			if(storeAPI.getState().channel.id === data.channelID) {
				storeAPI.dispatch({
					type : 'SOCKET_SET_NOTE',
					data : data.note
				})
			}
		})
		socket.on('channel', data => {
			if(data.users.find(u => u === storeAPI.getState().loggedUser.userId)){
				storeAPI.dispatch({
					type: 'SOCKET_ADD_CHANNEL',
					data
				})
			}
		})

		return next => action => {
			if( action.type === 'SEND_WEBSOCKET_MESSAGE' ||
				action.type === 'CREATE_CHANNEL' ||
				action.type === 'ADD_NOTE' ||
				action.type === 'SET_NOTE' ||
				action.type === 'DELETE_NOTE') {

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
	users: usersReducer,
	notes: noteReducer
})

const store = createStore(reducer,
	composeWithDevTools(
		applyMiddleware(thunk,createMySocketMiddleware())
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
