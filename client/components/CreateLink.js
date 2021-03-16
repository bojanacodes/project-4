import React, { useState, useEffect } from 'react'
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

  const token = localStorage.getItem('token')

  const [tagsData, updateTagsData] = useState()

  useEffect(() => {
    async function fetchTags() {
      try {
        // const { data } = await axios.get(`/api/folders/${folderId}/tags`)
        const { data } = await axios.get('/api/tags')

        const tagNames = []
        
        data.map(item => tagNames.push({ 'label': item.name, 'value': item.name }))

        console.log('tag names', tagNames)

        updateTagsData(tagNames)

      } catch (err) {
        console.log(err)
      }
    }
    fetchTags()
  }, [])  

  function handleChange(event) {

    updateFormData({ ...formData, [event.target.name]: event.target.value })
  }

  function handleNewTagsSubmit(newTags) {

    // const newTags = newFormData.tags.filter(item => item.tags.__isNew__ === true)

    //! Check this
    newTags.forEach(item => {
      try {
        const { data } = axios.post(`/api/folders/${folderId}/tags`, { 'name': item.value }, {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(data => {
            console.log(data)
          })
      } catch (err) {
        console.log(err.response.data)
      }
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    

    const newFormData = {
      ...formData,
      //tags: formData.tags.map(type => type.value)
    }

    console.log('new form data', newFormData)

    const newTags = newFormData.tags.filter(item => item.__isNew__ === true)

    if (newTags.length > 0) {
      handleNewTagsSubmit(newTags)
    }

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

  //! Add tagsData to pass 
  return <LinkForm
    handleChange={handleChange}
    handleTagChange={(tags) => updateFormData({ ...formData, tags })}
    handleSubmit={handleSubmit}
    formData={formData}
    folderId={folderId}
    tagsData={tagsData}
  />
}