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


      try {
        const { data } = await axios.get(`/api/folders/${folderId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (data) {
          console.log(data.links)
          updateLinks(data.links)
  


        }
      } catch (err) {
        console.log(err)
      }

    }
    fetchData()
  }, [])


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


    <section id="right">

      {links.map((link, index) => {
        return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">
          <Link to={`/folders/${folderId}/links/${link.id}`}>
            <div className="card">
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">{link.name}</p>
                    {<Link to={`/folders/edit-folder/${link.id}`} className="button" id="reg-log-button">
                      Edit
                      </Link>}
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