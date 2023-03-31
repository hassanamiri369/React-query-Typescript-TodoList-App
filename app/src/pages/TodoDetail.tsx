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
        
        <div className='detail-container'>
          {isLoading ? <div>loading ...</div> : null}
          <div className='goback'>
            <button onClick={()=> navigate("/")}>go back home</button>
          </div>
          {data?.data && <div className='detail-item'>
          <p >ID :{" "}{id}</p>
            <p>
              <span>COMPLETE : </span>
              <span>{data.data.complete}</span>
            </p>
              <p>
                <span>TITLE :</span>
                <span>{data.data.title}</span>
              </p>
              <p>
                <span>BODY :</span>
                <pre >{data.data.body}</pre>
              </p>

            </div>}
        </div>
    </>
  )
}

export default TodoDetail