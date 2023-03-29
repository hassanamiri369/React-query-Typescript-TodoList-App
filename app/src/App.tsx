import { useState } from 'react'
import TodoList from './pages/TodoList';

import { Routes, Route , Link } from "react-router-dom";
import AddTodo from './components/addTodo/AddTodo';
import TodoDetail from './pages/TodoDetail';




function App() {


  return (
    <div className="App">
      <header>
        <h2>TodoList App - React-Query & Typescript</h2>
      </header>

      <main>
        <section>
          <div className='links-container'>
            <Link to={'/addTodo'}>NEW TODO</Link>
          </div>
        </section>


        <section>
          <div className='routes-container'>
            <Routes>
              <Route path='/' element={<TodoList />} />
              <Route path='/todoDetail/:id' element={<TodoDetail/>}/>
              <Route path='/addTodo' element={<AddTodo />} />
            </Routes>
          </div>
        </section>
      </main>


    </div>
  )
}

export default App
