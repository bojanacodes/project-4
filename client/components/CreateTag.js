import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CreatableSelect from 'react-select/creatable'
import { withRouter } from 'react-router-dom'


const CreateTag = ({ match, history }) => {
  // export default function CreateTag({ match, history }) {


  console.log('loading create tag page')

  const folderId = match.params.folderId

  // const [formData, updateFormData] = useState({
  //   name: ''
  // })

  const [formData, updateFormData] = useState({

    tags: []

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

  // function handleTagChange(event) {

  //   updateFormData({ ...formData, [event.target.name]: event.target.value })
  // }

  function handleNewTagsSubmit() {

    const newTags = formData.tags.filter(item => item.__isNew__ === true)

    console.log('in your submit')

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

    console.log('above the timeout')
    // history.push(`/folders/${folderId}`)

    setTimeout(() => {
      console.log('in your timeout')
      history.push(`/folders/${folderId}`)
    }, 3000)

    console.log('after timeout')

    history.push(`/folders/${folderId}/tags/`)



  }

  //   return <div className='loading'>
  //   <img src='https://i.ibb.co/xDS2vQc/loading.gif' id="loader-folder-overview" />
  // </div>

  return <div className="container is-centered">

    <article className="panel" id="panel-update-folder">
      <h3 className="title is-3 panel-heading" id="h3-tag-panel">Create a tag</h3>

      <form onSubmit={handleNewTagsSubmit} id="tag-form">

        <label className="label">
          View and add tags
        </label>

        <CreatableSelect
          defaultValue={[]}
          isMulti
          name="colors"
          options={tagsData}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={(tags) => updateFormData({ ...formData, tags })}
          value={formData.tags}
        />

        <button className="button mt-5 is-success">Submit</button>
      </form>


    </article >
  </div >
}

export default withRouter(CreateTag)