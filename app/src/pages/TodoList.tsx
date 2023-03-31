import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ITodo, deleteTodo, getAllTodos, getTodos } from '../api';

import { FiDelete } from 'react-icons/fi';
import { CiEdit, CiSearch } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { AiOutlineClose } from 'react-icons/ai';

const TodoList = () => {

    const [page, setPage] = useState(1)

    const NextHandler = () => {
        setPage(prev => prev + 1)
    }

    const PrevHandler = () => {
        setPage(prev => prev - 1)
    }

    const navigate = useNavigate()
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery(['todos', page], () => getTodos(page))
    const { data : todos } = useQuery(['todos'], getAllTodos)

    const processing = data?.data.filter(item => item.complete ==="Done")
    const complete = data?.data.filter(item => item.complete ==="unDone")
    
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






    return (
        <div className='todolist-container'>
            <Helmet>
                <title>Todo List</title>
            </Helmet>
            <section className='head'>
                <div className='links-container'>
                    <Link to={'/addTodo'}>NEW TODO</Link>
                </div>


            </section>

            <section className='pagination-container'>
                <div className='page-content'>
                    <button disabled={page === 1} onClick={PrevHandler}>prev</button>
                    <span>page</span>{"  "}<span style={{ fontWeight: "bold" }}>{page}</span>
                    <button disabled={page === data?.headers["x-total-count"] / 2} onClick={NextHandler}>next</button>
                </div >
                    
                <div className='status'>
                    <h3>Status : </h3>
                    <p><span>Count Todo</span><span>{todos?.data.length}</span></p>
                    <p><span>Processing</span><span>{processing&& processing.length}</span></p>
                    <p><span>Complete</span><span>{complete && complete.length}</span></p>
                </div>
            </section>


            <section className='show-item'>
                {data?.data.map((item) => (

                    <div  className={`content ${item.complete === "Done" ? "completeTodo" : "proccessingTodo"}`} key={item.id}>
                        <p className='c-title'>{item.title}</p>
                        <div>{item.complete}</div>
                        <div>
                            <Link key={item.id} to={`/todoDetail/${item.id}`}> More Detail </Link>
                        </div>
                        <div>

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