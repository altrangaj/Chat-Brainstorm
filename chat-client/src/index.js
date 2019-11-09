import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers/messageReducer'
//import createSocketIoMiddleware from 'redux-socket.io'
import io from 'socket.io-client'
//let socket = io('http://localhost:3003')

const createMySocketMiddleware = (url) => {
    return storeAPI => {
        const socket = io(url);

        socket.on("message", (message) => {
            storeAPI.dispatch({
                type : "SOCKET_MESSAGE_RECEIVED",
                data : message
			});
        });

        return next => action => {
            if(action.type === "SEND_WEBSOCKET_MESSAGE") {
				console.log(action)
                socket.emit('action',action.data);
                return;
            }

            return next(action);
        }
    }
}

//let socketIoMiddleware = createSocketIoMiddleware(socket, "SERVER/")

const store = createStore(reducer,
	composeWithDevTools(
		applyMiddleware(thunk,createMySocketMiddleware('http://localhost:3003'))
	)
)
//const store = applyMiddleware(createMySocketMiddleware)(createStore)(reducer)

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
