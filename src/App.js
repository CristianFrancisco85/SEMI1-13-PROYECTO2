import React,{useState} from 'react'
import {Switch,Route,Redirect, HashRouter} from 'react-router-dom'
import {GlobalContext} from './contexts/globalContext'
import SignIn from './components/SignIn/signIn'
import SignUp from './components/SignUp/signUp'
import Dashboard from './components/Dashboard/dashboard'
import AddFriend from './components/AddFriend/addFriend'
import { BadAuthError } from './pages/badAuth'
import Chat from './components/Chat/chat'
import { socket, SocketContext } from './contexts/sockets'

function App() {

  let auxuser = JSON.parse(sessionStorage.getItem('user'))
  const [user,setUser] = useState(auxuser?auxuser:{})

  const globalState = {
    loggedUser : [user,setUser]
  }

  return (
    <>

      <GlobalContext.Provider value={globalState}>
      <SocketContext.Provider value={socket}>
      <HashRouter>
      
      <Switch>
          <Route  exact path="/login" component={SignIn}/>
          <Route  exact path="/signup" component={SignUp}/>
          <Route  exact path="/dashboard" component={Dashboard}/>
          <Route  exact path="/dashboard/addFriend" component={AddFriend}/>
          <Route  exact path="/dashboard/chat" component={Chat}/>
          <Route  exact path="/badAuth" component={BadAuthError}/>
          <Redirect from="/" to="/login" />
      </Switch>
      
      </HashRouter>
      </SocketContext.Provider>
      </GlobalContext.Provider>

    </>
  )

}

export default App;
