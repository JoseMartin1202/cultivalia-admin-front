import React, { useEffect, useState } from 'react'
import InputForm from '../inputs/inputForm'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import useJima from '../../Server/Jimas/JimaProvider';
import useProperties from '../../Server/Properties/PropertiesProvider';
import CustomSelect from '../CustomSelect';
import { Icons } from '../../constants/Icons';
import Loader from '../Loader';
import useAjusteTiempo from '../../Server/AjusteTiempo/AjusteTiempoPorvider';

const AjusteTiempoForm = ({close,formRef, setIsSubmitting,clicks,setclicks}) => {
    const { ajusteAdd, ajusteAddStatus } = useAjusteTiempo() 
    const { properties,propertiesStatus } = useProperties() 
    const [showConfirmar, setshowConfirmar]=useState(false)
    

    useEffect(() => {
        if (ajusteAddStatus === 'success') {
            setIsSubmitting(false)
            close();
        }
    }, [ajusteAddStatus]);

    const formik = useFormik({
        initialValues: {
            predio: '',
            predioNombre:'',
            porcentaje: 30,
            anios:6,
            comentarios: '',
        },
        validationSchema: Yup.object().shape({
            predio: Yup.string().required('Requerido'),
            porcentaje: Yup.number().required('Requerido'),
            anios: Yup.number().required('Requerido'),
        }),
        onSubmit: async (values) => {
            console.log(clicks)
            if(clicks==1){
                setshowConfirmar(true)
                setclicks(2)
            }else if(formik.submitCount>1 && clicks==2 ){
                setIsSubmitting(true) 
                ajusteAdd(values)
            }
        }
    })

    useEffect(() => {
        if (propertiesStatus === 'success') {
            formik.setFieldValue('predio',properties[0].id)
            formik.setFieldValue('predioNombre',properties[0].nombre)
        }
    }, [propertiesStatus]);


    const predios = properties?.map(p => ({
        value: p.id,
        label: p.nombre
    }));

    useEffect(() => {
        const name= predios?.find(p=>p.value==formik.values.predio)?.label
        formik.setFieldValue('predioNombre',name)
    }, [formik.values.predio]);

    const porcentaje = Array.from({ length: 100 }, (_, index) => ({
        value: 100 - index,
        label: (100 - index) + "%"
    }));
    const anios = Array.from({ length: 10 }, (_, index) => ({
        value: 10 - index,  
        label: (10 - index) 
    }));

    const handleChange = (e) => {
        formik.handleChange(e)
    }

    return (
    <>
        {showConfirmar ?
        <form ref={formRef} onSubmit={formik.handleSubmit} className='size-full items-center flex flex-col  pb-1 px-2 pt-4 text-justify h-36'>
            {ajusteAddStatus === 'pending' ?
            <Loader/>:
            <>
                <Icons.Question size={58} className='min-w-12 text-[#FF9D12]'/>
                <p>¿Desee agregar el ajuste de tiempo?</p>
                <button type='button' className='w-full mt-auto rounded-2xl h-8 font-bold text-lg bg-blue-200' onClick={()=>{setclicks(0);setshowConfirmar(false)}}>Cancelar</button>
            </>}
        </form>: 
        <form ref={formRef} onSubmit={formik.handleSubmit} className='p-4 flex flex-col sm:w-80 gap-3'>
            <div className='flex flex-col w-full'>
                <p className='font-bold'>Predio:</p>
                <CustomSelect
                    id='predio'
                    name='predio'
                    formik={formik}
                    options={predios}
                    value={formik.values.predio}
                    onChange={(val) => formik.setFieldValue('predio', val)}
                />  
            </div>
            <div className='flex flex-col w-full'>
                <p className='font-bold'>Porcentaje de Cultivalia:</p>
                <CustomSelect
                    id='porcentaje'
                    name='porcentaje'
                    formik={formik}
                    options={porcentaje}
                    value={formik.values.porcentaje}
                    onChange={(val) => formik.setFieldValue('porcentaje', val)}/>
            </div>
            <div className='flex flex-col w-full'>
                <p className='font-bold'>Años de contrato:</p>
                <CustomSelect
                    id='anios'
                    name='anios'
                    formik={formik}
                    options={anios}
                    value={formik.values.anios}
                    onChange={(val) => formik.setFieldValue('anios', val)}/>
            </div>
            <div className='flex flex-col w-full'>
                <p className='font-bold'>Comentarios:</p>
                <textarea
                    id="comentarios"
                    name="comentarios"
                    value={formik.values.comentarios}
                    onChange={handleChange}
                    className='px-2 pt-1 w-full h-20 resize-none border-2 bg-white border-gray-300 rounded-md focus:outline-none'
                />
            </div>
            <div className='size-full total-center flex flex-col gap-1 text-justify'>
                <Icons.Alert size={34} className='min-w-12 text-[#FF9D12]'/>
                <p className='text-lg text-[#FF9D12] font-bold'>Verifique la información. <span className='text-lg text-black font-normal'>No es posible modificarla una vez agregado el ajuste.</span></p>
            </div>
        </form>}
    </>
    )
}

export default AjusteTiempoForm