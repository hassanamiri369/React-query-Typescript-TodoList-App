import { useState } from 'react'
import TodoList from './pages/TodoList';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route , Link } from "react-router-dom";

// pages
import AddTodo from './pages/AddTodo';
import TodoDetail from './pages/TodoDetail';
import EditPage from './pages/EditPage';




function App() {


  return (
    <div className="App">
      <header>
        <h2>TodoList App - React-Query & Typescript</h2>
      </header>

      <main>
        


        <section>
          <div className='routes-container'>
            <ToastContainer autoClose={2000} />
            <Routes>
              <Route path='/' element={<TodoList />} />
              <Route path='/todoDetail/:id' element={<TodoDetail/>}/>
              <Route path='/addTodo' element={<AddTodo />} />
              <Route path='/editTodo/:id' element={<EditPage/>}/>
            </Routes>
          </div>
        </section>
      </main>


    </div>
  )
}

export default App
