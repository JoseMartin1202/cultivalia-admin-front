import React, { useEffect, useState } from 'react'
import InputForm from '../inputs/inputForm'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import useAnio from '../../Server/Prices/AnioProvider';

const AnioForm = ({close,formRef, setIsSubmitting}) => {
    const { anioAdd,anioAddStatus } = useAnio() 

    useEffect(() => {
        if (anioAddStatus === 'success') {
            setIsSubmitting(false)
            close();
        }
    }, [anioAddStatus]);

    const formik = useFormik({
        initialValues: {anio: ''},
        validationSchema: Yup.object().shape({
          anio: Yup.string().required('Requerido')
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true) 
            anioAdd(values)
        }
    })

    return (
    <form ref={formRef} onSubmit={formik.handleSubmit} className='p-4 flex flex-row max-sm:flex-col w-full items-center sm:gap-3'>
        <p className='font-bold'>Año:</p>
        <InputForm formik={formik} id="anio" name="anio" number={true} preventSigns={true}/>
    </form>
  )
}

export default AnioForm