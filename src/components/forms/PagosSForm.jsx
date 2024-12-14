import React, { useEffect, useState } from 'react'
import InputForm from '../inputs/inputForm'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import useJima from '../../Server/Jimas/JimaProvider';
import useProperties from '../../Server/Properties/PropertiesProvider';
import CustomSelect from '../CustomSelect';
import { Icons } from '../../constants/Icons';
import usePagoSaliente from '../../Server/PagoSaliente/PagoSalienteProvider';
import FileInput from '../inputs/FileInput';
import Loader from '../Loader';
import useCuentas from '../../Server/Cuentas/CuentasProvider';
import BancoAzteca from '../../assets/bancoAzteca.jpg';
import Banorte from '../../assets/banorte.png';
import BBVA from '../../assets/bbva.jpg';
import Citibanamex from '../../assets/citibanamex.png';
import Santander from '../../assets/santander.png';

const PagosSForm = ({item,close,formRef, setIsSubmitting}) => {
    const { pagoUpdate, pagoUpdateStatus } = usePagoSaliente(item.id)
    const { cuentasInversor, cuentasInversorStatus } = useCuentas(item.inversor.id)
    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (pagoUpdateStatus === 'success') {
            setIsSubmitting(false)
            close();
        }
    }, [pagoUpdateStatus]);

    const formik = useFormik({
        initialValues: {
            metodo: 'Transferencia',
            comentarios: '',
            comprobante: '',
            estado: 'Pagado',
        },
        validationSchema: Yup.object().shape({
            metodo: Yup.string().required('Requerido'),
            comentarios: Yup.string().required('Requerido'),
            comprobante: Yup.string().required('Requerido'),
            estado: Yup.string().required('Requerido')
        }),
        onSubmit: async (values) => {
           
        }
    })

    const metodo=[{value: "Transferencia", label: "Transferencia"},{value: "Cheque", label: "Cheque"},
        {value: "Efectivo", label: "Efectivo"},{value: "Deposito", label: "Deposito"},{value: "Otro", label: "Otro"}
    ]

    const estado=[{value: "Pendiente", label: "Pendiente"},{value: "Pagado", label: "Pagado"},
        {value: "Cancelado", label: "Cancelado"}
    ]

    useEffect(() => {
        if (formik.values.comprobante) {
            // Verifica si es un objeto File
            if (formik.values.comprobante instanceof File) {
            // Usar URL.createObjectURL para crear una URL del archivo
            const objectUrl = URL.createObjectURL(formik.values.comprobante);
            setPreviewImage(objectUrl);
        
            // Liberar la URL cuando el componente se desmonte o cuando el archivo cambie
            return () => {
                URL.revokeObjectURL(objectUrl);
            };
            } else if (typeof formik.values.comprobante === 'string') {
            // Si es una URL, úsala directamente
            setPreviewImage(formik.values.comprobante);
            }
        } else {
            setPreviewImage(null);
        }
    }, [formik.values.comprobante]);

    return (
        <form ref={formRef} onSubmit={formik.handleSubmit} className='p-4 min-w-[800px] flex flex-row gap-3'>
            <div className='flex flex-1 flex-col'>
                <div className='flex flex-row gap-1 w-full'>
                    <p className='font-bold'>Monto:</p>
                    <span>{item.monto}</span>
                </div>
                <div className='flex flex-row gap-1 w-full'>
                    <p className='font-bold'>Inversor:</p>
                    <span>{item.inversor.nombre + " "+item.inversor.apellidos}</span>
                </div>
                <div className='flex flex-col gap-1 w-full'>
                    <p className='font-bold'>Cuentas a depositar:</p>
                    {cuentasInversorStatus=='success' ?
                    cuentasInversor.map((cuenta)=>(
                        <div className='w-full border-2 flex-row'>
                            <div>
                                {cuenta.banco=='BBVA' ? <img src={BBVA}/>:
                                cuenta.banco=='Citibanamex' ? <img src={Citibanamex}/>:
                                cuenta.banco=='Santander' ? <img src={Santander}/>:
                                cuenta.banco=='Banco Azteca' ? <img src={BancoAzteca}/>:
                                <img src={cuenta.banco}/>}
                            </div>
                        </div>
                    )):<></>}
                </div>
            </div>
            <div className='flex flex-1 flex-col'>
                <div className='flex flex-col w-full'>
                    <p className='font-bold'>Comprobante:</p>
                    <FileInput id="comprobante" name="comprobante" formik={formik} />
                        {formik.values.comprobante=='' || formik.values.comprobante==null ?'':
                        previewImage ? 
                        <div className='w-full h-40 rounded-2xl'>{loading && <Loader/>}
                        <img src={previewImage} 
                        className={`over:cursor-pointer size-full object-cover max-h-40 rounded-2xl ${loading ? 'invisible' : 'visible'}`}
                        onLoad={() => setLoading(false)}/></div>
                        :
                        <div className='w-full h-40 rounded-2xl'>{loading && <Loader/>}
                        <img src={formik.values.comprobante} 
                        className={`over:cursor-pointer size-full object-cover max-h-40 rounded-2xl ${loading ? 'invisible' : 'visible'}`}
                        onLoad={() => setLoading(false)}/></div>
                        }
                </div>
                <div className='flex flex-col w-full'>
                    <p className='font-bold'>Método:</p>
                    <CustomSelect
                        options={metodo}
                        value={formik.values.metodo}
                        onChange={(val) => formik.setFieldValue('metodo', val)}
                    />  
                </div>
                <div className='flex flex-col w-full'>
                    <p className='font-bold'>Comentarios:</p>
                    <InputForm formik={formik} id="comentarios" name="comentarios"/>
                </div>
                <div className='flex flex-col w-full'>
                    <p className='font-bold'>Estado:</p>
                    <CustomSelect
                        options={estado}
                        value={formik.values.estado}
                        onChange={(val) => formik.setFieldValue('estado', val)}
                        openUp={true}
                    />  
                </div>
            </div>
        </form>
    )
}

export default PagosSForm