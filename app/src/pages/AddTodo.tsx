import React , {useState , useEffect} from 'react';
import { addTodos } from '../api';
import {useMutation ,useQueryClient } from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";



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
        }
    })
    
    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        if(!title) return alert("title must be complete !!!")
        if(!body) return alert("body must be complete !!! ")

        const newTodo = {id : Number(new Date()) , title , body , complete : false}
        mutate(newTodo)
        setTitle("")
        setBody("")
        navigate("/")


    }

  return (
    <div>
        <form onSubmit={(e)=> handleSubmit(e)}>
            <div className='t-title'>
                <label>Title</label>
                <input type='text' value={title} onChange={(e)=> setTitle(e.target.value)} placeholder='title'/>
            </div>

            <div className='t-body'>
                <label>Body</label>
                <textarea  value={body} onChange={(e)=> setBody(e.target.value)} placeholder='body'></textarea>
                
            </div>

            <div>
                <button>Create Todo</button>
            </div>
        </form>
    </div>
  )
}

export default AddTodo