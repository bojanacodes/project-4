import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { isCreator } from '../lib/auth'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

export default function Comment({ match, history }) {
  const folderId = match.params.folderId
  const linkId = match.params.linkId


  const [commentsData, updateCommentsData] = useState({})
  const [loading, updateLoading] = useState(true)


  // ! Comment text
  const [text, setText] = useState('')
  const token = localStorage.getItem('token')

  useEffect(() => {
    async function fetchComments() {
      try {
        // const { data } = await axios.get(`/api/folders/${folderId}/links/${linkId}/`)
        const { data } = await axios.get('/api/folders/1/links/1', {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (data) {

          updateCommentsData(data.comments)
          updateLoading(false)
          console.log('just data')
          console.log(data)
          console.log('data.comments')
          console.log(data.comments)

        }


      } catch (err) {
        console.log(err)
      }
    }
    fetchComments()
  }, [])


  // useEffect(() => {
  async function handleComment() {

    const { data } = await axios.post('/api/folders/1/links/1/comments', { text }, {
      headers: { Authorization: `Bearer ${token}` }
    })

    setText('')
    updateCommentsData(data)






  }
  handleComment()
  // }, [])




  // // ! Make a comment
  // function handleComment() {
  //   // ! Using the comment endpoint, grab the text from our state.
  //   axios.post(`/api/folders/${folderId}/links/${linkId}/comments`, { text }, {
  //     headers: { Authorization: `Bearer ${token}` }
  //   })
  //     .then(resp => {
  //       // ! Clear my textbox
  //       setText('')
  //       // ! Update the comments with my response data
  //       updateCommentsData(resp.data)
  //     })
  // }


  // // ! Delete a comment
  // function handleDeleteComment(commentId) {
  //   // ! Delete a comment (we're passing through the comment ID the user
  //   //  !has clicked on)
  //   axios.delete(`/api/folders/${folderId}/links/${linkId}/comments/${commentId}`, {
  //     headers: { Authorization: `Bearer ${token}` }
  //   })
  //     .then(resp => {
  //       updateComments(resp.data)
  //     })
  // }

  // if (!pokemon.user) {
  //   return null
  // }

  if (loading) {
    return <div className='loading'>
      <img src='https://i.ibb.co/xDS2vQc/loading.gif' id="loader-workspace" />
    </div>
  }
  return <div>
    <div>
      <div className="columns">

        <div className="column">


          {
            // ! Show our comments (lots of bulma)
          }
          {commentsData.map((comment, index) => {
            return <article key={index} className="media">
              <div className="media-content">
                <div className="content">
                  <p className="subtitle">
                    {comment.content}
                  </p>
                  <span> Last edited on: </span>
                  <Moment format="YYYY/MM/DD">
                    {comment.updated_at}
                  </Moment>
                </div>
              </div>
              {
                // ! Only the person who created a comment should be able to delete a comment
              }
              {/* {isCreator(comment.user._id) && <div className="media-right">
        <button
          className="delete"
          onClick={() => handleDeleteComment(comment._id)}>
        </button>
      </div>} */}
            </article>
          })}


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


    </div>
  </div >

}