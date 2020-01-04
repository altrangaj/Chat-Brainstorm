import React from 'react'
import { Container } from 'semantic-ui-react'
import Login from './components/Login'
import Chat from './components/Chat'


const App = () => (
  <Container  style={{width:'100%',height:'100vh'}}>
    <Login />
    <Chat />
  </Container>
)

export default App