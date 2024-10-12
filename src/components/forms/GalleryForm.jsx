import React, { useEffect, useState } from 'react'
import InputForm from '../inputs/inputForm'
import useGalleries from '../../Server/Gallery/GalleriesProvider'
import { useFormik } from 'formik'
import * as Yup from 'yup';

const GalleryForm = ({close,formRef, setIsSubmitting}) => {
    const { galerryAdd,galerryAddStatus } = useGalleries() 

    useEffect(() => {
        if (galerryAddStatus === 'success') {
            setIsSubmitting(false)
            close();
        }
    }, [galerryAddStatus]);

    const formik = useFormik({
        initialValues: {titulo: ''},
        validationSchema: Yup.object().shape({
          titulo: Yup.string().required('Obligatorio')
        }),
        onSubmit: async (values) => {
            galerryAdd(values)
        }
    })

    return (
    <form ref={formRef} onSubmit={formik.handleSubmit} className='p-6 flex flex-row max-sm:flex-col w-full items-center sm:gap-3'>
        <p className='font-bold'>Titulo:</p>
        {console.log(formRef)}
        <InputForm formik={formik} id="titulo" name="titulo"/>
    </form>
  )
}

export default GalleryForm