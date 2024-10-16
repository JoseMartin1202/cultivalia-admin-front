import React, { useEffect, useState } from 'react'
import InputForm from '../inputs/inputForm'
import useYears from '../../Server/Year/YearsProvider';
import { Icons } from '../../constants/Icons';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import usePrice from '../../Server/Prices/PriceProvider';
import CustomSelect from '../CustomSelect';

const PricesForm = ({close,formRef, setIsSubmitting}) => {
    const { years, yearsStatus } = useYears()
    const { priceAdd, priceAddStatus } =usePrice() 

    useEffect(() => {
        if (priceAddStatus === 'success') {
            setIsSubmitting(false)
            close();
        }
    }, [priceAddStatus]);

    const formik = useFormik({
        initialValues: {
            precio: '',
            anio:'',
            isJimated:false,
            isCurrent:true
        },
        validationSchema: Yup.object().shape({
            precio: Yup.number().test(
                'is-greater-than-0',
                'No válido',
                function (value) {
                  return value > 0;
                }
            ),
            anio: Yup.string().required('Obligatorio'),
            isJimated: Yup.boolean().required('Obligatorio')
        }),
        onSubmit: async (values) => {
            priceAdd(values)
        }
    })

    useEffect(() => {
        if (yearsStatus === "success") {
            const yearSelected = years.find(y => y.anio == formik.values.anio);
            if (yearSelected) {
                formik.setFieldValue('anio', yearSelected.id)
            } else {
                formik.setFieldValue('anio', years[0].id);
            }
        }
    }, [yearsStatus, years]);

    const anios = years?.map(y => ({
        value: y.id,
        label: y.anio
    }));

    return (
        <form ref={formRef} onSubmit={formik.handleSubmit} className='p-2 flex flex-col w-full items-center gap-3'>
            <div className='flex flex-col w-full'>
                <p className='font-bold'>Precio:</p>
                <InputForm formik={formik} id="precio" name="precio" number={true} />
            </div>
            {console.log( formRef)}
            <div className='flex flex-col w-full'>
                <p className='font-bold'>Año:</p>
                <CustomSelect
                    options={anios}
                    value={formik.values.anio}
                    onChange={(val) => formik.setFieldValue('anio', val)}
                />  
            </div>
            <div className='flex flex-col w-full'>
                <p className='font-bold'>Es jimada:</p>
                <div className='relative w-full min-w-fit'>
                    <select
                        className={`size-full py-2 appearance-none block border-gray-300 border-2 px-4 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500`}
                        onChange={formik.handleChange}
                        id="isJimated"
                        name="isJimated"
                        value={formik.values.isJimated}
                    >
                        <option value={true}>Si</option>
                        <option value={false}>No</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700">
                        <Icons.ArrowDown className='size-[80%]' />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PricesForm