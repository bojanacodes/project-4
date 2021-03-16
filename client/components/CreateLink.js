import React, { useState, useEffect } from 'react'
import axios from 'axios'

import LinkForm from './LinkForm'

export default function CreateLink({ match, history }) {

  const folderId = match.params.folderId

  const [formData, updateFormData] = useState({
    name: '',
    description: '',
    URL: '',
    image: '',
    tags: []
    //importance: ''
  })

  const token = localStorage.getItem('token')

  const [tagsData, updateTagsData] = useState()

  useEffect(() => {
    async function fetchTags() {
      try {
        const { data } = await axios.get(`/api/folders/${folderId}/tags`, {
          headers: { Authorization: `Bearer ${token}` }
        })

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

    newTags.forEach(item => {
      try {
        const { data } = axios.post(`/api/folders/${folderId}/tags`, { 'name': item.value }, {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(data => {
            console.log('data after posting new tags', data)
          })
      } catch (err) {
        console.log(err.response.data)
      }
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()


    const newFormData = {
      ...formData
      //tags: formData.tags.map(type => type.value)
    }

    console.log('new form data', newFormData)

    const newTags = newFormData.tags.filter(item => item.__isNew__ === true)

    console.log('new tags', newTags)

    if (newTags.length > 0) {
      handleNewTagsSubmit(newTags)
    }

    const newFormDataToPost = {
      ...newFormData,
      tags: newFormData.tags.map(tag => tag.value)
    //   tags: newFormData.tags.map(tag => {
    //     return {
    //       'name': tag.value
    //     }
    //   })
    }

    //tags: formData.tags.map(type => type.value)

    console.log('newformdatatopost', newFormDataToPost)

    try {
      const { data } = await axios.post(`/api/folders/${folderId}/links`, newFormDataToPost, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log('data id', data._id)
      // history.push(`/folders/${folderId}/links/${data._id}`)
      history.push(`/folders/${folderId}/links`)
    } catch (err) {
      console.log(err.response.data)
    }
  }




  //!Check how handleTagChange works

  //! Add tagsData to pass 
  return <LinkForm
    handleChange={handleChange}
    handleTagChange={(tags) => updateFormData({ ...formData, tags })}
    handleSubmit={handleSubmit}
    formData={formData}
    tagsData={tagsData}
  />
}