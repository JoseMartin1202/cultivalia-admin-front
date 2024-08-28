import { React, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import AppBar from './AppBar'
import HomeScreen from '../../screens/Home/HomeScreen'
import Contract from '../../screens/Contratos/Contract'
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
        { exact: true, path: '*', element: <Navigate to="/supervisiones" /> },
        { path: '/supervisiones', element: <HomeScreen/> },
        { path: '/predios', element: <Properties/> },
        { path: '/galeria', element: <Gallery/> },
        { path: '/precios', element: <Prices/> },
        { path: '/contratos', element: <Contract/> },
        { path: '/ofertas', element: <Offers/> },
        { path: '/detallesSupervision/:supervisionId', element: <DetailsSupervisions/> },
        { path: '/detallesGaleria/:galleryId', element: <DetailsGallery/> },
    ],
    auth: [
        { exact: true, path: '*', element: <Navigate to="/login" /> },
        { path: '/login', element: <Login/> },
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