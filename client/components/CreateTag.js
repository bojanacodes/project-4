import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CreatableSelect from 'react-select/creatable'



export default function CreateLink({ match, history }) {

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

    history.push(`/folders/${folderId}`)

  }

  return <div className="section">

    <div className="container">

      <form onSubmit={handleNewTagsSubmit}>

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
    </div>
  </div>
}