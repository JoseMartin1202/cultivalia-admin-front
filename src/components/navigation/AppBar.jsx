import {React, useState, useEffect } from 'react'
import { Icons } from '../../constants/Icons';
import  { Link, useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import '../../index.css';

export const AppBar = () => {
    //<img src={ImagenP} className='size-14 rounded-full border-cyan-100 border-[3px]'/>
    const [selectedOption,setSelectedOption]=useState(0);
    const [isHover,setIsHover]=useState(false);
    const [isSmall,setIsSmall]=useState(false);
    const [hoverSmall,setHoverSmall]=useState([false,false,false,false,false,false]);
    const isSmallScreen = useMediaQuery({ query: '(max-width: 640px)' });

    useEffect(() => {
      if (isSmallScreen) {
         setIsSmall(true);
      }else{
        setIsSmall(false);
        setHoverSmall(hoverSmall.map(() => false));
      }
    }, [isSmallScreen]);

    function handleMouse(index) {
        if(isSmall){
            setHoverSmall(anterior=>{
                const newValues=[...anterior]
                newValues[index]=!newValues[index]
                return newValues;
            })
        }
    };

    // Si estás en la ruta de login, no renderices el AppBar
    if (location.pathname === '/login') {
        return null;
    }

    function selected(value){
        if(selectedOption==value)
            return 'bg-[#49C27A]';
        else
            return '';
    }

    return(
        <div className='sm:absolute sm:z-10 font-[arial] sm:min-w-fit sm:h-full bg-[#279E54] flex flex-col text-white max-sm:flex-row max-sm:w-full max-sm:h-fit' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            <div className='flex w-full flex-col items-center max-sm:flex-row sm:h-full max-sm:h-fit overflow-auto'>
                <Link to="/supervisiones" className={`navItem sm:w-full flex flex-row items-center gap-2 p-3 ${selected(0)}`} onClick={()=>setSelectedOption(0)} onMouseEnter={()=>handleMouse(0)} onMouseLeave={()=>handleMouse(0)}>
                    <Icons.Home className='size-8'/>
                    {isHover && !isSmall && <span>Supervisiones</span>}
                    {hoverSmall[0] && <span>Supervisiones</span>}
                </Link>
                <Link to="/predios" className={`navItem sm:w-full flex flex-row items-center gap-2 p-3 ${selected(1)}`} onClick={()=>setSelectedOption(1)} onMouseEnter={()=>handleMouse(1)} onMouseLeave={()=>handleMouse(1)}>
                    <Icons.Properties className='size-8'/>
                    {isHover && !isSmall && <span>Predios</span>}
                    {hoverSmall[1] && <span>Predios</span>}
                </Link>
                <Link to="/galeria" className={`navItem sm:w-full flex flex-row items-center gap-2 p-3 ${selected(2)}`} onClick={()=>setSelectedOption(2)} onMouseEnter={()=>handleMouse(2)} onMouseLeave={()=>handleMouse(2)}>
                    <Icons.Gallery className='size-8'/>
                    {isHover && !isSmall && <span>Galeria</span>}
                    {hoverSmall[2] && <span>Galeria</span>}
                </Link>
                <Link to="/precios" className={`navItem sm:w-full flex flex-row items-center gap-2 p-3 ${selected(3)}`} onClick={()=>setSelectedOption(3)} onMouseEnter={()=>handleMouse(3)} onMouseLeave={()=>handleMouse(3)}>
                    <Icons.Prices className='size-8'/>
                    {isHover && !isSmall && <span>Precios</span>}
                    {hoverSmall[3] && <span>Precios</span>}
                </Link>
                <Link to="/contratos" className={`navItem sm:w-full flex flex-row items-center gap-2 p-3 ${selected(4)}`} onClick={()=>setSelectedOption(4)} onMouseEnter={()=>handleMouse(4)} onMouseLeave={()=>handleMouse(4)}>
                    <Icons.Contract className='size-8'/>
                    {isHover && !isSmall && <span>Contratos</span>}
                    {hoverSmall[4] && <span>Contratos</span>}
                </Link>
                <Link to="/ofertas" className={`navItem sm:w-full flex flex-row items-center gap-2 p-3 ${selected(5)}`} onClick={()=>setSelectedOption(5)} onMouseEnter={()=>handleMouse(5)} onMouseLeave={()=>handleMouse(5)}>
                    <Icons.Offers className='size-8'/>
                    {isHover && !isSmall && <span>Ofertas</span>}
                    {hoverSmall[5] && <span>Ofertas</span>}
                </Link>
                <button className='sm:mt-auto max-sm:ms-auto sm:w-full flex flex-row items-center gap-2 p-3'><Icons.LogOut className='size-8'/>{isHover && !isSmall &&<span>Salir</span>}</button>
            </div>
       </div>
    )
}

export default AppBar