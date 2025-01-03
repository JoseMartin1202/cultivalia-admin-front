import {React, useState} from 'react'
import { Icons } from '../constants/Icons';
import '../index.css'

const Filter = ({data, formik, opt }) => {
    const [bouncingIndex, setBouncingIndex] = useState(null);
    
    const handleClick = (value,index) => {
        formik.setFieldValue('estado', value);
        setBouncingIndex(index);
        setTimeout(() => {
            setBouncingIndex(null);
          }, 400);
    };

    return (
        <div className='border-gray-400/70 sm:max-w-80 md:max-w-96 lg:max-w-full shadow border-2 flex flex-row rounded-lg py-1 px-3 gap-2 overflow-x-auto items-center' >
                <Icons.Filter className=' size-4 min-w-4'/>
                {data.map((item, index) => (
                    <button
                    key={index}
                    className={`whitespace-nowrap text-ellipsis py-1 px-2 font-semibold 
                        ${opt === item.value ? ' text-black bg-[#49C27A]/80 shadow rounded-xl' : 'text-[#696969]'}
                        ${bouncingIndex === index ? 'bounce' : ''}`}
                    onClick={() => handleClick(item.value,index)}
                    >
                    {item.name}
                    </button>
                ))}
        </div>
    );

}

export default Filter