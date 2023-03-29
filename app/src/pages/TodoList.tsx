import React from 'react'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { deleteTodo, getTodos } from '../api';

import { FiDelete } from 'react-icons/fi';
import { CiEdit } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';


const TodoList = () => {

    const navigate = useNavigate()
    const queryClient = useQueryClient();

    const {data  , isLoading } = useQuery(['todos'] , getTodos  )

    const { mutate} = useMutation(deleteTodo , {
        onSuccess : ()=>{
            queryClient.invalidateQueries(['todos'])
            console.log("delte todo success")
        }
    })


    const handleDelete = (id : number)=>{
        mutate(id)
    }

  return (
    <div className='todolist-container'>
       {data?.data.map((item)=>(
       
         <div className='content' key={item.id}>
            <p>{item.title}</p>
            <pre>{item.body}</pre>
            <div>{item.complete ? <p>done</p> : <p>un done</p>}</div>
            <div>
            <Link key={item.id} to={`/todoDetail/${item.id}`}> more </Link>
                <span className='edit-ico'><CiEdit onClick={()=> navigate(`/editTodo/${item.id}`)} /></span>
                <span className='delete-ico'><FiDelete onClick={()=> handleDelete(Number(item.id))}/></span>
            </div>
        </div>
     
       ))}
    </div>
  )
}

export default TodoList