import React,{useState} from 'react'
import {Switch,Route,Redirect, HashRouter} from 'react-router-dom'
import {GlobalContext} from './contexts/globalContext'
import SignIn from './components/SignIn/signIn'
import SignUp from './components/SignUp/signUp'
import Dashboard from './components/Dashboard/dashboard'
import AddFriend from './components/AddFriend/addFriend'

function App() {

  let auxuser = JSON.parse(sessionStorage.getItem('user'))
  const [user,setUser] = useState(auxuser?auxuser:{})

  const globalState = {
    loggedUser : [user,setUser]
  }

  return (
    <>

      <GlobalContext.Provider value={globalState}>
      <HashRouter>
      
      <Switch>
          <Route  exact path="/login" component={SignIn}/>
          <Route  exact path="/signup" component={SignUp}/>
          <Route  exact path="/dashboard" component={Dashboard}/>
          <Route  exact path="/addFriend" component={AddFriend}/>
          <Redirect from="/" to="/login" />
      </Switch>
      
      </HashRouter>
      </GlobalContext.Provider>

    </>
  )

}

export default App;
