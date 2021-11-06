import React, { useState, useEffect } from 'react'
import axios from 'axios'

import LinkForm from './LinkForm'

export default function CreateLink({ match, history }) {

  const folderId = match.params.folderId

  const [formData, updateFormData] = useState({
    name: '',
    description: '',
    url: '',
    tags: [],
    importance: ''
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

  function handleChange(event) {
    // console.log('handle change event', event.target.name, event.target.value)

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


    const newFormDataToPost = { 'name': newFormData.name, 'description': newFormData.description, 'url': newFormData.URL, 'importance': newFormData.importance }


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


    } catch (err) {
      console.log(err.response.data)
    }


  }




  return <div>
    <div className="columns is-centered is-two-thirds-desktop">
      <div className="container is-centered is-two-thirds">


        <article className="panel" id="panel-update-folder">
          <h3 className="title is-3 panel-heading" id="h3-link-panel">Create a link</h3>

          <LinkForm
            handleChange={handleChange}
            handleTagChange={(tags) => updateFormData({ ...formData, tags })}
            handleSubmitFields={handleSubmitFields}
            handleRadioChange={handleChange}
            formData={formData}
            tagsData={tagsData}
          />
        </article>
      </div>
    </div>
  </div>
}


