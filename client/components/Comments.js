import { isCreator } from '../lib/auth'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getLoggedInUserId } from '../lib/auth'
import Moment from 'react-moment'

export default function Comments({ linkId, folderId }) {
  // const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [page, updatePage] = useState({})
  const token = localStorage.getItem('token')
  // const loggedIn = getLoggedInUserId()
  // const [editNumber, updateEditNumber] = useState(0)
  // const [commentIdentifier, updateCommentIdentifier] = useState('')

  useEffect(() => {
    async function fetchCommentData() {
      try {
        const { data } = await axios.get(`/api/folders/${folderId}/links/${linkId}`, {
          headers: { Authorization: `Bearer ${token}` }
        }

        )
        updatePage(data)
        console.log('this should be data')
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchCommentData()
  }, [content])


  async function handleComment() {
    const { data } = await axios.post(`/api/folders/${folderId}/links/${linkId}/comments`, { content }, {
      headers: { Authorization: `Bearer ${token}` }
    })

    // setTitle('')
    setContent('')
    // updatePage(data)

  }
  async function handleDeleteComment(commentId) {
    if (!isCreator) {
      return null
    }
    await axios.delete(`/api/folders/${folderId}/links/${linkId}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {

        console.log(resp.data)

      })
  }


  return <div>
    <div className="container is-centered" id="main-comment-box">
      <article className="panel" id="panel-update-folder">
        <h4 className="title is-4 panel-heading" id="comment-title">Share you what you think</h4>

        <div className="columns is-multiline is-centered" id="link-flexbox">
          {
            page.comments && page.comments.map((commenting, index) => {
              return <div key={index} className="media" >
                <div className="media-content" id="inside-comment-panel">
                  <div className="content">
                    <p className="subtitle">
                      {commenting.content}
                    </p>
                    <div>
                      <Moment format="YYYY/MM/DD">
                        {commenting.updated_at}
                      </Moment>

                    </div>

                  </div>

                  <div className="media-right">
                    <button
                      className="button is-danger"
                      onClick={() => handleDeleteComment(commenting.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>




            })
          }


          {<article className="media" id="submit-comment">
            <div className="media-content">
              <div className="field" >
                <p className="control">


                  <textarea
                    className="textarea"
                    placeholder="Share your comment..."
                    onChange={event => setContent(event.target.value)}
                    value={content}
                  >
                    {content}
                  </textarea>
                </p>
              </div>
              <div className="field">
                <p className="control">
                  {<button
                    onClick={handleComment}
                    className="button is-info"

                  >
                    Submit
                  </button>}

                </p>
              </div>
            </div>
          </article>}

        </div>

      </article>

    </div>


  </div>

}




