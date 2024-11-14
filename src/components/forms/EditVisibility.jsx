import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import useOffer from '../../Server/Offers/OfferProvider';
import CustomSelect from '../CustomSelect';
import { Icons } from '../../constants/Icons';

const EditVisibilityForm = ({item,close,formRef, setIsSubmitting}) => {
    const { updateVisibilityOffer,updateVisibilityOfferStatus } = useOffer(null,item.id) 
    const estadoOptions = [{value:true, label: "Visible"},{value:false, label: "No visible"}]

    useEffect(() => {
        if (updateVisibilityOfferStatus === 'success') {
            setIsSubmitting(false)
            close();
        }
    }, [updateVisibilityOfferStatus]);

    const formik = useFormik({
        initialValues: {is_visible: false},
        validationSchema: Yup.object().shape({
            is_visible: Yup.boolean().required('Obligatorio')
        }),
        onSubmit: async (values) => {
            updateVisibilityOffer(values)
        }
    })

    return (
    <form ref={formRef} onSubmit={formik.handleSubmit} className='p-2 h-32'>
        <div className='size-full total-center flex flex-col gap-3 text-center'>
            <p className='text-[20px] '>¿Deseas hacer visible<br/>la oferta seleccionada?</p>
            <Icons.Eye className='size-12 text-[#6B9DFF]'/>
        </div>
    </form>
  )
}

export default EditVisibilityForm