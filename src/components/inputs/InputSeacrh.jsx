import React, { useRef, useState } from 'react'
import { Icons } from '../../constants/Icons';

const InputSearch = ({formik}) => {
    const [isFocused, setIsFocused] = useState(false); 
    const inputRef = useRef(null);

    const handleChange = (e) => {
        formik.handleChange(e)
    }

    const handleClear = () => {
        formik.setFieldValue('searchText', '');
        inputRef.current.focus();
    }

    return (
        <div className='flex flex-row relative items-center w-full' >
            <input 
            id='searchText'
            name='searchText'
            ref={inputRef}
            onChange={handleChange}
            value={formik?.values?.searchText || ''}
            onFocus={() => setIsFocused(true)}  
            onBlur={() => setIsFocused(false)} 
            className='border-gray-400/70 shadow-inner border-2 font-[Roboto] focus:outline-none w-full rounded-lg py-2 ps-2 pe-10' placeholder='Buscar...'/>
            {formik?.values?.searchText.length>0 ?
                <button className='absolute right-2' onClick={handleClear}>
                    <Icons.Clear className={`size-6 ${isFocused ? 'text-[#2b9a59]' : 'text-gray-400'} hover:cursor-pointer`}/>
                </button> :
                <span className='absolute right-2'>
                    <Icons.Search className={`size-6 ${isFocused ? 'text-gray-600' : 'text-gray-400'}`}/>
                </span>}
        </div>
    );

}

export default InputSearch