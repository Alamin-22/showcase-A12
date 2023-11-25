import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import router from './Router/Router'
import { RouterProvider } from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';
// Create a client
const queryClient = new QueryClient()




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </QueryClientProvider>

  </React.StrictMode>,
)
