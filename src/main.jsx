import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Router from './components/navigation/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import AxiosProvider from './context/AxiosContext'
import { AppProvider } from './context/AppContext'
import QueryProvider from './Server/QueryProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
       <QueryProvider>
            <AppProvider>
                <AxiosProvider>
                    <Router/>
                </AxiosProvider>
            </AppProvider>
        </QueryProvider>
    </BrowserRouter>
)
