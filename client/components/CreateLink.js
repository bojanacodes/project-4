import React, { useState } from 'react'
import axios from 'axios'

import LinkForm from './LinkForm'

export default function CreateLink({ match, history }) {

  const folderId = match.params.folder_id

  const [formData, updateFormData] = useState({
    name: '',
    description: '',
    URL: '',
    image: '',
    tags: [],
    importance: ''
  })

  function handleChange(event) {

    updateFormData({ ...formData, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')

    const newFormData = {
      ...formData,
      types: formData.types.map(type => type.value)
    }
    
    const newTags = newFormData.tags.filter(item => item.tags.__isNew__ === true)

    //! Check this
    newTags.forEach(item => {
      try {
        const { data } = axios.post(`/api/folders/${folderId}/tags`, item, {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(data => {
            console.log(data)
          })
      } catch (err) {
        console.log(err.response.data)
      }
    })
  

    try {
      const { data } = await axios.post(`/api/folders/${folderId}/links`, newFormData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(data._id)
      history.push(`/folders/${folderId}/links/${data._id}`)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  

  //! Check how to pass folderId to LinkForm component
  //!Check how handleTagChange works
  return <LinkForm
    handleChange={handleChange}
    handleTagChange={(tags) => updateFormData({ ...formData, tags })}
    handleSubmit={handleSubmit}
    formData={formData}
    folderId={folderId}
  />
}