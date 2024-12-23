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
import AbsScroll from '../AbsScroll';
import '../../index.css'
import { PhotosModal } from '../../screens/Galeria/DetailsGalery';

const PagosSForm = ({item,close,formRef, setIsSubmitting,setshowImage,setImage,clicks,setclicks}) => {
    const { pagoUpdate, pagoUpdateStatus } = usePagoSaliente(item.id)
    const { cuentasInversor, cuentasInversorStatus } = useCuentas(item.inversor.id)
    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState(true)
    const [showConfirmar, setshowConfirmar]=useState(false)

    useEffect(() => {
        if (pagoUpdateStatus === 'success') {
            setIsSubmitting(false)
            close();
        }
    }, [pagoUpdateStatus]);

    const formik = useFormik({
        initialValues: {
            metodo: item.metodo ?? 'Transferencia',
            comentarios: item.comentarios ?? '',
            comprobante: item.comprobante ?? '',
            estado: item.estado ?? 'Pagado',
        },
        validationSchema: Yup.object().shape({
            metodo: Yup.string().required('Requerido'),
            comentarios: Yup.string().required('Requerido'),
            comprobante: Yup.string().required('Requerido'),
            estado: Yup.string().required('Requerido').test(
                'opcionCorrecta',
                'Escoge otra opcion',
                function () {
                const { estado } = this.parent;
                    return estado!='Pendiente';
                }
          )
        }),
        onSubmit: async (values) => {
            if(clicks==1){
                setshowConfirmar(true)
                setclicks(2)
            }else if(formik.submitCount>1 && clicks==2 ){
                setIsSubmitting(true) 
                pagoUpdate(values)
            }
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
        <>
        {showConfirmar ?
            <form ref={formRef} onSubmit={formik.handleSubmit} div className='size-full items-center flex flex-col  pb-1 px-2 pt-4 text-justify h-36'>
                {pagoUpdateStatus === 'pending' ?
                <Loader/>:
                <>
                    <Icons.Question size={58} className='min-w-12 text-[#FF9D12]'/>
                    <p>¿Desee agregar el pago saliente?</p>
                    <button type='button' className='w-full mt-auto rounded-2xl h-8 font-bold text-lg bg-blue-200' onClick={()=>{setclicks(0);setshowConfirmar(false)}}>Cancelar</button>
                </>}
            </form>: 
            <form ref={formRef} onSubmit={formik.handleSubmit} className='p-4 md:min-w-[690px] lg:min-w-[800px] flex flex-col sm:flex-row gap-3'>
                <div className='flex flex-1 flex-col'>
                    <div className='flex flex-row gap-1 w-full'>
                        <p className='font-bold'>Monto:</p>
                        <span>{item.monto}</span>
                    </div>
                    <div className='flex flex-row gap-1 w-full'>
                        <p className='font-bold'>Inversor:</p>
                        <span>{item.inversor.nombre + " "+item.inversor.apellidos}</span>
                    </div>
                    <div className='flex flex-col gap-2 w-full sm:h-full h-32'>
                        <p className='font-bold'>Cuentas a depositar:</p>
                        <AbsScroll vertical centerColumn>
                        {cuentasInversorStatus=='success' ?
                        cuentasInversor.map((cuenta)=>(
                            <div className='w-full border-2 flex flex-row gap-2 rounded-lg sm:h-full h-20'>
                                <div> 
                                    <img className='rounded-md object-cover h-full max-w-20' src={cuenta.banco=='BBVA' ? BBVA: cuenta.banco=='Citibanamex' ? Citibanamex: 
                                    cuenta.banco=='Santander' ? Santander: cuenta.banco=='Banco Azteca' ? BancoAzteca:
                                    Banorte}/>
                                </div>
                                <div className='flex flex-col w-full overflow-x-auto'>
                                    <p className='font-bold'>Titular: <span className='font-normal'>{cuenta.titular}</span></p>
                                    <p className='font-bold'>Numero de cuenta: <span className='font-normal'>{cuenta.numeroCuenta}</span></p>
                                    <p className='font-bold'>Clabe: <span className='font-normal'>{cuenta.clabe}</span></p>
                                </div>
                            </div>
                        )):<></>}
                        </AbsScroll>
                    </div>
                </div>
                <div className='flex flex-1 flex-col'>
                    <div className='flex flex-col w-full'>
                        <p className='font-bold'>Comprobante:</p>
                        <FileInput id="comprobante" name="comprobante" formik={formik} readonly={item.estado!='Pendiente'}/>
                            {formik.values.comprobante=='' || formik.values.comprobante==null ?'':
                            previewImage ? 
                            <div className='w-full h-40 rounded-2xl'>{loading && <Loader/>}
                            <img src={previewImage} 
                            onClick={()=>{setImage(previewImage); setshowImage(true)}}
                            className={`hover:cursor-pointer size-full object-cover max-h-40 rounded-2xl ${loading ? 'invisible' : 'visible'}`}
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
                            id='metodo'
                            name='metodo'
                            formik={formik}
                            options={metodo}
                            habilitado={item.estado=='Pendiente'}
                            value={formik.values.metodo}
                            onChange={(val) => formik.setFieldValue('metodo', val)}
                            openUp={true}
                        />  
                    </div>
                    <div className='flex flex-col w-full'>
                        <p className='font-bold'>Comentarios:</p>
                        <InputForm formik={formik} id="comentarios" name="comentarios" readonly={item.estado!='Pendiente'}/>
                    </div>
                    <div className='flex flex-col w-full'>
                        <p className='font-bold'>Estado:</p>
                        <CustomSelect
                            id='estado'
                            name='estado'
                            formik={formik}
                            options={estado}
                            value={formik.values.estado}
                            onChange={(val) => formik.setFieldValue('estado', val)}
                            openUp={true}
                            habilitado={item.estado=='Pendiente'}
                        />  
                    </div>
                </div>
            </form>}
        </>
    )
}

export default PagosSForm