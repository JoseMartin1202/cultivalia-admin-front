import React from 'react'
import { Icons } from '../../constants/Icons';

const InputSearch = () => {

    return (
        <div className='flex flex-row relative items-center w-full' >
            <input className='font-[Roboto] focus:ring-1 focus:outline-none focus:border-sky-500 w-full rounded-2xl border-2 border-[#696969] py-2 ps-2 pe-10' placeholder='Buscar...'/>
            <button className='absolute right-2'><Icons.Search className='size-8'/></button>
        </div>
    );

}

export default InputSearch