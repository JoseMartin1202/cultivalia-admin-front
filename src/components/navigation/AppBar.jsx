import {React, useState, useEffect } from 'react'
import { Icons } from '../../constants/Icons';
import  { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import '../../index.css';
import useSession from '../../Server/Session/SessionProvider';
import { useApp } from '../../context/AppContext';
import LogoCult from '../../assets/logoCompletoB.png';
import simpleB from '../../assets/logoSimpleB.png';

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
        <div className={` sm:absolute sm:z-10 font-[Roboto] font-semibold max-sm:py-1 rounded-b-md sm:pb-3 sm:rounded-e-xl sm:h-full bg-[#1a1f1f] flex flex-col text-white max-sm:flex-row max-sm:w-full max-sm:h-fit ${isHover && !isSmall ? 'w-72':'w-16'}`} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            <div className={`flex max-sm:min-w-20 sm:w-full sm:min-h-10 sm:h-20 flex-row sm:flex-col gap-3 px-2 sm:pb-3 sm:pt-3 justify-center items-center sm:items-start`}>
                {isHover && !isSmall ? 
                    <img src={LogoCult} className='h-10'/>:
                    <img src={simpleB} className='h-10'/>}
                <div className='h-full w-[2px] sm:w-full sm:min-h-[2px] sm:h-[2px] rounded-full bg-[#49C27A]'/>
            </div>
            <div className='flex w-full sm:flex-col flex-row h-full items-center overflow-y-auto flex-grow-1 box-border gap-1 px-2 sm:min-w-16 '>
                <NavLink
                to="/supervisiones"
                className={({ isActive }) =>
                    `sm:w-full  flex flex-row items-center py-2 gap-2 px-3 rounded-lg ${
                    isActive ? 'bg-[#3f3f3f] text-[#49C27A]' : 'hover:bg-[#3f3f3f]  hover:text-[#49C27A] text-slate-300'
                    }`
                }>
                    <Icons.Home className="size-6"/>
                    {isSmall && <span>Supervisiones</span>}
                    {isHover && !isSmall && <span>Supervisiones</span>}
                </NavLink>
                <NavLink
                to="/predios"
                className={({ isActive }) =>
                    `sm:w-full flex flex-row items-center py-2 gap-2 px-3 rounded-lg ${
                     isActive ? 'bg-[#3f3f3f] text-[#49C27A]' : 'hover:bg-[#3f3f3f] hover:text-[#49C27A] text-slate-300'
                    }`
                }>
                    <Icons.Properties className='size-6'/>
                     {isSmall &&<span>Predios</span>}      
                     {isHover && !isSmall &&<span>Predios</span>}        
                </NavLink>
                <NavLink
                to="/galeria"
                className={({ isActive }) =>
                    `sm:w-full flex flex-row items-center py-2 gap-2 px-3 rounded-lg ${
                     isActive ? 'bg-[#3f3f3f] text-[#49C27A]' : 'hover:bg-[#3f3f3f]  hover:text-[#49C27A] text-slate-300'
                    }`
                }>
                    <Icons.Gallery className='size-6'/>
                     {isSmall &&<span>Galeria</span>}
                     {isHover && !isSmall &&<span>Galeria</span>}
                </NavLink>
                <NavLink
                to="/precios"
                className={({ isActive }) =>
                    `sm:w-full flex flex-row items-center py-2 gap-2 px-3 rounded-lg ${
                     isActive ? 'bg-[#3f3f3f] text-[#49C27A]' : 'hover:bg-[#3f3f3f] hover:text-[#49C27A] text-slate-300'
                    }`
                }>
                    <Icons.Prices className='size-6'/>
                     {isSmall &&<span>Precios</span>}
                     {isHover && !isSmall &&<span>Precios</span>}
                </NavLink>
                <NavLink
                to="/ofertas"
                className={({ isActive }) =>
                    `sm:w-full flex flex-row items-center py-2 gap-2 px-3 rounded-lg ${
                     isActive ? 'bg-[#3f3f3f] text-[#49C27A]' : 'hover:bg-[#3f3f3f] hover:text-[#49C27A] text-slate-300'
                    }`
                }>
                    <Icons.Offers className='size-6'/>
                     {isSmall &&<span>Ofertas</span>}
                     {isHover && !isSmall &&<span>Ofertas</span>}
                </NavLink>
                <NavLink
                to="/ventas"
                className={({ isActive }) =>
                    `sm:w-full flex flex-row items-center py-2 gap-2 px-3 rounded-lg ${
                     isActive ? 'bg-[#3f3f3f] text-[#49C27A]' : 'hover:bg-[#3f3f3f] hover:text-[#49C27A] text-slate-300'
                    }`
                }>
                    <Icons.Sales className='size-6'/>
                     {isSmall &&<span>Ventas</span>}
                     {isHover && !isSmall &&<span>Ventas</span>}
                </NavLink>
                <NavLink
                to="/inversores"
                className={({ isActive }) =>
                    `sm:w-full flex flex-row items-center py-2 gap-2 px-3 rounded-lg ${
                     isActive ? 'bg-[#3f3f3f] text-[#49C27A]' : 'hover:bg-[#3f3f3f] hover:text-[#49C27A] text-slate-300'
                    }`
                }>
                    <Icons.Investor className='size-6'/>
                     {isSmall &&<span>Inversores</span>}
                     {isHover && !isSmall &&<span>Inversores</span>}
                </NavLink>
                <NavLink
                to="/asesores"
                className={({ isActive }) =>
                    `sm:w-full flex flex-row items-center py-2 gap-2 px-3 rounded-lg ${
                     isActive ? 'bg-[#3f3f3f] text-[#49C27A]' : 'hover:bg-[#3f3f3f] hover:text-[#49C27A] text-slate-300'
                    }`
                }>
                    <Icons.Advisor className='size-6'/>
                     {isSmall &&<span>Asesores</span>}
                     {isHover && !isSmall &&<span>Asesores</span>}
                </NavLink>
                <NavLink
                to="/jimas"
                className={({ isActive }) =>
                    `sm:w-full flex flex-row items-center py-2 gap-2 px-3 rounded-lg ${
                     isActive ? 'bg-[#3f3f3f] text-[#49C27A]' : 'hover:bg-[#3f3f3f] hover:text-[#49C27A] text-slate-300'
                    }`
                }>
                    <Icons.jimated className='size-6'/>
                     {isSmall &&<span>Jimas</span>}
                     {isHover && !isSmall &&<span>Jimas</span>}
                </NavLink>
                <NavLink
                to="/pagosSalientes"
                className={({ isActive }) =>
                    `sm:w-full flex flex-row items-center py-2 gap-2 px-3 rounded-lg ${
                     isActive ? 'bg-[#3f3f3f] text-[#49C27A]' : 'hover:bg-[#3f3f3f] hover:text-[#49C27A] text-slate-300'
                    }`
                }>
                    <Icons.PagosS className='size-6'/>
                     {isSmall &&<span>Pagos Salientes</span>}
                     {isHover && !isSmall &&<span>Pagos Salientes</span>}
                </NavLink>         
            </div>
            <div className='flex sm:w-full h-fit flex-col items-center px-2'>
                <button className='w-full flex rounded-lg flex-row items-center gap-2 p-3 hover:bg-[#3f3f3f] hover:text-[#49C27A] text-slate-300 ' 
                onClick={()=>{
                    setIsHover(false)
                    setFilterStateSupervisions('Pendiente')
                    setFilterStateOffers(true)
                    setFilterStatePrices(true)
                    logout()}}>
                    <Icons.LogOut className='size-6'/>
                    {isSmall &&<span>Salir</span>}
                    {isHover && !isSmall &&<span>Salir</span>}
                </button>
            </div>
       </div>
    )
}

export default AppBar