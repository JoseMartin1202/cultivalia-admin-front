import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { Icons } from '../../constants/Icons';
import Loader from '../Loader';
import useSale from '../../Server/Sales/SaleProvider';

const SalesCancelForm = ({item,close,formRef, setIsSubmitting}) => {
    const { sales,salesStatus } = useSale() 

    useEffect(() => {
        if (salesStatus === 'success') {
            setIsSubmitting(false)
            close();
        }
        //console.log(salesStatus)
    }, [salesStatus]);

    const formik = useFormik({
        initialValues: {},
        onSubmit: async () => {
            setIsSubmitting(true)
            sales(item.id)
        }
    }) 
  
    return (
    <form ref={formRef} onSubmit={formik.handleSubmit} className='p-4'>
        {salesStatus === 'pending' ?
            <Loader/>
        :
        <div className='size-full total-center flex flex-col gap-3 text-center'>
            {item.estado=='Pendiente' &&
                <><p className='text-[20px] '>¿Deseas cancelar la venta seleccionada?</p>
                <p className='text-lg '>Nota: se retornarán las plantas <br/>a la oferta o inversor corresponiente</p>
                <p className='text-lg text-red-500 font-bold'>Esta acción no se puede deshacer</p></>
            }
        </div>}
    </form>
  )
}

export default SalesCancelForm