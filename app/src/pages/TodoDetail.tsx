import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { getOneTodo } from '../api'
import { Helmet } from 'react-helmet'

const TodoDetail = () => {
    const {id} = useParams()

    const navigate = useNavigate()

    const {data , isLoading} = useQuery({
      queryKey : ['todos' , id],
      queryFn : ()=> getOneTodo(id),
      onSuccess : ()=>{console.log(data)}
    }
      )

      

  return (
    <>
    <Helmet>
      <title>Todo Detail Info</title>
    </Helmet>
        <Outlet/>
        <div>{id}</div>
        <div>
          {isLoading ? <div>loading ...</div> : null}
          <div>
            <button onClick={()=> navigate("/")}>go back home</button>
          </div>
          {data?.data && <div>
            <p>{data.data.complete}</p>
              <p>{data.data.title}</p>
              <pre>{data.data.body}</pre>

            </div>}
        </div>
    </>
  )
}

export default TodoDetail