import React from 'react'
import { Icons } from '../../constants/Icons';

const InputLogin = ({message,Icon,password}) => {

    return (
        <div className='flex flex-row relative items-center w-full' >
            <input 
            type={`${password ? 'password':'text'}`}
            className='shadow-lg shadow-black/40 w-full rounded-2xl border-2 py-2 ps-10 pe-2 focus:ring-4 focus:ring-[#FFD34B] focus:ring-opacity-50 focus:outline-none focus:border-[#FFD34B]'
            placeholder={message}/>
            {Icon ? <Icon className='size-7 absolute left-2'/>: null}
        </div>
    );

}

export default InputLogin