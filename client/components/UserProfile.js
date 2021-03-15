import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function UserProfile({ history, match }) {

  console.log(match.params.userId)

  const userId = match.params.userId

  const [userData, updateUserData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [userDataLoading, updateUserDataLoading] = useState(true)

  const [error, updateError] = useState('')
  const [errorState, updateErrorState] = useState(false)
  const [formSuccess, updateFormSuccess] = useState(false)

  const token = localStorage.getItem('token')

  function getUser() {
  
    axios.get('/api/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(({ data }) => {

        updateUserData(data)
        updateUserDataLoading(false)

      })
  }

  useEffect(() => {
    getUser()
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    updateUserData({ ...userData, [name]: value })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      const { data } = await axios.put(`/api/users/${userId}`, userData, {
        headers: { Authorization: `Bearer ${token}` }
      })

      getUser()
      updateErrorState(false)
      updateFormSuccess(true)
    } catch (err) {
      updateErrorState(true)
      updateError(err.response.data.message)
      updateFormSuccess(false)
    }
  }

  return <h2>Hello World</h2>


}