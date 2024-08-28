import React, { useEffect, useState } from 'react'
import { Icons } from '../../constants/Icons'
import InputForm from '../inputs/inputForm'
import useGalleries from '../../Server/Gallery/GalleriesProvider'
import useYears from '../../Server/Year/YearsProvider'

const GalleryForm = ({formik}) => {
    return (
    <div className='p-6 flex flex-row w-full items-center gap-3'>
        <p className='font-bold'>Titulo:</p>
        <InputForm formik={formik} id="titulo" name="titulo"/>
    </div>
  )
}

export default GalleryForm