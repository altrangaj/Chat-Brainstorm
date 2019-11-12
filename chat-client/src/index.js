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
import io from 'socket.io-client'

const createMySocketMiddleware = (url) => {
    return storeAPI => {
        const socket = io(url)
        socket.on("message", (message) => {
            storeAPI.dispatch({
                type : "SOCKET_MESSAGE_RECEIVED",
                data : message
			})
        })
        return next => action => {
            if(action.type === "SEND_WEBSOCKET_MESSAGE") {
				console.log(action)
                socket.emit('action',action)
            }
            return next(action)
        }
    }
}

const reducer = combineReducers({
    messages: messageReducer,
    loggedUser: loggedUserReducer,
    channels: channelsReducer,
    channel: selectedChannelReducer
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
