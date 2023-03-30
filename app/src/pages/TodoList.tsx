import React , {useState} from 'react'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ITodo, deleteTodo, getTodos } from '../api';

import { FiDelete } from 'react-icons/fi';
import { CiEdit } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';


const TodoList = () => {

    const [page , setPage] = useState(1)

        const NextHandler = ()=> {
            setPage(prev => prev + 1)
        }

        const PrevHandler = ()=> {
            setPage(prev => prev - 1)
        }

    const navigate = useNavigate()
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery(['todos' , page], ()=>getTodos(page))

    const { mutate } = useMutation(deleteTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries(['todos'])
            console.log("delte todo success")
            toast.error("delete todo success !!", { position: "top-center" })
           
        }
    })


    const handleDelete = (id: number) => {
        mutate(id)
    }

    

    const [searchText , setSearchText] = useState("")
    const [resultSearch , setResultSearch] = useState<ITodo[] | null>(null)

    const handlerSearch = () =>{}





    return (
        <div className='todolist-container'>
            <Helmet>
                <title>Todo List</title>
            </Helmet>
            <section>
                <div className='links-container'>
                    <Link to={'/addTodo'}>NEW TODO</Link>
                </div>

                <div>
                    <input type='text' />
                </div>
            </section>

            <section>
                <button disabled={page === 1} onClick={PrevHandler}>prev</button>
                {page}
                <button disabled={page === data?.headers["x-total-count"] /2} onClick={NextHandler}>next</button>
            </section>


            <section>
                {data?.data.map((item) => (

                    <div className='content' key={item.id}>
                        <p>{item.title}</p>
                        <p>{item.title}</p>
                        <pre>{item.body}</pre><br />
                        <div>{item.complete}</div>
                        <div>
                            <Link key={item.id} to={`/todoDetail/${item.id}`}> more </Link>
                            <span title='edit' className='edit-ico'><CiEdit onClick={() => navigate(`/editTodo/${item.id}`)} /></span>
                            <span className='delete-ico'><FiDelete onClick={() => handleDelete(Number(item.id))} /></span>
                        </div>

                    </div>

                ))}
            </section>
        </div>
    )
}

export default TodoList