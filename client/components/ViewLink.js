import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function ViewLink({ match, history }) {
  const linkId = match.params.linkId
  const folderId = match.params.folderId
  const [linkData, updateLinkData] = useState({})

  const token = localStorage.getItem('token')

  useEffect(() => {
    async function getLink() {
      try {
        const { data } = await axios.get(`/api/folders/${folderId}/links/${linkId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        updateLinkData(data)
      } catch (err) {
        console.log(err)
      }
    }
    getLink()
  }, [])

  return <div className="columns">



    <div className="column">
    <Link to={`/folders/${folderId}/links/${linkId}/edit`}><h1 className="button">Edit link</h1></Link>

      <Link to={{ pathname: `${linkData.url}` }} target="_blank"><h1 className="title">{linkData.name}</h1></Link>
      <h2 className="subtitle">{`Description: ${linkData.description}`}</h2>

      {/* Add image link */}

    </div>

    <div className="column">
      <h2 className="subtitle">{`Importance: ${linkData.importance}`}</h2>
    </div>

  </div >






}