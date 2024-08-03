import {React, useState} from 'react'
import { Icons } from '../constants/Icons';

const Filter = ({data}) => {

    const [selectedOption,setSelectedOption]=useState(0);

    return (
        <div className='bg-white flex w-full rounded-[1rem] border-2 border-[#696969] py-1 px-3 sm:min-w-fit sm:w-fit overflow-x-auto max-sm:items-center' >
            <div className='flex flex-row w-auto gap-2 items-center'>
                <Icons.Filter className=' size-6'/>
                {data.map((item, index) => (
                    <button
                    key={item.value}
                    className={`py-1 px-2 font-bold ${selectedOption === index ? ' text-white bg-[#49C27A] rounded-lg' : 'text-[#696969]'}`}
                    onClick={() => setSelectedOption(index)}
                    >
                    {item.name}
                    </button>
                ))}
            </div>
        </div>
    );

}

export default Filter