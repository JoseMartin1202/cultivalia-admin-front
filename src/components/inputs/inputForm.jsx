import React from 'react'
import { Icons } from '../../constants/Icons';
import { valueFromId } from '../../constants/functions';

const InputForm = ({ id, formik, onChangeExtra, message, password,number,preventSigns,descuento}) => {

    const handleChange = (e) => {
        formik.handleChange(e)
        onChangeExtra && onChangeExtra(true)
    }

    const handleKeyDown = (e) => {
        if (number && preventSigns && (e.key === '-' || e.key === '.')) {
            e.preventDefault();
        }
    };

    const handleBlur = (e) => {
        formik.handleBlur(e)
    }
    const error = valueFromId(id, formik.errors)
    const touched = valueFromId(id, formik.touched)
    const showError = error && (touched || formik.submitCount > 0);

    return (
        <div className='flex flex-col w-full'>
            <div className='flex flex-row w-full' >
                <input 
                id={id}
                name={id}
                value={descuento ? (formik?.values[id] ?? ''):(formik?.values[id] || '')}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                type={`${password ? 'password': number ? 'number':'text'}`}
                min={number ? "0" : undefined} 
                step={number ? "any" : undefined}
                className=' w-full rounded-[10px] border-2 p-2 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 focus:outline-none'
                placeholder={message}/>
            </div>
            {showError &&
            <div className='h-fit'>
                <p className='font-normal text-lg flex items-center gap-1 h-full italic text-red-500 '>
                    <Icons.Alert size="14px" />
                    {error}
                </p>
            </div>
            }
     </div>
    );

}

export default InputForm