import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
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
import Sales from '../../screens/Ventas/Sales'
import Investors from '../../screens/Inversores/Investors'
import Advisors from '../../screens/Asesores/advisors'
import Jimas from '../../screens/Jimas/jimas'
import PagosSalientes from '../../screens/PagoSaliente/pagosSaliente'
import AjusteTiempo from '../../screens/AjusteTiempo/AjusteTiempo'
import DetailInvestor from '../../screens/Inversores/DetailInvestor'

const Router = () => {
    const { session, sessionStatus } = useSession()
    if (sessionStatus === 'success' && session) {
        return (
            <>
                <AppBar />
                <Routes>
                    <Route path="/supervisiones" element={<HomeScreen />} />
                    <Route path="/predios" element={<Properties />} />
                    <Route path="/galeria" element={<Gallery />} />
                    <Route path="/precios" element={<Prices />} />
                    <Route path="/ofertas" element={<Offers />} />
                    <Route path="/detallesSupervision/:supervisionId" element={<DetailsSupervisions />} />
                    <Route path="/detallesGaleria/:galleryId" element={<DetailsGallery />} />
                    <Route path="/ventas" element={<Sales />} />
                    <Route path="/inversores" element={<Investors />} />
                    <Route path="/inversor/:inversorId" element={<DetailInvestor/>} />
                    <Route path="/asesores" element={<Advisors />} />
                    <Route path="/jimas" element={<Jimas />} />
                    <Route path="/pagosSalientes" element={<PagosSalientes />} />
                    <Route path="/ajusteTiempo" element={<AjusteTiempo />} />
                    <Route path="*" element={<Navigate to="/supervisiones" replace />} />
                </Routes>
            </>
        )
    }

    if(sessionStatus === 'success' && !session){
        return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        )
    }
    
}

export default Router
