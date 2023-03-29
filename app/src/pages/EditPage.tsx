import React , {useState , useEffect} from 'react';
import { useMutation ,  useQuery,  useQueryClient } from '@tanstack/react-query';
import { Outlet, useParams , useNavigate } from 'react-router-dom';
import { getOneTodo, updateTodo } from '../api';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

const EditPage = () => {
    const {id} = useParams()
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    // state 
    const [title , setTitle] = useState("")
    const [body , setBody ] = useState("")
    const [complete , setComplete] = useState('')

    const {data} = useQuery(['todos' , id] , ()=> getOneTodo(id))

    useEffect(()=>{
        if(data){
            setTitle(data.data.title)
            setBody(data.data.body)
            setComplete(data.data.complete)
        }
    } , [id , data])

    //  update todo
    const { mutate} = useMutation(updateTodo , {
        onSuccess : ()=>{
            queryClient.invalidateQueries(['todos'])
            console.log("suucess updating ")
            // console.log(data)
            toast.info("updated todo success", {position : "top-left"})
         
        }
    })

    const resetInput = ()=>{
        setTitle("")
        setBody("")
        setComplete("")
    }
    
    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        if(!title) return alert("title must be complete !!!")
        if(!body) return alert("body must be complete !!! ")

        const newTodo = {id : data?.data.id , title , body , complete }
        mutate(newTodo)
        resetInput()
        navigate("/")


    }

    const cancelUpdate = ()=>{
        resetInput()
        navigate("/")
    }
  return (
    <>
        <div>
            <Helmet>
                <title>Edit Todo</title>
            </Helmet>
            <h1>edit page</h1>
            <Outlet/>
            {id}
            <form onSubmit={(e)=> handleSubmit(e)}>
            <div className='t-title'>
                <label>Title</label>
                <input type='text' value={title} onChange={(e)=> setTitle(e.target.value)} placeholder='title'/>
            </div>

            <div className='t-body'>
                <label>Body</label>
                <textarea  value={body} onChange={(e)=> setBody(e.target.value)} placeholder='body'></textarea>
                
            </div>

            <div className='t-complete'>
                <label>status</label>
                {/* <input type='checkbox' value={complete} onChange={(e)=>setComplete(e.target.value)}  /> */}
                <select value={complete} onChange={(e)=>setComplete(e.target.value)}>
                    <option value={'Done'}>Done</option>
                    <option value={'unDone'}>unDone</option>
                </select>
            </div>

            <div>
                <button type='submit'>update Todo</button>
                <button onClick={cancelUpdate}>cancel</button>
            </div>
        </form>
        </div>
        
    </>
  )
}

export default EditPage