import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getLoggedInUserId } from '../lib/auth'



export default function FolderOverview({ history, match }) {
  const folderId = match.params.folderId
  console.log(folderId)
  const [links, updateLinks] = useState([])


  const loggedIn = getLoggedInUserId()
  const token = localStorage.getItem('token')


  useEffect(() => {
    async function fetchData() {
      
      if (loggedIn) {
        try {
          const { data } = await axios.get('/api/profile', {
            headers: { Authorization: `Bearer ${token}` }
          })
          if (data) {
            updateLinkas(data.email)
          }
        } catch (err) {
          console.log(err)
        }
      }
    }
    fetchData()
  }, [loggedIn])


  return <div>

    <section id="left">
      <aside className="menu">
        
        <p className="menu-label">
          Available folders
        </p>
        <ul className="menu-list">
          
          <li>
            <a className="is-active">Manage Your Team</a>
            <ul>
              <li><a>Members</a></li>
              <li><a>Plugins</a></li>
              <li><a>Add a member</a></li>
            </ul>
          </li>
          
        </ul>
        
      </aside>
    </section>


    <section id="right"></section>
  </div>

}