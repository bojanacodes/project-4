import React, { useState } from 'react'
import axios from 'axios'

export default function Login({ history, match }) {

  const token = localStorage.getItem('token')

  const [formData, updateFormData] = useState({
    email: '',
    password: ''
    // passwordConfirmation: ''
  })

  const [error, updateError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    updateFormData({ ...formData, [name]: value })
  }

  // async function handleSubmit(event) {
  //   event.preventDefault()

  //   try {
  //     const { data } = await axios.post('/api/login', formData)
  //     if (localStorage) {
  //       localStorage.setItem('token', data.token)

  //     }
  //     history.push('/Workspace')
  //   } catch (err) {
  //     console.log(err.response.data)
  //     history.push('/Login')

  //   }
  // }
  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/login', formData)
      
      if (localStorage) {
        
        localStorage.setItem('token', data.token)
        if (token !== 'undefined') {
          history.push('/Workspace')

        } else {
          updateError('Could not log in. Invalid email or password.')
          

        }
      }

    } catch (err) {
      updateError('Could not log in. Invalid email or password.')
    }
  }


  return <div className="section" >
    <div className="container" id="container-form">


      <div className='container px-6 pt-6 pb-6'>
        <h5 className='title brandfont has-text-info is-size-3 mb-1 mt-4'>Log in</h5>
        {match.params.message === 'success' && <div className='box has-background-success has-text-white'>Registration sucessful. Log in to continue.</div>}
        {error && <div className='box has-background-danger has-text-white'>{error}</div>}

      </div>
      <form onSubmit={handleSubmit} id="login-form">
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={formData.email}
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
              value={formData.password}
              onChange={handleChange}
              name={'password'}
            />
          </div>
        </div>
        {/* <div className="field">
          <label className="label">Password confirmation</label>
          <div className="control">
            <input
              className="input"
              type="password"
              value={formData.passwordConfirmation}
              onChange={handleChange}
              name={'passwordConfirmation'}
            />
          </div>
        </div> */}
        <button className="button">Submit</button>
      </form>
    </div>
  </div>
}