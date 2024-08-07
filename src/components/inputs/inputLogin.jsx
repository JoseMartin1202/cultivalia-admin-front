import React from 'react'
import { Icons } from '../../constants/Icons';
import { valueFromId } from '../../constants/functions';

const InputLogin = ({ id, formik, onChangeExtra, message, Icon, password, ...props}) => {

    const handleChange = (e) => {
        console.log(e.target.value)
        formik.handleChange(e)
        onChangeExtra && onChangeExtra(true)
    }

    const handleBlur = (e) => {
        formik.handleBlur(e)
    }
    const value = valueFromId(id, formik.values)
    const error = valueFromId(id, formik.errors)
    const touched = valueFromId(id, formik.touched)

    const showError = error && (touched || formik.submitCount > 0);

    return (
        <div className='flex flex-col w-full'>
            <div className='flex flex-row relative items-center w-full' >
                <input 
                id={id}
                name={id}
                value={value || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                type={`${password ? 'password':'text'}`}
                className='shadow-lg shadow-black/40 w-full rounded-2xl border-2 py-2 ps-10 pe-2 focus:ring-[3px] focus:ring-[#FFD34B] focus:ring-opacity-50 focus:outline-none focus:border-[#FFD34B]'
                placeholder={message}/>
                {Icon ? <Icon className='size-7 absolute left-2'/>: null}
            </div>
            {showError &&
            <div className='h-4 pt-4'>
                <p className='font-normal text-lg flex items-center gap-1 h-full italic text-red-500 '>
                    <Icons.Alert size="14px" />
                    {error}
                </p>
            </div>
            }
     </div>
    );

}

export default InputLogin