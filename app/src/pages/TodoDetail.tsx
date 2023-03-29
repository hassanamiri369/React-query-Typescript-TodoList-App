import React from 'react'
import { Outlet, useParams } from 'react-router-dom'

const TodoDetail = () => {
    const {id} = useParams()

  return (
    <>
        <Outlet/>
        <div>{id}</div>
    </>
  )
}

export default TodoDetail