import React, { useEffect, useState } from 'react'
import InputForm from '../inputs/inputForm'
const GalleryForm = ({formik}) => {
    return (
    <div className='p-6 flex flex-row max-sm:flex-col w-full items-center sm:gap-3'>
        <p className='font-bold'>Titulo:</p>
        <InputForm formik={formik} id="titulo" name="titulo"/>
    </div>
  )
}

export default GalleryForm