import React, { useState } from 'react'
import axios from 'axios'

import FolderForm from './FolderForm'


export default function CreateFolder({ history }) {
  

  const [formData, updateFormData] = useState({
    name: '',
    tag: '',
    collaborators: ''
  })

  function handleChange(event) {
    updateFormData({ ...formData, [event.target.name]: event.target.value })
  }
  

  async function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')
    try {
      const { data } = await axios.post('/api/folders', formData, {
        headers: { Authorization: `Bearer ${token}` }
        
      })
      
      
      
      
      history.push('/workspace')
    } catch (err) {
      
      
      console.log(err.response.data)
    }
  }

  
  return <FolderForm
    handleChange={handleChange}
    handleSubmit={handleSubmit}
    formData={formData}
  />
}