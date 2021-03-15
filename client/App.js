import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom'
import axios from 'axios'


//import stylesheets
import 'bulma'
import './styles/style.scss'


//import all the components here
import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import Workspace from './components/Workspace'

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register}/>
      <Route exact path="/workspace" component={Workspace}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/test/backend" component={TestBackend} />
    </Switch>
  </BrowserRouter>
)












const Home = () => <Link to={'/test/backend'}>
  Go to /hello/world page.
</Link>

// ! Just a little component to test that you can talk to your flask server, check if it
// ! works in network tab.
const TestBackend = () => {
  useEffect(() => {
    // ? This is going to try localhost:5000/api
    axios.get('/api')
      .then(({ data }) => console.log(data))
  }, [])

  return <p>
    Hello World
  </p>
}

export default App



