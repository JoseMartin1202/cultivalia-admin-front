import {React, useState} from 'react'
import { Icons } from '../constants/Icons';
import LogoCult from '../assets/cultivaliaLogo.png';

const EstadoView = ({state}) => {
    
    switch (state) {
        case "Validada": case "Si":
            return(
                <span className='flex flex-row total-center gap-2 max-sm:flex-col'>
                    {state}
                    <Icons.Accepted className='text-[#279E54] size-5'/>
                </span>
            );

        case "Rechazada": case "No":
            return(
                <span className='flex flex-row total-center gap-2 max-sm:flex-col'>
                    {state}
                    <Icons.Refused className='text-[#E04646] size-5'/>
                </span>
            );
            
        case "Pendiente":
            return(
                <span className='flex flex-row total-center gap-2 max-sm:flex-col'>
                    {state}
                    <Icons.Wait className='text-[#6B9DFF] size-5'/>
                </span>
            );

        case "Vigente":
            return(
                <span className='flex flex-row total-center gap-1 max-sm:flex-col'>
                    {state}
                    <Icons.Current className='text-[#6B9DFF] size-6'/>
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
                <span className='total-center'>
                    <img src={LogoCult} className='size-6'/>
                </span>
            );

        case "Indirecta":
            return(
                <span className='total-center'>
                    <Icons.OfferIndirect className='text-[#5B5B5B] size-6'/>
                </span>
            );

        case "jimada":
            return(
                <span className='total-center gap-2'>
                    <p>Si</p>
                    <Icons.jimated className='text-yellow-600 size-5'/>
                </span>
            );

        case "actual":
            return(
                <span className='total-center gap-2'>
                    <p>Si</p>
                    <Icons.Complete className='text-[#279E54] size-5'/>
                </span>
            );

        case "NoActual":
            return(
                <span className='total-center'>
                    <p>No</p>
                </span>
            );

        case "NoJimada":
            return(
                <span className='total-center'>
                    <p>No</p>
                </span>
            );

        case "Cancelada":
            return(
                <span className='flex flex-row total-center gap-2 max-sm:flex-col'>
                    {state}
                    <Icons.Cancel className='text-orange-400 size-6'/>
                </span>
            );

        default://Finalizada
            return(
                <span className='flex flex-row total-center gap-2 max-sm:flex-col'>
                    {state}
                    <Icons.Complete className='text-[#279E54] size-6'/>
                </span>
            );
    }
}

export default EstadoView