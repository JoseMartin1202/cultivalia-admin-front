import {React, useState} from 'react'
import { Icons } from '../constants/Icons';

const Filter = ({data, formik, opt }) => {

    
    const handleClick = (value) => {
        formik.setFieldValue('estado', value);
    };

    return (
        <div className='bg-white flex rounded-[1rem] border-2 border-[#696969] py-1 px-3  sm:w-fit overflow-x-auto max-sm:items-center' >
            <div className='flex flex-row w-full gap-2 items-center'>
                <Icons.Filter className=' size-6 min-w-6'/>
                {data.map((item, index) => (
                    <button
                    key={index}
                    className={`whitespace-nowrap py-1 px-2 font-bold ${opt === item.value ? ' text-white bg-[#49C27A] rounded-lg' : 'text-[#696969]'}`}
                    onClick={() => handleClick(item.value)}
                    >
                    {item.name}
                    </button>
                ))}
            </div>
        </div>
    );

}

export default Filter