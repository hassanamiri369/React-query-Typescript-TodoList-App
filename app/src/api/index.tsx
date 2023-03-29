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
    const response = await api.get <ITodo[]>("/todos")
    return response
}


export const addTodos = async(todo : ITodo)=>{
    const response = await api.post('/todos' , todo)
    return response
}