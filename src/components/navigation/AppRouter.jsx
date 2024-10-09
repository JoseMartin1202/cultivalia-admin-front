import { React, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import AppBar from './AppBar'
import HomeScreen from '../../screens/Home/HomeScreen'
import Login from '../../screens/Auth/Login'
import Properties from '../../screens/Predios/Properties'
import Gallery from '../../screens/Galeria/Gallery'
import Prices from '../../screens/Precios/Prices'
import Offers from '../../screens/Ofertas/Offers'
import DetailsSupervisions from '../../screens/Home/DetailsSupervisions'
import DetailsGallery from '../../screens/Galeria/DetailsGalery'
import useSession from '../../Server/Session/SessionProvider'

export const appRoutes={
    SuperAdmin: [
        { path: '/supervisiones', element: <HomeScreen/> },
        { path: '/predios', element: <Properties/> },
        { path: '/galeria', element: <Gallery/> },
        { path: '/precios', element: <Prices/> },
        { path: '/ofertas', element: <Offers/> },
        { path: '/detallesSupervision/:supervisionId', element: <DetailsSupervisions/> },
        { path: '/detallesGaleria/:galleryId', element: <DetailsGallery/> },
        { path: '*', element: <Navigate to="/supervisiones" /> },
    ],
    auth: [
        { path: '/login', element: <Login/> },
        { path: '*', element: <Navigate to="/login" /> },
    ]
}

const Router = () => {
    const { session } = useSession()
    const [routes, setRoutes] = useState([])

    useEffect(() => {
        let routes = session ? appRoutes[session.user_type] : appRoutes.auth
        setRoutes(routes)
    }, [session])
    
    return (
        <>
            <AppBar />
            <Routes>
                {routes?.map((r, i) =>
                    <Route key={`r_${i}`} {...r} />
                )}
            </Routes>
        </>
    )
}

export default Router