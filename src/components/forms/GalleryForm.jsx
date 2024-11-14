import React, { useEffect, useState } from 'react'
import InputForm from '../inputs/inputForm'
import useGalleries from '../../Server/Gallery/GalleriesProvider'
import { useFormik } from 'formik'
import * as Yup from 'yup';

const GalleryForm = ({close,formRef, setIsSubmitting,gallery=null}) => {
    const { galerryAdd,galerryUpdate,galerryAddStatus,galerryUpdateStatus } = useGalleries(gallery) 

    useEffect(() => {
        if (galerryAddStatus === 'success' || galerryUpdateStatus === 'success') {
            setIsSubmitting(false)
            close();
        }
    }, [galerryAddStatus,galerryUpdateStatus]);

    const formik = useFormik({
        initialValues: {titulo: ''},
        validationSchema: Yup.object().shape({
          titulo: Yup.string().required('Obligatorio')
        }),
        onSubmit: async (values) => {
            if(gallery){
                galerryUpdate(values)
            }else{
                galerryAdd(values)
            }
        }
    })

    return (
    <form ref={formRef} onSubmit={formik.handleSubmit} className='p-6 flex flex-row max-sm:flex-col w-full items-center sm:gap-3'>
        <p className='font-bold'>Titulo:</p>
        <InputForm formik={formik} id="titulo" name="titulo"/>
    </form>
  )
}

export default GalleryForm