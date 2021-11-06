import React, { useState, useEffect } from 'react'
import axios from 'axios'

import FolderForm from './FolderForm'
import CollaboratorForm from './CollaboratorForm'

export default function UpdateFolder({ history, match }) {
  const folderId = match.params.folderId
  const token = localStorage.getItem('token')

  const [loading, updateLoading] = useState(true)

  const [formData, updateFormData] = useState({
    name: ''
  })

  const [formEmailData, updateFormEmailData] = useState({
    email: ''
  })


  //Handle submitting collaborator
  async function handleSubmitCollaborator(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')

    const newFormEmailData = {
      ...formEmailData
    }

    try {
      const { data } = await axios.post(`/api/folders/${folderId}/users`, newFormEmailData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      // console.log(data._id)
      // console.log('is something getting through')
      history.push('/workspace')
    } catch (err) {
      console.log(err.response.data)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')

    const newFormData = {
      ...formData
    }
    try {
      const { data } = await axios.put(`/api/folders/${folderId}`, newFormData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      // console.log(data._id)
      history.push('/workspace')
    } catch (err) {
      console.log(err.response.data)
    }
  }

  //Get the data about the folder to begin with
  useEffect(() => {
    async function getFolderData() {

      try {

        const { data } = await axios.get(`/api/folders/${folderId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        // console.log(data)
        updateFormData(data)
        updateLoading(false)
      } catch (err) {


        console.log(err.response.data)
      }

    }


    getFolderData()
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    updateFormData({ ...formData, [name]: value })
  }
  function handleEmailChange(event) {
    const { name, value } = event.target
    updateFormEmailData({ ...formEmailData, [name]: value })
  }


  if (loading) {
    return <h1>This stuff is clearly not loading </h1>
  }


  //Delete a folder
  function handleDeleteFolder(event) {
    event.preventDefault()
    try {
      axios.delete(`/api/folders/${folderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(resp => {
          history.push('/workspace')
        })

    } catch (err) {
      console.log(err.response.data)
    }
  }

  return <div>
    <div className="container is-centered">

      <article className="panel" id="panel-update-folder">
      <h3 className="title is-3 panel-heading" id="h3-update-folder">Update your folder</h3>
   
        <FolderForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formData={formData}
        />
        <CollaboratorForm
          handleEmailChange={handleEmailChange}
          handleSubmitCollaborator={handleSubmitCollaborator}
          formEmailData={formEmailData}
        />
      
      <button className="button is-danger mt-5" onClick={handleDeleteFolder} id="folder-delete-button">Delete this folder</button>
      </article>
    </div>

    
  </div >
}