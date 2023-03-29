import React , {useState , useEffect} from 'react';
import { addTodos } from '../../api'
import {useMutation} from "@tanstack/react-query";



const AddTodo = () => {

    // state 
    const [title , setTitle] = useState("")
    const [body , setBody ] = useState("")

    const {data} = useMutation(addTodos)

  return (
    <div>
        <form>
            <div className='t-title'>
                <label>Title</label>
                <input type='text' value={title} onChange={(e)=> setTitle(e.target.value)} placeholder='title'/>
            </div>

            <div className='t-body'>
                <label>Body</label>
                <input type='text' value={body} onChange={(e)=> setBody(e.target.value)} placeholder='body'/>
            </div>

            <div>
                <button>Create Todo</button>
            </div>
        </form>
    </div>
  )
}

export default AddTodo