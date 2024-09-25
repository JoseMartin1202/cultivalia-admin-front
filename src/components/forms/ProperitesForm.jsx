import React, { useEffect, useState } from 'react'
import { Icons } from '../../constants/Icons'
import InputForm from '../inputs/inputForm'
import useGalleries from '../../Server/Gallery/GalleriesProvider'
import useYears from '../../Server/Year/YearsProvider'

const PropertiesForm = ({formik}) => {

    const { galleries, galleriesStatus }= useGalleries()
    const { years, yearsStatus }= useYears()
    
    useEffect(() => {
       if (yearsStatus === "success" && galleriesStatus === "success") {
            const yearSelected= years.find(y => y.anio == formik.values.anio);
            if(yearSelected){
                formik.setFieldValue('anio', yearSelected.id)
            }else{
                formik.setFieldValue('anio', years[0].id);
            }
            const gallerySelected= galleries.find(g => g.titulo == formik.values.galeria);
            if(gallerySelected){
                formik.setFieldValue('galeria', gallerySelected.id)
            }else{
                formik.setFieldValue('galeria', 'ninguna');
            }
       }
    }, [yearsStatus, galleriesStatus, galleries, years]);

    return (
    <div className='p-6 flex flex-col w-full gap-3'>
        <div className='flex flex-row w-full gap-3 max-sm:flex-col'>
            <div className='flex-grow flex-col'>
                <p className='font-bold'>Nombre:</p>
                <InputForm formik={formik} id="nombre" name="nombre"/>
            </div>
            <div className='flex flex-col sm:w-32'>
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
                        yearsStatus==='success' && years?.length>0 && (
                            <>{years.map((y,i)=>(
                                <option  key={i} value={y.id}>{y.anio}</option>
                            ))}</>
                        )}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700">
                        <Icons.ArrowDown className='size-[80%]' />
                    </div>
                </div>
            </div>
        </div>
        <div className='flex flex-row w-full gap-3 max-sm:flex-col'>
            <div className='flex-1 flex-col'>
                <p className='font-bold '>Plantas totales:</p>
                <InputForm formik={formik} name="plantasTotales" id="plantasTotales" number={true} preventSigns={true}/>
            </div>
            <div className='flex-1 flex-col'>
                <p className='font-bold'>Plantas disponibles:</p>
                <InputForm formik={formik} name="plantasDisponibles" id="plantasDisponibles" number={true} preventSigns={true}/>
            </div>
            <div className='flex-1 flex-col'>
                <p className='font-bold'>Hectareas:</p>
                <InputForm formik={formik} name="hectareas" id="hectareas" number={true}/>
            </div>
        </div>
        <div className='flex flex-row w-full gap-3 max-sm:flex-col'>
            <div className='flex flex-col w-1/2 max-sm:w-full'>
                <p className='font-bold'>Galeria:</p>
                <div className='relative w-full min-w-fit'>
                    <select
                        className={`size-full py-2 appearance-none block border-gray-300 border-2 px-4 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500`}
                        id="galeria"
                        name="galeria"
                        onChange={formik.handleChange}
                        value={formik.values.galeria}
                    >
                        { 
                        galleriesStatus==='success' && galleries?.length>0 && (
                            <>
                            <option value={'ninguna'}>Ninguna</option>
                            {galleries.map((g,i)=>(
                                <option key={i} value={g.id}>{g.titulo}</option>
                            ))} 
                            </>
                        )}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700">
                        <Icons.ArrowDown className='size-[80%]' />
                    </div>
                </div>
            </div>
            <div className='flex flex-row gap-3 w-full sm:w-1/2 max-sm:flex-col'>
                <div className='flex-1 flex-col'>
                    <p className='font-bold'>Longitud:</p>
                    <InputForm formik={formik} id="longitud" name="longitud" number={true}/>
                </div>
                <div className='flex-1 flex-col'>
                    <p className='font-bold'>Latitud:</p>
                    <InputForm formik={formik} id="latitud" name="longitud" number={true}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PropertiesForm