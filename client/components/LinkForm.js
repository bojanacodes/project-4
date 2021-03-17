import React, { useState, useEffect } from 'react'
import axios from 'axios'

import CreatableSelect from 'react-select/creatable';


const inputFields = ['name', 'description', 'URL']


//! Add on change function to handle importance radio button selection



export default function LinkForm({ formData, handleSubmitFields, handleChange, handleTagChange, tagsData }) {



  return <div className="section">

    <div className="container">

      <form onSubmit={handleSubmitFields}>

        {inputFields.map(field => {
          return <div key={field} className="field">
            <label className="label">
              {field[0].toUpperCase() + field.slice(1)}
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={formData[field]}
                onChange={handleChange}
                name={field}
              />
            </div>
          </div>
        })}


        <label className="label">
          {'Tags'}
        </label>

        <CreatableSelect
          defaultValue={[]}
          isMulti
          name="colors"
          options={tagsData}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleTagChange}
          value={formData.tags}
        />


        <label className="label">
          {'Importance'}
        </label>
        <div className="control">
          <label className="radio">
            <input type="radio" name="importance" value="High" onChange={handleChange}/>
              High
          </label>
          <label className="radio">
            <input type="radio" name="importance" value="Medium" onChange={handleChange}/>
                Medium
          </label>
          <label className="radio">
            <input type="radio" name="importance" value="Low" onChange={handleChange}/>
                Low
          </label>
        </div>


        <button className="button mt-5 is-success">Submit</button>
      </form>

    </div>

  </div>

}