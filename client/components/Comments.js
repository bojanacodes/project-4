import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { isCreator } from '../lib/auth'
import { Link } from 'react-router-dom'

export default function Comment({ match, history }) {
  const folderId = match.params.folderId
  const linkId = match.params.linkId

  const [comments, updateComments] = useState({})


  // ! Comment text
  const [text, setText] = useState('')
  const token = localStorage.getItem('token')

  useEffect(() => {
    async function fetchComments() {
      try {
        const { data } = await axios.get(`/api/folders/${folderId}/links/${linkId}/`)
        updateComments(data.comments)
        console.log(comments)
      } catch (err) {
        console.log(err)
      }
    }
    fetchComments()
  }, [])

 

  // ! Make a comment
  function handleComment() {
    // ! Using the comment endpoint, grab the text from our state.
    axios.post(`/api/folders/${folderId}/links/${linkId}/comments`, { text }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        // ! Clear my textbox
        setText('')
        // ! Update the comments with my response data
        updateComments(resp.data)
      })
  }

 

  // ! Delete a comment
  function handleDeleteComment(commentId) {
    // ! Delete a comment (we're passing through the comment ID the user
    //  !has clicked on)
    axios.delete(`/api/folders/${folderId}/links/${linkId}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateComments(resp.data)
      })
  }

  // if (!pokemon.user) {
  //   return null
  // }

  return <div className="columns">
 
    <div className="column">
     

      {
        // ! Show our comments (lots of bulma)
      }
      {comments.map(comment => {
        return <article key={comment._id} className="media">
          <div className="media-content">
            <div className="content">
              <p className="subtitle">
                {comment.user.username}
              </p>
              <p>{comment.text}</p>
            </div>
          </div>
          {
            // ! Only the person who created a comment should be able to delete a comment
          }
          {isCreator(comment.user._id) && <div className="media-right">
            <button
              className="delete"
              onClick={() => handleDeleteComment(comment._id)}>
            </button>
          </div>}
        </article>
      })}

      {
        // ! Little form to POST a comment (again lots of bulma)
      }
      <article className="media">
        <div className="media-content">
          <div className="field">
            <p className="control">
              <textarea
                className="textarea"
                placeholder="Make a comment.."
                onChange={event => setText(event.target.value)}
                value={text}
              >
                {text}
              </textarea>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button
                onClick={handleComment}
                className="button is-info"
              >
                Submit
              </button>
            </p>
          </div>
        </div>
      </article>
    </div>
  </div>
}