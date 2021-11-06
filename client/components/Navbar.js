import { Link, withRouter } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { getLoggedInUserId } from '../lib/auth'
import axios from 'axios'

const NavBar = ({ history }) => {
  const [email, updateEmail] = useState('')
  const token = localStorage.getItem('token') 
  


  // ! handle logout does not work
  function handleLogout() {
   
   
    try {
      // console.log(localStorage)
      // const token = localStorage.getItem('token')
      // console.log('unicorn')
      // console.log(token)
      localStorage.clear()
      // localStorage.removeItem(token)
      // console.log(localStorage)
      updateEmail('')
      history.push('/login')
    } catch (err) {
      // ? Handle any error in here.
      console.log(err)
    }
  }

  const loggedIn = getLoggedInUserId()


  useEffect(() => {
    async function fetchData() {
      
      if (loggedIn) {
        try {
          const { data } = await axios.get('/api/profile', {
            headers: { Authorization: `Bearer ${token}` }
          })
          if (data) {
            // console.log('this is data.email ' + data)
            // console.log(data)
            updateEmail(data.email)
            // console.log('email')
            // console.log(email)
          }
        } catch (err) {
          console.log(err)
        }
      }
    }
    fetchData()
  }, [loggedIn])


  // console.log('this is it')
  // console.log('here' + loggedIn)
  return <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-menu is-active">
      <div className="navbar-start">
        <img className="navbar-logo" src="https://res.cloudinary.com/dm4usld2h/image/upload/v1616010974/logo_k93xtd.png" />
        <div className="navbar-item">
          <div className="buttons">
            {!loggedIn && <Link to="/" className="button" id="nav-left-buttons">
              Home
            </Link>}
            {loggedIn && <Link to="/Workspace" className="button" id="nav-left-buttons">
              My workspace
            </Link>}

          </div>
        </div>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            {!loggedIn && <Link to="/register" className="button" id="nav-right-buttons">
              Register
            </Link>}
            {!loggedIn && <Link to="/login" className="button" id="nav-right-buttons">
              Login
            </Link>}
            {loggedIn && <Link to={`/profile/${loggedIn}`} className="button" id="nav-right-buttons">
              {email}
            </Link>}
            {loggedIn && <button onClick={handleLogout} className="button" id="nav-right-buttons">
              Logout
            </button>}

          </div>
        </div>
      </div>
    </div>
  </nav>
}

export default withRouter(NavBar)