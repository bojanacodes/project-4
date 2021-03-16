import React, { useState, useEffect } from 'react'
import axios from 'axios'

import FolderForm from './FolderForm'

export default function UpdateFolder({ history, match }) {
  const folderId = match.params.folderId
  // console.log('this is the id ' + folderId)

  const [loading, updateLoading] = useState(true)

  const [formData, updateFormData] = useState({
    name: ''
    // tag: '',
    // collaborators: ''
  })


  useEffect(() => {
    async function getFolderData() {
      const token = localStorage.getItem('token')

      try {
        
        const { data } = await axios.get(`/api/folders/${folderId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
       
        console.log(data)
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
      console.log(data._id)
      history.push('/workspace')
    } catch (err) {
      console.log(err.response.data)
    }
  }
  if (loading) {
    return <h1>This stuff is clearly not loading </h1>
  }
  return <FolderForm
    handleChange={handleChange}
    handleSubmit={handleSubmit}
    formData={formData}
  />
}