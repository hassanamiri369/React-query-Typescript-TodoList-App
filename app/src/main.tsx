import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// route config
import {BrowserRouter} from "react-router-dom";


// config react query 
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';


const queryClient =new  QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
   
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
    </BrowserRouter>
   
  </React.StrictMode>,
)
