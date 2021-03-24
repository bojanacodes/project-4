import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getLoggedInUserId } from '../lib/auth'



export default function FolderOverview({ history, match }) {
  const folderId = match.params.folderId
  // console.log('folderId', folderId)
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
        // console.log('data.links', data.links)
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
          // console.log('second fetch tags data', data)
        }
      } catch (err) {
        console.log(err)
      }



    }
    fetchTagsNames()
  }, [])

  function filteringData(event) {

    const tagName = event

    // console.log('tagName', tagName)

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

      // console.log('filtered links', filteredLinks)
      updateLinks(filteredLinks)

    }
  }

  // console.log('filtered tags', filteredTags)

  function sortLinks() {

    const sortedArray = []

    // console.log('1', links)

    links.filter(item => {
      if (item.importance === 'High') {
        sortedArray.push(item)
      }
    })

    // console.log('High', sortedArray)

    links.filter(item => {
      if (item.importance === 'Medium') {
        sortedArray.push(item)
      }
    })

    // console.log('medium', sortedArray)

    links.filter(item => {
      if (item.importance === 'Low') {
        sortedArray.push(item)
      }
    })

    // console.log('low', sortedArray)

    links.filter(item => {
      if (item.importance === '') {
        sortedArray.push(item)
      }
    })

    // console.log('empty str', sortedArray)

    updateLinks(sortedArray)

  }





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
              <div className="title is-3 text-background-folder-name">{folderName}</div>
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




    <section id="middle-side-folder-layout">

      {/* <div className="title is-2">{folderName} links</div> */}


      <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <a href="#" id="breadcrumb-font">
              {/* <span className="icon is-small"> */}
              {/* <i className="fas fa-home" aria-hidden="true"></i> */}
              {/* </span> */}
              <div onClick={sortLinks}>Sort by importance</div>
            </a>
          </li>
          <li>
            <a href="#" id="breadcrumb-font">
              {/* <span className="icon is-small"> */}
              {/* <i className="fas fa-book" aria-hidden="true"></i> */}
              {/* </span> */}
              <div onClick={() => filteringData('All')}>Sort by date added</div>
            </a>
          </li>
          <li>
            <a href="#" id="breadcrumb-font">
              {/* <span className="icon is-small"> */}
              {/* <i className="fas fa-book" aria-hidden="true"></i> */}
              {/* </span> */}

            </a>
          </li>


        </ul>
      </nav>

      {links.map((link, index) => {
        return <div key={index} className="column is-full-desktop is-four-fifths-tablet is-half-mobile">
          <Link to={`/folders/${folderId}/links/${link.id}`}>
            <div className="card">
              <div className="card-content" id="folder-overview-link-cards">
                <div className="media">
                  <div className="media-content" >
                    <div id="folder-overview-card">
                      <h4 className="title is-4">{link.name}</h4>
                      {/* <p className="title is-4">{link.name}</p> */}
                      <span>
                        {<Link to={`/folders/${folderId}/links/${link.id}/edit`} className="button" id="reg-log-button">
                          Edit</Link>}
                      </span>
                    </div>
                    <div id="link-card-text">
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

    <section id="right-side-folder-layout">
      <div id="link-wrapper">
        {<Link to={`/folders/${folderId}/links/new-link`} className="button" id="button-add-link">
          <img src='https://image.flaticon.com/icons/png/128/1828/1828926.png' id="add-link"></img> <p>   Add link</p>
        </Link>}
      </div>

      <div id="link-wrapper">
        {<Link to={`/folders/${folderId}/tags/new-tag`} className="button" id="button-add-tag">
          <img src='https://image.flaticon.com/icons/png/128/1828/1828926.png' id="add-link"></img> <p>   Add tags</p>
        </Link>}
      </div>
    </section>

  </div>

}
