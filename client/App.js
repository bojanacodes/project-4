import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom'
import axios from 'axios'


//import stylesheets
import 'bulma'
import './styles/style.scss'


//import all the components here
import Home from './components/Home'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import Workspace from './components/Workspace'
import UserProfile from './components/UserProfile'
import CreateLink from './components/CreateLink'
import FolderOverview from './components/FolderOverview'
import ViewLink from './components/ViewLink'
import Comments from './components/Comments'

import UpdateFolder from './components/UpdateFolder'
import CreateFolder from './components/CreateFolder'

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/workspace" component={Workspace}/>
      <Route exact path="/profile/:userId" component={UserProfile} />
      <Route exact path="/folders/new-folder" component={CreateFolder}/>
      <Route exact path="/folders/edit-folder/:folderId" component={UpdateFolder}/>
      {/* <Route exact path="/newfolder" component={CreateFolder}/> */}
      <Route exact path="/folders/:folderId/links/new-link" component={CreateLink} />
      <Route exact path="/folders/:folderId" component={FolderOverview} />
      <Route exact path="/folders/:folderId/links/:linkId" component={ViewLink} />

      <Route exact path="/test-comments" component={Comments} />
    </Switch>
  </BrowserRouter>
)





export default App


{/* <Route exact path="/test/backend" component={TestBackend} /> */}
