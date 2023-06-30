import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import Index, {loader as clientesLoader } from './pages'
import NuevoCliente, { action as nuevoClienteAction } from './pages/NuevoCliente'
import EditarCliente, { loader as editClientesLoader, action as editClientesAction } from './pages/EditarCliente'
import { action as deleteCustomerAction } from './components/Cliente'
import ErrorPage from './components/ErrorPage'

const router = createBrowserRouter([
  { path: '/', element: <Layout />,
    children: [
      { index: true,
        element: <Index />,
        loader: clientesLoader,
        errorElement: <ErrorPage />
      },
      { path: '/clientes/nuevo',
        element: <NuevoCliente />,
        action: nuevoClienteAction,
        errorElement: <ErrorPage /> 
      },
      { path: '/clientes/:clienteId/editar',
        element: <EditarCliente />,
        loader: editClientesLoader,
        action: editClientesAction,
        errorElement: <ErrorPage />
      },
      { path: '/clientes/:clienteId/eliminar',
        action: deleteCustomerAction
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
