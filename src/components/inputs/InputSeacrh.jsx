import React from 'react'
import { Icons } from '../../constants/Icons';

const InputSearch = ({formik}) => {

    const handleChange = (e) => {
        formik.handleChange(e)
    }

    return (
        <div className='flex flex-row relative items-center w-full' >
            <input 
            id='searchText'
            name='searchText'
            onChange={handleChange}
            value={formik?.values?.searchText || ''}
            className='font-[Roboto] focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 focus:outline-none w-full rounded-2xl border-2 border-[#696969] py-2 ps-2 pe-10' placeholder='Buscar...'/>
            {formik?.values?.searchText.length>0 ?<button className='absolute right-2' onClick={()=>formik.setFieldValue('searchText', '')}><Icons.Clear className='size-6 text-[#696969]'/></button> :<span className='absolute right-2'><Icons.Search className='size-6 text-[#696969]'/></span>}
        </div>
    );

}

export default InputSearch