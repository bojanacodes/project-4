import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function UserProfile({ history, match }) {

  console.log(match.params.userId)

  // const userId = match.params.userId

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
      const { data } = await axios.put('/api/profile', userData, {
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

  function handleDeleteUser(event) {
    event.preventDefault()
    try {
      axios.delete('/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(resp => {
          history.push('/')
        })

    } catch (err) {
      updateErrorState(true)
      updateError(err.response.data.message)
      updateFormSuccess(false)
    }
  }

  if (userDataLoading) {
    return <div className='loading'>
      <img src='https://i.ibb.co/xDS2vQc/loading.gif' />
    </div>
  }

  return <div className="section">

    {errorState ? <div className="notification is-danger">{error}</div> : <div className="notification is-hidden"></div>}

    {formSuccess ? <div className="notification is-success is-light">Your changes have been saved.</div> : <div className="notification is-hidden"></div>}

    <h2 className='title is-2 mb-4'>Account details</h2>

    <form onSubmit={handleSubmit}>

      <div className="field">
        <label className="label">Username</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={userData.username}
            onChange={handleChange}
            name={'username'}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Last name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={userData.email}
            onChange={handleChange}
            name={'email'}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            className="input"
            type="password"
            value={userData.password}
            onChange={handleChange}
            name={'password'}
          />
        </div>
      </div>

      <button className="button is-primary mt-5">Update my details</button>

    </form>

    <button className="button is-danger mt-5" onClick={handleDeleteUser}>Delete my account</button>

  </div>

}