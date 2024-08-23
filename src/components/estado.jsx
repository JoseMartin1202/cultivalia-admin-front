import {React, useState} from 'react'
import { Icons } from '../constants/Icons';

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
    
        default://Pendiente
            return(
                <span className='flex flex-row total-center gap-2 max-sm:flex-col'>
                    {state}
                    <Icons.Wait className='text-[#6B9DFF] size-5'/>
                </span>
            );
            break;
    }
}

export default EstadoView