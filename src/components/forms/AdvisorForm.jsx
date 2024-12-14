import React, { useEffect, useState } from 'react'
import InputForm from '../inputs/inputForm'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import useAdvisor from '../../Server/Advisors/AdvisorProvider';

const AdvisorForm = ({close,formRef, setIsSubmitting,item}) => {
    const { advisorAdd,advisorUpdate,advisorAddStatus,advisorUpdateStatus } = useAdvisor(item?.id) 

    useEffect(() => {
        console.log(advisorAddStatus)
        if (advisorAddStatus === 'success' || advisorUpdateStatus === 'success') {
            setIsSubmitting(false)
            close();
        }
    }, [advisorAddStatus,advisorUpdateStatus]);

    const formik = useFormik({
        initialValues: {
            nombre: item?.nombre ?? '',
            apellidos: item?.apellidos ?? '',
            telefono: item?.telefono ?? ''
        },
        validationSchema: Yup.object().shape({
            nombre: Yup.string().required('Requerido'),
            apellidos: Yup.string().required('Requerido'),
            telefono: Yup.string().required('Requerido')
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true) 
            if(item){
                advisorUpdate(values)
            }else{
                advisorAdd(values)
            }
        }
    })

    return (
    <form ref={formRef} onSubmit={formik.handleSubmit} className='p-4 flex flex-col sm:w-80 items-center gap-3'>
        <div className='flex sm:flex-row flex-col sm:items-center sm:gap-3 w-full'>
            <p className='font-bold'>Nombre:</p>
            <InputForm formik={formik} id="nombre" name="nombre"/>
        </div>
        <div className='flex sm:flex-row flex-col sm:items-center sm:gap-3 w-full'>
            <p className='font-bold'>Apellidos:</p>
            <InputForm formik={formik} id="apellidos" name="apellidos"/>
        </div>
        <div className='flex sm:flex-row flex-col sm:items-center sm:gap-3 w-full'>
            <p className='font-bold'>Teléfono:</p>
            <InputForm formik={formik} id="telefono" name="telefono"/>
        </div>
    </form>
    )
}

export default AdvisorForm