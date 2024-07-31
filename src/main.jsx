import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Router from './components/navigation/AppRouter'
import Login from './screens/Auth/Login'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router/>,
)
