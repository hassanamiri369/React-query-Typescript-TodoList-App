import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:8000"
})



export const getTodos = async()=>{
    const response = await api.get('/todos')
    return response
}