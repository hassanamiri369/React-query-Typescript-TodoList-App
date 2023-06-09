import React , {useState , useEffect} from 'react';
import { addTodos } from '../api';
import {useMutation ,useQueryClient } from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";

import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

const AddTodo = () => {

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    // state 
    const [title , setTitle] = useState("")
    const [body , setBody ] = useState("")
    

    //  post new todo
    const {data , mutate} = useMutation(addTodos , {
        onSuccess : ()=>{
            queryClient.invalidateQueries(['todos'])
            console.log("suucess adding")
            console.log(data)
            toast.success("success add new todo" , {position : 'top-right'})
        }
    })
    
    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        if(!title) return alert("title must be complete !!!")
        if(!body) return alert("body must be complete !!! ")

        const newTodo = {id : Number(new Date()) , title , body , complete : "unDone"}
        mutate(newTodo)
        setTitle("")
        setBody("")
        navigate("/")


    }

  return (
    <div className='addTodo-container'>
        <Helmet>
            <title>Add Todo </title>
        </Helmet>
        <form onSubmit={(e)=> handleSubmit(e)}>
            <div className='d-title'>
                <label>Title</label>
                <input type='text' value={title} onChange={(e)=> setTitle(e.target.value)} placeholder='title'/>
            </div>

            <div className='d-body'>
                <label>Body</label>
                <textarea  rows={15} value={body} onChange={(e)=> setBody(e.target.value)} placeholder='Explaine todo'></textarea>
                
            </div>

            <div className='d-button'>
                <button>Create Todo</button>
                <button onClick={()=> navigate("/")} className='cancel'>Cancel</button>
            </div>
            
        </form>
    </div>
  )
}

export default AddTodo