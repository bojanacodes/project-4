import React, { useState, useEffect } from 'react'
import axios from 'axios'

import LinkForm from './LinkForm'

export default function UpdateLink({ history, match }) {

  const linkId = match.params.linkId
  const folderId = match.params.folderId

  const [formData, updateFormData] = useState({
    name: '',
    description: '',
    url: '',
    tags: [],
    // importance: ''
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

        // console.log('tag names', tagNames)

        updateTagsData(tagNames)

      } catch (err) {
        console.log(err)
      }
    }
    fetchTags()
  }, [])

  useEffect(() => {
    axios.get(`/api/folders/${folderId}/links/${linkId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(({ data }) => {
        console.log('update link data', data)
        const mappedFormData = {
          ...data,
          tags: data.tags.map(tag => {
            return { value: tag, label: tag[0].toUpperCase() + tag.slice(1) }
          })
        }
        updateFormData(mappedFormData)
      })
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
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

  async function handleSubmitTags(tags, linkId) {
    // event.preventDefault() - add in as param in line above

    tags.forEach(item => {
      try {
        const { data } = axios.post(`/api/folders/${folderId}/links/${linkId}/tags`, { 'name': item.value }, {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(data => {
            console.log('data after posting tags to newly created link', data)
          })
      } catch (err) {
        console.log(err.response.data)
      }
    })

  }

  async function handleSubmitFields(event) {
    event.preventDefault()


    const newFormData = {
      ...formData
      //tags: formData.tags.map(type => type.value)
    }

    // console.log('new form data', newFormData)

    const newTags = newFormData.tags.filter(item => item.__isNew__ === true)

    const tags = newFormData.tags

    if (newTags.length > 0) {
      handleNewTagsSubmit(newTags)
    }


    const newFormDataToPost = { 'name': newFormData.name, 'description': newFormData.description, 'url': newFormData.URL, 'image': newFormData.image, 'importance': newFormData.importance }


    // console.log('newformdatatopost', newFormDataToPost)

    try {
      const { data } = await axios.post(`/api/folders/${folderId}/links`, newFormDataToPost, {
        headers: { Authorization: `Bearer ${token}` }
      })
      // console.log('data', data)
      const linkId = data.id

      if (tags.length > 0) {
        handleSubmitTags(tags, linkId)
      }

      // getImage(newFormDataToPost)

   
      history.push(`/folders/${folderId}/links/${linkId}`)
      // history.push(`/folders/${folderId}/links`)

    } catch (err) {
      console.log(err.response.data)
    }


  }

  return <LinkForm
    handleChange={handleChange}
    handleTagChange={(tags) => updateFormData({ ...formData, tags })}
    handleSubmitFields={handleSubmitFields}
    handleRadioChange={handleChange}
    formData={formData}
    tagsData={tagsData}
  />
}