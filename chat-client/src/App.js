import React from 'react'
import { Container } from 'semantic-ui-react'
import Login from './components/Login'
import Chat from './components/Chat'


const App = () => (
	<Container  style={{width:'80%'}}>
		<Login />
		<Chat />
	</Container>
)

export default App