import {React, useState} from 'react'
import { Icons } from '../constants/Icons';
import LogoCult from '../assets/cultivaliaLogo.png';

const EstadoView = ({state}) => {
    
    switch (state) {
        case "Validada":
            return(
                <span className='flex flex-row total-center gap-2 max-sm:flex-col'>
                    {state}
                    <Icons.Accepted className='text-[#279E54] size-5'/>
                </span>
            );

        case "Rechazada":
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

        default://Finalizada
            return(
                <span className='flex flex-row total-center gap-2 max-sm:flex-col'>
                    {state}
                    <Icons.Complete className='text-[#279E54] size-6'/>
                </span>
            );
            break;
    }
}

export default EstadoView