import React, { useState } from 'react'
import { Icons } from '../../constants/Icons';
import { valueFromId } from '../../constants/functions';

const InputLogin = ({ id, formik, onChangeExtra, message, Icon, password,number}) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e) => {
        formik.handleChange(e)
        onChangeExtra && onChangeExtra(true)
    }

    const handleBlur = (e) => {
        formik.handleBlur(e)
        setIsFocused(false);
    }

    const handleFocus = () => {
        setIsFocused(true); // Cuando el input recibe el foco
    };

    const error = valueFromId(id, formik.errors)
    const touched = valueFromId(id, formik.touched)
    const showError = error && (touched || formik.submitCount > 0);

    return (
        <div className='flex flex-col w-full'>
            <div className='flex flex-row relative items-center w-full' >
                <input 
                id={id}
                name={id}
                value={formik?.values[id] || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                type={`${password ? 'password': number ? 'numeric':'text'}`}
                className=' border-gray-400/70  shadow-inner font-[Roboto] w-full rounded-2xl border-2 py-2 ps-10 pe-2 focus:outline-none'
                placeholder={message}/>
                <Icon  className={`size-5 absolute left-2 ${isFocused ? 'text-blue-500' : 'text-black'}`}/>
            </div>
            {showError &&
            <div className='h-4 pt-4'>
                <p className='font-bold text-xl flex items-center gap-1 h-full italic text-red-400 '>
                    <Icons.Alert size="14px" />
                    {error}
                </p>
            </div>
            }
     </div>
    );

}

export default InputLogin