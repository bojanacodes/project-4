import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getLoggedInUserId } from '../lib/auth'



export default function FolderOverview({ history, match }) {
  const folderId = match.params.folderId
  console.log(folderId)
  const [links, updateLinks] = useState([])
  const [folderName, updateFolderName] = useState([])
  const [loading, updateLoading] = useState(true)


  const loggedIn = getLoggedInUserId()
  const token = localStorage.getItem('token')


  useEffect(() => {
    async function fetchData() {


      try {
        const { data } = await axios.get(`/api/folders/${folderId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (data) {
          console.log(data.links)
          updateLinks(data.links)
          updateLoading(false)


        }
      } catch (err) {
        console.log(err)
      }

    }
    fetchData()

    async function fetchFolderName() {


      try {
        const { data } = await axios.get(`/api/folders/${folderId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (data) {
          console.log(data.name)
          updateFolderName(data.name)



        }
      } catch (err) {
        console.log(err)
      }

    }
    fetchFolderName()
  }, [])
  if (loading) {
    return <div className='loading'>
      <img src='https://i.ibb.co/xDS2vQc/loading.gif' id="loader-folder-overview" />
    </div>
  }


  return <div id="folder-overview-flexbox">

    <section id="left-side-folder-layout">
      <div>
        <aside className="menu">

          {/* <p className="menu-label">
          Available folders
        </p> */}
          <ul className="menu-list">

            <li>
              <a className="text-background-folder-name">{folderName}</a>
              <ul>
                <li><a>Members</a></li>
                <li><a>Plugins</a></li>
                <li><a>Add a member</a></li>
              </ul>
            </li>

          </ul>

        </aside>
      </div>
    </section>




    <section id="right-side-folder-layout">

      {links.map((link, index) => {
        return <div key={index} className="column is-four-fifths-desktop is-four-fifths-tablet is-half-mobile">
          <Link to={`/folders/${folderId}/links/${link.id}`}>
            <div className="card">
              <div className="card-content">
                <div className="media">
                  <div className="media-content" >
                    <div id="folder-overview-card">
                      <p className="title is-4">{link.name}</p>
                      <span>
                        {<Link to={`/folders/edit-folder/${link.id}`} className="button" id="reg-log-button">
                          Edit
                      </Link>}
                      </span>
                    </div>
                    <div id="comments">
                      Importance: <strong> {link.importance}</strong>
                     
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      })}





    </section>
  </div>

}