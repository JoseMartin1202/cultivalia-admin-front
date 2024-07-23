import React from 'react'
import ImagenP from "../../assets/PerfilPrueba.png";
import { Icons } from '../../constants/Icons';
import  { Link, useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

export const AppBar = () => {
    return(
        <div className='min-w-fit h-full bg-[#279E54] p-3 flex flex-col text-white items-center'>
            <div className='flex flex-col gap-8 items-center'>
                <img src={ImagenP} className='size-14 rounded-full border-cyan-100 border-[3px]'/>
                <Link to="/home" ><Icons.Home className='size-10'/></Link>
                <Link to="/contract" ><Icons.Contrato className='size-10'/></Link>
                <Link to="/report"><Icons.Report className='size-10'/></Link>
                <Link to="/supervisions"><Icons.Eye className='size-10'/></Link>
            </div>
            <div className='mt-auto'><Icons.LogOut className='size-10'/></div>
       </div>
    )
}

export default AppBar