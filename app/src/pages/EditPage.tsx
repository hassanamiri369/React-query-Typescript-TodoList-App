import React from 'react'
import { Outlet, useParams } from 'react-router-dom'

const EditPage = () => {
    const {id} = useParams()
  return (
    <>
        <div>
            <h1>edit page</h1>
            <Outlet/>
            {id}
        </div>
        
    </>
  )
}

export default EditPage