import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getLoggedInUserId } from '../lib/auth'



export default function FolderOverview({ history, match }) {
  const folderId = match.params.folderId
  console.log('folderId', folderId)
  const [links, updateLinks] = useState([])
  const [folderName, updateFolderName] = useState([])
  const [loading, updateLoading] = useState(true)
  const [tagsNames, updateTagsNames] = useState([])
  const [loadingTags, updateLoadingTags] = useState(true)

  const [filteredTags, updateFilteredTags] = useState([])
  const [permanentData, updatePermanentData] = useState([])




  const loggedIn = getLoggedInUserId()
  const token = localStorage.getItem('token')


  useEffect(() => {

    fetchData()

  }, [])

  async function fetchData() {


    try {
      const { data } = await axios.get(`/api/folders/${folderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (data) {
        console.log('data.links', data.links)
        updateLinks(data.links)
        updatePermanentData(data.links)
        updateFolderName(data.name)
        updateLoading(false)
      }
    } catch (err) {
      console.log(err)
    }

  }



  useEffect(() => {
    async function fetchTagsNames() {


      try {
        const { data } = await axios.get(`/api/folders/${folderId}/tags`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (data) {

          console.log('fetch tags data', data)
          updateTagsNames(data)
          updateLoadingTags(false)
          console.log('second fetch tags data', data)
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchTagsNames()
  }, [])

  function filteringData(event) {

    const tagName = event

    console.log('tagName', tagName)

    // console.log('event.target', event.target)

    // console.log('event.target.innerHTML', event.target.innerHTML)
    if (tagName === 'All') {
      updateLinks(permanentData)
    } else {
      const filteredLinks = []

      permanentData.forEach(link => {
        link.tags.forEach(tag => {
          if (tag.name === tagName) {
            filteredLinks.push(link)
          }
        })
      })

      console.log('filtered links', filteredLinks)
      updateLinks(filteredLinks)

    }


  }

  console.log('filtered tags', filteredTags)




  // function filteringData(tag) {
  //   updateFilteredStateChange(tag)
  //   fetchData()
  // }

  if (loading) {
    return <div className='loading'>
      <img src='https://i.ibb.co/xDS2vQc/loading.gif' id="loader-folder-overview" />
    </div>
  }
  if (loadingTags) {
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
              <div className="text-background-folder-name">{folderName}</div>
              <ul>
                <li><div className="button" onClick={(event) => filteringData(event.target.innerHTML)}>All</div></li>
                {tagsNames.map((tag, index) => {
                  return <span key={index}>
                    <li><div className="button" value={tag.name} onClick={(event) => filteringData(event.target.innerHTML)}>{tag.name}</div></li>
                  </span>
                })}
              </ul>
            </li>

          </ul>

        </aside>
      </div>
    </section>




    <section id="right-side-folder-layout">

      {links.map((link, index) => {
        return <div key={index} className="column is-four-fifths-desktop is-four-fifths-tablet is-half-mobile">
          {/* <Link to={`/folders/${folderId}/links/${link.id}`}> */}
          <div className="card">
            <div className="card-content">
              <div className="media">
                <div className="media-content" >
                  <div id="folder-overview-card">
                    <Link to={`/folders/${folderId}/links/${link.id}`} className="title is-4">{link.name}</Link>
                    {/* <p className="title is-4">{link.name}</p> */}
                    <span>
                      {<Link to={`/folders/edit-folder/${link.id}`} className="button" id="reg-log-button">
                        Edit</Link>}
                    </span>
                  </div>
                  <div id="comments">
                    Importance: <strong> {link.importance}</strong>
                  </div>

                </div>
              </div>
            </div>
          </div>
          {/* </Link> */}
        </div>
      })}





    </section>
  </div>

}