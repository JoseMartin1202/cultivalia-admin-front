import {React, useState} from 'react'
import { Icons } from '../constants/Icons';
import LogoCult from '../assets/cultivaliaLogo.png';

const EstadoView = ({state,option,fontlg}) => {
    // Verificar si el 'state' es un JSON (objeto)
    const isJson = (obj) => {
        try {
            // Si es un string, intentar parsearlo
            if (typeof obj === 'string') {
                JSON.parse(obj);
                return true;
            }
            // Si ya es un objeto, también es considerado JSON
            return typeof obj === 'object' && obj !== null;
        } catch (e) {
            return false;
        }
    };

    if (isJson(state)) {//ajustetiempo
        return(
            option==="anio" ? <span>{state.duracion_anios} años</span>:<span>{state.porcentaje_cultivalia}%</span>
        );
    }

    switch (state) {
        case "Validada": case "Completo": case "Activa":
            return(
                <span className={`flex flex-row gap-2 items-center ${fontlg && 'text-3xl'}`}>
                    <Icons.Accepted className={`text-[#279E54] ${fontlg ? 'size-6':'size-5'}`}/>
                    {state}
                </span>
            );

        case "Rechazada": case "Rechazado":
            return(
                <span className={`flex flex-row gap-2 items-center ${fontlg && 'text-3xl'}`}>
                    <Icons.Refused className={`text-[#E04646] ${fontlg ? 'size-6':'size-5'}`}/>
                    {state}
                </span>
            );
            
        case "Pendiente":  case "Pendiente de pago":
            return(
                <span className={`flex flex-row gap-2 items-center ${fontlg && 'text-3xl'}`}>
                    <Icons.Wait className={`text-[#6B9DFF] ${fontlg ? 'size-6':'size-5'}`}/>
                    {state}
                </span>
            );

        case "Ajustando":
            return(
                <span className={`flex flex-row gap-2 items-center ${fontlg && 'text-3xl'}`}>
                    <Icons.Wait className={`text-orange-400 ${fontlg ? 'size-6':'size-5'}`}/>
                    {state}
                </span>
            );

        case "Vigente":
            return(
                <span className='flex flex-row gap-1 items-center'>
                    <Icons.Current className='text-[#6B9DFF] size-6'/>
                    {state}
                </span>
            );

        case "Visible":
            return(
                <span className='text-[#6B9DFF] font-bold'>
                    {state}
                </span>
            );

        case "No visible":
            return(
                <span className='text-yellow-600 font-bold'>
                    {state}
                </span>
            );

        case "Directa":
            return(
                <span className=''>
                    <img src={LogoCult} className='size-6'/>
                </span>
            );

        case "Indirecta":
            return(
                <span className=''>
                    <Icons.OfferIndirect className='text-[#5B5B5B] size-6'/>
                </span>
            );

        case "jimada":
            return(
                <span className='flex flex-row items-center gap-2'>
                    <Icons.jimated className='text-yellow-600 size-5'/>
                    <p>Si</p>
                </span>
            );

        case "actual":
            return(
                <span className='flex flex-row items-center gap-2'>
                    <Icons.Complete className='text-[#279E54] size-5'/>
                    <p>Si</p>
                </span>
            );

        case "NoActual": case "NoJimada":
            return(
                <span className=''>
                    <p>No</p>
                </span>
            );

        case "Cancelada": case "Cancelado":
            return(
                <span className='flex flex-row items-center gap-2'>
                    <Icons.Cancel className='text-orange-400 size-6'/>
                    {state}
                </span>
            );
        
        case "Creado":
            return(
                <span className='flex flex-row items-center gap-1'>
                <Icons.UserCreated className='text-[#6B9DFF] size-6'/>
                {state}
            </span>
            );

        case "Revision":
            return(
                <span className='flex flex-row items-center gap-1'>
                    <Icons.UserRevision className='text-[#6B9DFF] size-6'/>
                    {state}
                </span>
            );

        case "Inactivo":
            return(
                <span className='flex flex-row items-center gap-1'>
                    <Icons.UserInactive className='text-gray-500 size-6'/>
                    {state}
                </span>
            );

        default://Finalizada
            return(
                <span className='flex flex-row items-center gap-2'>
                    <Icons.Complete className='text-[#279E54] size-6'/>
                    {state}
                </span>
            );
    }
}

export default EstadoView