import React from 'react'
import { Icons } from '../../constants/Icons';


const InputSearch = () => {

    return (
        <div className='m-2 flex flex-row relative items-center' >
            <input className='focus:ring-1 focus:outline-none focus:border-sky-500 w-full rounded-[1rem] border-2 border-[#696969] py-2 ps-2 pe-8' placeholder='Buscar...'/>
            <Icons.Search className='absolute right-2 size-6'/>
        </div>
    );

}

export default InputSearch