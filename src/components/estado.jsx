import {React, useState} from 'react'
import { Icons } from '../constants/Icons';

const EstadoView = ({state}) => {
    
    switch (state) {
        case "Validada":
            return(
                <span className='flex flex-row total-center gap-2'>
                    {state}
                    <Icons.Accepted className='text-[#279E54] size-5'/>
                </span>
            );

        case "Rechazada":
            return(
                <span className='flex flex-row total-center gap-2'>
                    {state}
                    <Icons.Refused className='text-[#279E54] size-5'/>
                </span>
            );
    
        default://Pendiente
            return(
                <span className='flex flex-row total-center gap-2'>
                    {state}
                    <Icons.Wait className='text-[#279E54] size-5'/>
                </span>
            );
            break;
    }
}

export default EstadoView