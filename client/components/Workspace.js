import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getLoggedInUserId } from '../lib/auth'
export default function Workspace() {
  const [folders, updateFolders] = useState([])


  const loggedIn = getLoggedInUserId()
  const token = localStorage.getItem('token')
  const [loading, updateLoading] = useState(true)

  
  useEffect(() => {
    async function getFolderData() {
      if (loggedIn) {
        try {
          const { data } = await axios.get('/api/folders', {
            headers: { Authorization: `Bearer ${token}` }
          })
          if (data) {
            updateFolders(data)
            updateLoading(false)
          }

        } catch (err) {
          console.log(err)
        }

      }
    }
    getFolderData()
  }, [])

  if (loading) {
    return <div className='loading'>
      <img src='https://i.ibb.co/xDS2vQc/loading.gif' id="loader-workspace" />
    </div>
  }

  return <div id="main-workspace-flexbox">

    <h1 className="title is-one" id="title-workspace">Welcome to your workspace</h1>




    <div className="container">
      <div className="columns is-multiline is-mobile">
        {folders.map((folder, index) => {
          return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">
            <Link to={`/folders/${folder.id}`}>
              <div className="card" id="cards-workspace">
                <div className="card-content">
                  <div className="media">
                    <div className="media-content" id="workspace-card-flexbox">
                      <p className="title is-4" id="workspace-cards-text">{folder.name}</p>
                      <span id="workspace-buttons-flexbox">
                        {<Link to={`/folders/edit-folder/${folder.id}`} className="button" id="workspace-button">
                          Edit 
                        </Link>}
                        {<Link to={`/folders/${folder.id}/links/new-link`} className="button" id="workspace-button">
                        Add a link
                        </Link>}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        })}
        <div className="column is-one-third-desktop is-half-tablet is-half-mobile">
          <Link to={'/folders/new-folder'}>
            <div className="card" id="cards-new-folder">
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                  <p className="title is-4">Add a new folder</p> <img src='https://image.flaticon.com/icons/png/128/1828/1828926.png' id="add-link"/>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

    </div>
  </div>

}