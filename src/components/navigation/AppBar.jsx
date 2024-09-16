import {React, useState, useEffect } from 'react'
import { Icons } from '../../constants/Icons';
import  { Link, useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import '../../index.css';
import useSession from '../../Server/Session/SessionProvider';
import { useApp } from '../../context/AppContext';

export const AppBar = () => {
    //<img src={ImagenP} className='size-14 rounded-full border-cyan-100 border-[3px]'/>
    const [selectedOption,setSelectedOption]=useState(0);
    const [isHover,setIsHover]=useState(false);
    const [isSmall,setIsSmall]=useState(false);
    const [hoverSmall,setHoverSmall]=useState(Array(6).fill(false));
    const isSmallScreen = useMediaQuery({ query: '(max-width: 639.9px)' });
    const { setFilterStateSupervisions,setFilterStateOffers,setFilterStatePrices } = useApp();
    const { logout } = useSession();

    useEffect(() => {
      if (isSmallScreen) {
         setIsSmall(true);
      }else{
        setIsSmall(false);
        setHoverSmall(hoverSmall.map(() => false));
      }
    }, [isSmallScreen]);

    
    // Si estás en la ruta de login, no renderices el AppBar
    if (location.pathname === '/login') {
        return null;
    }

    function selected(value){
        if(selectedOption==value)
            return 'bg-[#c3edd3] text-[#279E54]';
        else
            return 'hover:bg-[#73d79b] hover:text-white';
    }

    return(
        <div className='sm:absolute sm:z-10 font-[arial] sm:min-w-fit sm:h-full bg-[#279E54] flex flex-col text-white max-sm:flex-row max-sm:w-full max-sm:h-fit' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            <div className='flex w-full flex-col items-center max-sm:flex-row sm:h-full max-sm:h-fit overflow-auto'>
                <Link to="/supervisiones" className={`sm:w-full flex flex-row items-center gap-2 p-3 ${selected(0)}`} onClick={()=>setSelectedOption(0)} >
                    <Icons.Home className='size-8'/>
                     {isSmall && <span>Supervisiones</span>}
                     {isHover && !isSmall && <span>Supervisiones</span>}
                </Link>
                <Link to="/predios" className={` sm:w-full flex flex-row items-center gap-2 p-3 ${selected(1)}`} onClick={()=>setSelectedOption(1)}>
                    <Icons.Properties className='size-8'/>
                     {isSmall &&<span>Predios</span>}      
                     {isHover && !isSmall &&<span>Predios</span>}        
                </Link>
                <Link to="/galeria" className={`sm:w-full flex flex-row items-center gap-2 p-3 ${selected(2)}`} onClick={()=>setSelectedOption(2)} >
                    <Icons.Gallery className='size-8'/>
                     {isSmall &&<span>Galeria</span>}
                     {isHover && !isSmall &&<span>Galeria</span>}
                </Link>
                <Link to="/precios" className={`sm:w-full flex flex-row items-center gap-2 p-3 ${selected(3)}`} onClick={()=>setSelectedOption(3)}>
                    <Icons.Prices className='size-8'/>
                     {isSmall &&<span>Precios</span>}
                     {isHover && !isSmall &&<span>Precios</span>}
                </Link>
                <Link to="/contratos" className={`sm:w-full flex flex-row items-center gap-2 p-3 ${selected(4)}`} onClick={()=>setSelectedOption(4)}>
                    <Icons.Contract className='size-8'/>
                     {isSmall &&<span>Contratos</span>}
                     {isHover && !isSmall &&<span>Contratos</span>}
                </Link>
                <Link to="/ofertas" className={`sm:w-full flex flex-row items-center gap-2 p-3 ${selected(5)}`} onClick={()=>setSelectedOption(5)}>
                    <Icons.Offers className='size-8'/>
                     {isSmall &&<span>Ofertas</span>}
                     {isHover && !isSmall &&<span>Ofertas</span>}
                </Link>
                <button className='sm:mt-auto max-sm:ms-auto sm:w-full flex flex-row items-center gap-2 p-3 hover:bg-[#73d79b] hover:text-white ' 
                onClick={()=>{
                    setHoverSmall(Array(6).fill(false));
                    setIsHover(false)
                    setSelectedOption(0)
                    setFilterStateSupervisions('Pendiente')
                    setFilterStateOffers('')
                    setFilterStatePrices('')
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