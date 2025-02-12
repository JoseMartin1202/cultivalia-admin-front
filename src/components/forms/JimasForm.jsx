import React, { useEffect, useState } from 'react'
import InputForm from '../inputs/inputForm'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import useJima from '../../Server/Jimas/JimaProvider';
import useProperties from '../../Server/Properties/PropertiesProvider';
import CustomSelect from '../CustomSelect';
import { Icons } from '../../constants/Icons';
import Loader from '../Loader';

const JimaForm = ({close,formRef, setIsSubmitting,clicks,setclicks}) => {
    const { jimaAdd, jimaAddStatus } = useJima() 
    const { properties,propertiesStatus } = useProperties() 
    const [showConfirmar, setshowConfirmar]=useState(false)
    

    useEffect(() => {
        if (jimaAddStatus === 'success') {
            setIsSubmitting(false)
            close();
        }
    }, [jimaAddStatus]);

    const formik = useFormik({
        initialValues: {
            predio: '',
            predioNombre:'',
            pesoPromedioPlanta: '',
            precioKilo: '',
        },
        validationSchema: Yup.object().shape({
            precioKilo: Yup.string().required('Requerido').test(
                'is-greater-than-0',
                    'Requerido',
                        function (value) {
                            return value > 0;
                        }
            ),
            pesoPromedioPlanta: Yup.string().required('Requerido').test(
                'is-greater-than-0',
                    'Requerido',
                        function (value) {
                            return value > 0;
                        }
            ),
            predio: Yup.string().required('Requerido'),
        }),
        onSubmit: async (values) => {
            console.log(clicks)
            if(clicks==1){
                setshowConfirmar(true)
                setclicks(2)
            }else if(formik.submitCount>1 && clicks==2 ){
                setIsSubmitting(true) 
                jimaAdd(values)
            }
        }
    })

    const predios = properties?.map(p => ({
        value: p.id,
        label: p.nombre
    }));

    useEffect(() => {
        if (propertiesStatus === 'success') {
            formik.setFieldValue('predio',properties[0].id)
            formik.setFieldValue('predioNombre',properties[0].nombre)
        }
    }, [propertiesStatus]);

    useEffect(() => {
        const name= predios?.find(p=>p.value==formik.values.predio)?.label
        formik.setFieldValue('predioNombre',name)
    }, [formik.values.predio]);

    return (
    <>
        {showConfirmar ?
        <form ref={formRef} onSubmit={formik.handleSubmit} className='size-full items-center flex flex-col  pb-1 px-2 pt-4 text-justify h-36'>
            {jimaAddStatus === 'pending' ?
            <Loader/>:
            <>
                <Icons.Question size={58} className='min-w-12 text-[#FF9D12]'/>
                <p>¿Desee agregar la jima?</p>
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
                <p className='font-bold'>Peso promedio por planta:</p>
                <InputForm formik={formik} id="pesoPromedioPlanta" name="pesoPromedioPlanta" number={true}/>
            </div>
            <div className='flex flex-col w-full'>
                <p className='font-bold'>Precio por kilo:</p>
                <InputForm formik={formik} id="precioKilo" name="precioKilo" number={true}/>
            </div>
            <div className='size-full total-center flex flex-col gap-1 text-justify'>
                <Icons.Alert size={34} className='min-w-12 text-[#FF9D12]'/>
                <p className='text-lg text-[#FF9D12] font-bold'>Verifique la información. <span className='text-lg text-black font-normal'>No es posible modificarla una vez agregada la jima.</span></p>
            </div>
        </form>}
    </>
    )
}

export default JimaForm