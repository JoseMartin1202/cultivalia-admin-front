import { React, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppBar from './AppBar'
import HomeScreen from '../../screens/Home/HomeScreen'
import Contract from '../../screens/Contract/Contract'
import Report from '../../screens/Report/Report'
import Supervisions from '../../screens/Supervisiones/Supervisions'

export const appRoutes={
    main: [
        { exact: true, path: '*', element: <Navigate to="/home" /> },
        { path: '/home', element: <HomeScreen/> },
        { path: '/contract', element: <Contract/> },
        { path: '/report', element: <Report/> },
        { path: '/supervisions', element: <Supervisions/> },
    ]
}

const Router = () => {
    const routes =appRoutes.main
    
    return (
        <BrowserRouter>
            <AppBar />
            <Routes>
                {routes.map((r, i) =>
                    <Route key={`r_${i}`} {...r} />
                )}
            </Routes>
        </BrowserRouter>
    )
}

export default Router