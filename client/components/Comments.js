import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { isCreator } from '../lib/auth'
import { Link } from 'react-router-dom'

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
        const { data } = await axios.get('/api/folders/1/links/3', {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (data) {
          console.log('just data')
          console.log(data)
          console.log('data.comments')
          console.log(data.comments)
          updateCommentsData(data.comments)
          updateLoading(false)
          console.log('this should be correct')
          console.log(commentsData)
        }


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
        updateCommentsData(resp.data)
      })
  }



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
    <h1>he</h1>
  </div>

}