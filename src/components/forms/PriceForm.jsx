import React, { useEffect, useState } from 'react'
import InputForm from '../inputs/inputForm'
import useYears from '../../Server/Year/YearsProvider';
import { Icons } from '../../constants/Icons';

const PricesForm = ({ formik }) => {
    const { years, yearsStatus } = useYears()

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
    return (
        <div className='p-2 flex flex-col w-full items-center gap-3'>
            <div className='flex flex-col w-full'>
                <p className='font-bold'>Precio:</p>
                <InputForm formik={formik} id="precio" name="precio" number={true} />
            </div>
            <div className='flex flex-col w-full'>
                <p className='font-bold'>Año:</p>
                <div className='relative w-full min-w-fit'>
                    <select
                        className={`size-full py-2 appearance-none block border-gray-300 border-2 px-4 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500`}
                        onChange={formik.handleChange}
                        id="anio"
                        name="anio"
                        value={formik.values.anio}
                    >
                        {
                            yearsStatus === 'success' && years?.length > 0 && (
                                <>{years.map((y, i) => (
                                    <option key={i} value={y.id}>{y.anio}</option>
                                ))}</>
                            )}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700">
                        <Icons.ArrowDown className='size-[80%]' />
                    </div>
                </div>
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
        </div>
    )
}

export default PricesForm