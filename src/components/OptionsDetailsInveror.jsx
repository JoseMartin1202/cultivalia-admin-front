import {React, useState} from 'react'
import { Icons } from '../constants/Icons';
import '../index.css'
import AbsScroll from './AbsScroll';

const OptionsDetailsInveror = ({data, opt, setoption }) => {
    const [bouncingIndex, setBouncingIndex] = useState(null);
    
    const handleClick = (value,index) => {
        setoption(value)
        setBouncingIndex(index);
        setTimeout(() => {
            setBouncingIndex(null);
          }, 400);
    };

    return (
        <div className='h-16'>
            <AbsScroll horizontal>
                <div className='border-gray-400/70 max-w-full shadow border-2 flex flex-row rounded-lg py-1 px-2 gap-2 overflow-x-auto items-center' >
                    <Icons.SearchDetails className='size-6 min-w-6'/>
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
            </AbsScroll>
        </div>
    );

}

export default OptionsDetailsInveror