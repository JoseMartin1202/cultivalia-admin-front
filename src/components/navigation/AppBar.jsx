import {React, useState, useEffect } from 'react'
import { Icons } from '../../constants/Icons';
import  { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import '../../index.css';
import useSession from '../../Server/Session/SessionProvider';
import { useApp } from '../../context/AppContext';

export const AppBar = () => {
    const [isHover,setIsHover]=useState(false);
    const [isSmall,setIsSmall]=useState(false);
    const isSmallScreen = useMediaQuery({ query: '(max-width: 639.9px)' });
    const { setFilterStateSupervisions,setFilterStateOffers,setFilterStatePrices } = useApp();
    const { logout } = useSession();
 
    useEffect(() => {
        setIsSmall(isSmallScreen);
    }, [isSmallScreen]);

    
    // Si estás en la ruta de login, no renderices el AppBar
    if (location.pathname === '/login') {
        return null;
    }

    return(
        <div className='sm:absolute sm:z-10 font-[Roboto] font-semibold sm:min-w-fit sm:h-full bg-[#279E54] flex flex-col text-white max-sm:flex-row max-sm:w-full max-sm:h-fit' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            <div className='flex w-full flex-col items-center max-sm:flex-row sm:h-full max-sm:h-fit overflow-auto'>
                <NavLink
                to="/supervisiones"
                className={({ isActive }) =>
                    `sm:w-full flex flex-row items-center gap-2 p-3 ${
                    isActive ? 'bg-[#c3edd3] text-[#279E54]' : 'hover:bg-[#73d79b] hover:text-white'
                    }`
                }>
                    <Icons.Home className="size-8" />
                    {isSmall && <span>Supervisiones</span>}
                    {isHover && !isSmall && <span>Supervisiones</span>}
                </NavLink>
                <NavLink
                to="/predios"
                className={({ isActive }) =>
                    `sm:w-full flex flex-row items-center gap-2 p-3 ${
                    isActive ? 'bg-[#c3edd3] text-[#279E54]' : 'hover:bg-[#73d79b] hover:text-white'
                    }`
                }>
                    <Icons.Properties className='size-8'/>
                     {isSmall &&<span>Predios</span>}      
                     {isHover && !isSmall &&<span>Predios</span>}        
                </NavLink>
                <NavLink
                to="/galeria"
                className={({ isActive }) =>
                    `sm:w-full flex flex-row items-center gap-2 p-3 ${
                    isActive ? 'bg-[#c3edd3] text-[#279E54]' : 'hover:bg-[#73d79b] hover:text-white'
                    }`
                }>
                    <Icons.Gallery className='size-8'/>
                     {isSmall &&<span>Galeria</span>}
                     {isHover && !isSmall &&<span>Galeria</span>}
                </NavLink>
                <NavLink
                to="/precios"
                className={({ isActive }) =>
                    `sm:w-full flex flex-row items-center gap-2 p-3 ${
                    isActive ? 'bg-[#c3edd3] text-[#279E54]' : 'hover:bg-[#73d79b] hover:text-white'
                    }`
                }>
                    <Icons.Prices className='size-8'/>
                     {isSmall &&<span>Precios</span>}
                     {isHover && !isSmall &&<span>Precios</span>}
                </NavLink>
                <NavLink
                to="/ofertas"
                className={({ isActive }) =>
                    `sm:w-full flex flex-row items-center gap-2 p-3 ${
                    isActive ? 'bg-[#c3edd3] text-[#279E54]' : 'hover:bg-[#73d79b] hover:text-white'
                    }`
                }>
                    <Icons.Offers className='size-8'/>
                     {isSmall &&<span>Ofertas</span>}
                     {isHover && !isSmall &&<span>Ofertas</span>}
                </NavLink>
                <button className='sm:mt-auto max-sm:ms-auto sm:w-full flex flex-row items-center gap-2 p-3 hover:bg-[#73d79b] hover:text-white ' 
                onClick={()=>{
                    setIsHover(false)
                    setFilterStateSupervisions('Pendiente')
                    setFilterStateOffers(true)
                    setFilterStatePrices(true)
                    logout()}}>
                    <Icons.LogOut className='size-8'/>
                    {isSmall &&<span>Salir</span>}
                    {isHover && !isSmall &&<span>Salir</span>}
                </button>
            </div>
       </div>
    )
}

export default AppBar