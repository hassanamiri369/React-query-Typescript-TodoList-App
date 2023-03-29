import React from 'react'
import {useQuery} from "@tanstack/react-query";
import { getTodos } from '../../api';


const TodoList = () => {

    const {data  , isLoading } = useQuery(['todos'] , getTodos  )


  return (
    <div className='todolist-container'>
       {data?.data.map((item)=>(
        <div key={item.id}>
            <p>{item.title}</p>
            <p>{item.body}</p>
            <div>{item.complete ? <p>done</p> : <p>un done</p>}</div>
        </div>
       ))}
    </div>
  )
}

export default TodoList