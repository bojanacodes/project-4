import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default function Workspace() {
  // const [folders, updateFolders] = useState([])

  return <div>

    <h1>This is workspace</h1>

    <Link to={`/properties/${item._id}`} className="button is-primary is-light mb-2">Test create a link</Link>
  </div>
  
}