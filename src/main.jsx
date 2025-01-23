import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Router from './components/navigation/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import AxiosProvider from './context/AxiosContext'
import { AppProvider } from './context/AppContext'
import QueryProvider from './Server/QueryProvider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { WebSocketProvider } from './context/WebSocketContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
       <QueryProvider>
            <AppProvider>
                <AxiosProvider>
                    <WebSocketProvider/>
                    <Router/>
                     <ReactQueryDevtools initialIsOpen={false} />
                </AxiosProvider>
            </AppProvider>
        </QueryProvider>
    </BrowserRouter>
)
