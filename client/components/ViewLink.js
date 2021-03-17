import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Comments from './Comments.js'

export default function ViewLink({ match, history }) {
  const linkId = match.params.linkId
  const folderId = match.params.folderId
  const [linkData, updateLinkData] = useState({})
  const [loading, updateLoading] = useState(true)

  const [linkDataTags, updateLinkDataTags] = useState({})

  const token = localStorage.getItem('token')

  useEffect(() => {
    async function getLink() {
      try {
        const { data } = await axios.get(`/api/folders/${folderId}/links/${linkId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        updateLinkData(data)
        console.log(data.tags)
        updateLinkDataTags(data.tags)
        updateLoading(false)
        // console.log('show me the link data')
        // console.log(linkData)

      } catch (err) {
        console.log(err)
      }
    }
    getLink()
  }, [])

  if (loading) {
    return <div className='loading'>
      <img src='https://i.ibb.co/xDS2vQc/loading.gif' id="loader-folder-overview" />
    </div>
  }

  return <div className="columns">
    <div className="container is-centered">



      <article className="panel" id="panel-update-folder">
        <section>
          <Link to={{ pathname: `${linkData.url}` }} target="_blank"><h3 className="title is-3 panel-heading" id="h3-update-folder">{linkData.name}</h3></Link>
          <div id="textbox-link-overview">
            <h2 className="subtitle"> <strong>Description: </strong>{linkData.description}</h2>
         
            {/* Add image link */}

            <h2 className="subtitle"><strong>Importance: </strong>{linkData.importance}</h2>
            <h2 className="subtitle"><strong>Tags: </strong>



              {linkDataTags.map((tag, index) => {
                return <span key={index}>
                  <button className="button">{tag.name} </button>
                </span>
              })}



            </h2>
 
            <Comments linkId={linkId} folderId={folderId}
            />

          </div>
        </section>
      </article>

    </div>
  </div>







}