import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:8000"
})

export interface ITodo  {
    id : number;
    title : string;
    body : string;
    complete : boolean

}

export const getTodos  = async ()   =>{
    const response = await api.get <ITodo[]>("/todos");
    return response;
}

export const getOneTodo = async(id : any)=>{
    const response = await api.get(`/todos/${id}`);
    return response
}


export const addTodos = async(todo : ITodo)=>{
    const response = await api.post('/todos' , todo);
    return response;
}


export const deleteTodo = async(id : number) =>{
    const response = await api.delete(`/todos/${id}`)
    return response;
}