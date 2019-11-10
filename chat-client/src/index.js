import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers/messageReducer'
import io from 'socket.io-client'



const createMySocketMiddleware = (url) => {
    return storeAPI => {
        const socket = io(url)

        socket.on("message", (message) => {
            storeAPI.dispatch({
                type : "SOCKET_MESSAGE_RECEIVED",
                data : message
			});
        });

        return next => action => {
            if(action.type === "SEND_WEBSOCKET_MESSAGE") {
				console.log(action)
                socket.emit('action',action)
                return
            }

            return next(action)
        }
    }
}
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
