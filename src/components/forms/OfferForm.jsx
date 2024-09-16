import React, { useEffect, useState } from 'react'
import InputForm from '../inputs/inputForm'
import { Icons } from '../../constants/Icons'
import useProperties from '../../Server/Properties/PropertiesProvider';
import useOffer from '../../Server/Offers/OfferProvider';

const OfferForm = ({formik}) => {
    const { properties, propertiesStatus }= useProperties();
    const { vendedores, vendedoresStatus } = useOffer();
    const [directa, setDirecta]= useState(true);
    const [telefono, setTelefono]= useState('');
   
    useEffect(()=>{
        if(propertiesStatus==="success"){
            formik.setFieldValue('predio',properties[0].id)
            formik.setFieldValue('plantas_disponibles', properties[0].plantasDisponibles);
        }
        if(!formik.values.tipo){
            formik.setFieldValue('tipo','Directa')
        }

        if(!formik.values.is_visible){
            formik.setFieldValue('is_visible',true)
        }
    },[propertiesStatus])
        
    useEffect(()=>{
        const selectedProperty= properties?.find(p => p.id == formik.values.predio);
        if (selectedProperty) {
            formik.setFieldValue('plantas_disponibles', selectedProperty.plantasDisponibles);
        }
    },[formik.values.predio,properties])
    
    useEffect(()=>{
        if(formik.values.tipo=="Directa")
            setDirecta(true)
        else
            setDirecta(false)
    },[formik.values.tipo])

    useEffect(()=>{
        if(vendedoresStatus ==="success"){
            const selectedVendedor= vendedores.find(v => v.id == formik.values.vendedor);
            if (selectedVendedor) {
                formik.setFieldValue('vendedor', selectedVendedor.id);
                setTelefono(selectedVendedor.telefono)
            }else{
                formik.setFieldValue('vendedor', vendedores[0].id);
                setTelefono(vendedores[0].telefono)
            }
        }
    },[vendedores,vendedoresStatus,formik.values.vendedor])

    return (
    <div className='p-6 flex flex-col w-full items-center gap-3'>
        <div className='flex flex-row w-full sm:items-center sm:gap-3 max-sm:flex-col'>
            <p className='font-bold min-w-fit'>Tipo de oferta:</p>
            <div className='relative w-full min-w-fit'>
                <select
                    className={`size-full py-2 appearance-none block border-gray-300 border-2 px-4 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500`}
                    onChange={formik.handleChange}
                    id="tipo"
                    name="tipo"
                    value={formik.values.tipo} 
                >
                    <option value='Directa'>Directa</option>
                    <option value='Indirecta'>Indirecta</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700">
                    <Icons.ArrowDown className='size-[80%]' />
                </div>
            </div>
        </div>
        <div className='w-full flex flex-col gap-3'>
            <div className='flex sm:flex-row w-full gap-3 flex-col'>
                <div className='font-bold text-gray-600 flex flex-col sm:w-fit justify-center shadow-md shadow-black/30 border-gray-300 border-2 items-center px-2 rounded-[10px]'>
                    <p>Plantas Disponibles:</p>
                    <p className='text-lg'>{formik.values.plantas_disponibles}</p>
                </div>
                {directa ? 
                <div className='flex flex-col flex-1'>
                    <p className='font-bold'>Plantas a ofertar:</p>
                    <InputForm formik={formik} id="plantas_totales" name="plantas_totales" number={true} preventSigns={true}/>
                </div>:
                <div className='flex flex-col flex-1'>
                    <p className='font-bold'>Precio reventa:</p>
                    <InputForm formik={formik} id="precio_reventa" name="precio_reventa"/>
                </div>}
                <div className='flex flex-col flex-1'>
                    <p className='font-bold'>Estatus:</p>
                    <div className='relative w-full min-w-fit'>
                        <select
                            className={`size-full py-2 appearance-none block border-gray-300 border-2 px-4 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500`}
                            onChange={formik.handleChange}
                            id="is_visible"
                            name="is_visible"
                            value={formik.values.is_visible} 
                        >
                            <option value={true}>Visible</option>
                            <option value={false}>No visible</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700">
                            <Icons.ArrowDown className='size-[80%]' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col w-full'>
                <p className='font-bold'>Predio:</p>
                <div className='relative w-full min-w-fit'>
                    <select
                        className={`size-full py-2 appearance-none block border-gray-300 border-2 px-4 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500`}
                        onChange={formik.handleChange}
                        id="predio"
                        name="predio"
                        value={formik.values.predio} 
                    >
                        { 
                        propertiesStatus==='success' && properties?.length>0 && (
                            <>
                            {properties.map((p,i)=>(
                                <option key={i} value={p.id}>{p.nombre}</option>
                            ))} 
                            </>
                        )}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700">
                        <Icons.ArrowDown className='size-[80%]' />
                    </div>
                </div>
            </div>
            {!directa && 
            <div className='flex flex-row gap-3'>
                <div className='flex flex-col w-full'>
                    <p className='font-bold'>Vendedor:</p>
                    <div className='relative w-full min-w-fit'>
                        <select
                            className={`size-full py-2 appearance-none block border-gray-300 border-2 px-4 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500`}
                            onChange={formik.handleChange}
                            id="vendedor"
                            name="vendedor"
                            value={formik.values.vendedor} 
                        > 
                        { 
                        vendedoresStatus==='success' && vendedores?.length>0 && (
                            <>
                            {vendedores.map((v,i)=>(
                                <option key={i} value={v.id}>{v.nombre+v.apellidos}</option>
                            ))} 
                            </>
                        )}  
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700">
                            <Icons.ArrowDown className='size-[80%]' />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center border-gray-300 border-2 shadow-lg shadow-black/30 items-center px-2 rounded-[10px]'>
                    <p className='font-bold'>Teléfono:</p>
                    <p>{telefono}</p>
                </div>
            </div>
            }
            
        </div>
    </div>
  )
}

export default OfferForm