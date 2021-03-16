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
      <img src='https://i.ibb.co/xDS2vQc/loading.gif' />
    </div>
  }

  return <div>

    <h1>This is workspace</h1>

   


    <div className="container">
      <div className="columns is-multiline is-mobile">
        {folders.map((folder, index) => {
          return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">
            <Link to={`/folders/${folder.id}`}>
              <div className="card">
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">{folder.name}</p>
                      {<Link to={`/folders/edit-folder/${folder.id}`} className="button" id="reg-log-button">
                        Edit
                      </Link>}
                      {<Link to={`/folders/${folder.id}/links/new-link`} className="button">
                        Add link
                      </Link>}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        })}
        <div className="column is-one-third-desktop is-half-tablet is-half-mobile">
          <Link to={'/folders/new-folder'}>
            <div className="card">
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">Add a new folder</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <Link to={'/test/make-link'} className="button is-primary is-light mb-2">Test create a link</Link>
    </div>
  </div>

}