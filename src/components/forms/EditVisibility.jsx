import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import useOffer from '../../Server/Offers/OfferProvider';
import CustomSelect from '../CustomSelect';
import { Icons } from '../../constants/Icons';
import Loader from '../Loader';

const EditVisibilityForm = ({item,close,formRef, setIsSubmitting}) => {
    const { updateVisibilityOffer,updateVisibilityOfferStatus } = useOffer(null,item.id) 

    useEffect(() => {
        if (updateVisibilityOfferStatus === 'success') {
            setIsSubmitting(false)
            close();
        }
    }, [updateVisibilityOfferStatus]);

    const formik = useFormik({
        initialValues: item.is_visible=='Visible' ? 
            {is_visible: false,
            estado: 'Finalizada'}
            :
            {is_visible: true,}
        ,
        validationSchema: Yup.object().shape({
            is_visible: Yup.boolean().required(),
            estado: Yup.string().notRequired(),
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true) 
            updateVisibilityOffer(values)

        }
    }) 
  
    return (
    <form ref={formRef} onSubmit={formik.handleSubmit} className='p-4'>
        {updateVisibilityOfferStatus === 'pending' ?
            <Loader/>
        :
        <div className='size-full total-center flex flex-col gap-3 text-center'>
            {item.is_visible=='Visible' ?
                <><p className='text-[20px] '>¿Deseas cancelar la oferta seleccionada?</p>
                <p className='text-lg '>Nota: se retornarán las plantas <br/>al predio correspondiente de la oferta</p>
                <p className='text-lg text-red-500 font-bold'>Esta acción no se puede deshacer</p></>
                :
                <><p className='text-[20px] '>¿Deseas hacer visible<br/>la oferta seleccionada?</p>
                <Icons.Eye className='size-12 text-[#6B9DFF]'/></>
            }
        </div>}
    </form>
  )
}

export default EditVisibilityForm