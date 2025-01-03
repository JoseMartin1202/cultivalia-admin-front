import { React, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Icons } from '../../constants/Icons';
import '../../index.css'
import Loader from '../../components/Loader';
import useSupervision from '../../Server/Supervisions/SupervisionProvider';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { formatDateLong, getErrorMessage, valueFromId } from '../../constants/functions';
import { PhotosModal } from '../Galeria/DetailsGalery';
import AbsScroll from '../../components/AbsScroll';
import CustomSelect from '../../components/CustomSelect';
import InputForm from '../../components/inputs/inputForm';

export const DetailsSupervisions = () => {
    const navigate = useNavigate();
    const { supervisionId } = useParams();
    const { supervision, supervisionStatus, updateSupervision } = useSupervision(supervisionId);
    const [verFotos,setverFotos]= useState(false)
    const [bgOption, setbgOption] = useState('');
    const [initIndex, setInitIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [curp, setCurp] = useState(false)
    const [idcrede, setidcrede] = useState(false)
    const [comments, setcomments] = useState([]);
    const [bouncingIndex, setBouncingIndex] = useState(null); // Estado para rastrear el índice que está rebotando
    const supervisionData = []
    const ImagenesData=[]
    const allComents=[
        "Pago verificado y aprobado",
        "Todo en orden, aprobado sin observaciones",
        "Datos faltantes",
        "Pago no coincide con el monto esperado",
        "Inconsistencia de datos",
        "Se envió el documento incorrecto"
    ]

    const estados = [{value:'Validada',label:'Validada'},{value:'Rechazada',label:'Rechazada'}]
   
    if(supervision?.movimiento?.tipo_movimiento === 'Beneficiario' || supervision?.movimiento?.tipo_movimiento === 'Inversor'){
        ImagenesData.push( 
            supervision?.movimiento?.data?.credencialReverso,
            supervision?.movimiento?.data?.credencialFrente
        )
    }else if (supervision?.movimiento?.tipo_movimiento === 'PagoEntrante') {
        ImagenesData.push( supervision?.movimiento?.data.comprobante)
    }    

    if (supervision?.movimiento?.tipo_movimiento === 'Inversor') {
        const data=supervision?.movimiento?.data || {};
        supervisionData.push(
            { label: 'Nombre completo', value: `${data.nombre} ${data.apellidos}` },
            { label: 'Teléfono', value: data.telefono ?? '---' }, 
            { label: 'Fecha de nacimiento', value: data.fechaNacimiento ?? '---'},
            { label: 'Sexo', value: data.sexo =="M" ? "Masculino":"Femenino"},
            { label: 'CURP/DNI', value: data.curp ?? '---'},
            { label: 'Dirección', value: data.direccion ?? '---' },
            { label: 'Colonia', value: data.colonia ?? '---'},
            { label: 'Código postal', value: data.codigoPostal ?? '---'},
            { label: 'Ciudad', value: data.ciudad ?? '---'},
            { label: 'Estado', value: data.estado ?? '---'},
            { label: 'Nacionalidad', value: data.nacionalidad ?? '---'},
            { label: 'Fecha de registro', value: formatDateLong({data: supervision?.fechaRegistro})},
        );
    }else if (supervision?.movimiento?.tipo_movimiento === 'Beneficiario') {
        supervisionData.push(
            { label: 'Nombre completo', value: `${supervision?.movimiento?.data?.nombre} ${supervision?.movimiento?.data?.apellidos}` },
            { label: 'Teléfono', value: supervision?.movimiento?.data?.telefono },
            { label: 'Sexo', value: supervision?.movimiento?.data?.sexo =="M" ? "Masculino":"Femenino"},
            { label: 'Correo', value: supervision?.movimiento?.data?.correo },
            { label: 'Fecha de registro', value: formatDateLong({data: supervision?.fechaRegistro})},
        );
    }else if (supervision?.movimiento?.tipo_movimiento === 'PagoEntrante') {
        supervisionData.push(
            
            { label: 'Monto', value: supervision?.movimiento?.data?.monto },
            { label: 'Método', value: supervision?.movimiento?.data?.metodo },
            { label: 'Inversor', value: `${supervision?.movimiento?.data?.inversor.nombre} ${supervision?.movimiento?.data?.inversor.apellidos}`},
            { label: 'Fecha de la venta', value: supervision?.movimiento?.data?.venta.fecha.split('T')[0] },
            { label: 'Monto de la venta', value: supervision?.movimiento?.data?.venta.monto },
            { label: 'Comentarios', value: (supervision?.movimiento?.data?.comentarios && supervision?.movimiento?.data?.comentarios!='') ? 
                supervision?.movimiento?.data?.comentarios:'--'},
            { label: 'Fecha de registro', value: formatDateLong({data: supervision?.fechaRegistro})},
        );
    }

    const formik = useFormik({
        initialValues: {
            comentaios: '',
            estado: '',
            options:'',
            curp: '',
            idCrede: ''
        },
        validationSchema: Yup.object().shape({
            comentarios: Yup.lazy(() => {
                return comments?.length === 0
                    ? Yup.string().required('Escribe o escoge un comentario')
                    : Yup.string().notRequired();
            }),
            estado: Yup.string().required('Requerido').test(
                'isnt_pendiente',
                    'Requerido',
                        function (value) {
                            return value !='Pendiente';
                        }
            ),
            options: Yup.string().notRequired(),
            curp: curp
                ? Yup.string().required('Requerido') 
                : Yup.string().notRequired(),
            idCrede: idcrede 
                ? Yup.string().required('Requerido') 
                : Yup.string().notRequired()
        }),
        onSubmit: async (values) => {
            if(supervision?.movimiento?.tipo_movimiento === 'Inversor'){
                if(values.estado=='Validada'){
                    if(supervision?.movimiento?.data?.curp && supervision?.movimiento?.data?.identificadorCredencial){
                        updateSupervision(values)
                    }else{
                        setShowModal(true)
                    }
                }else{
                    updateSupervision(values)
                }
            }else{
                updateSupervision(values)
            }
        }
    })

    const error = valueFromId("comentarios", formik.errors)
    const touched = valueFromId("comentarios", formik.touched)
    const showError = error && (touched || formik.submitCount > 0);

    useEffect(() => {
        if (supervision) {
            // if(supervision.options){
            //     // let commentsList = supervision.options?.split('/');
            //     let commentsList = supervision.options
            //     setcomments(commentsList)
            //     formik.setValues({
            //         comentarios: supervision.comentarios,
            //         estado: supervision.estado,
            //         options:commentsList 
            //     });
            // }else{
        formik.setValues({
            comentarios: supervision.comentarios,
            estado: supervision.estado,
            options: supervision.options
        });
            // }
        setcomments(supervision.options)
        }
    }, [supervision]);


    const handleSaveModal = () => {
        if(!formik.values.curp)
            setCurp(true)
        if(!formik.values.idCrede)
            setidcrede(true)
        if(formik.values.curp && formik.values.idCrede){
            setShowModal(false);
            updateSupervision({...formik.values,idInversor:supervision?.movimiento?.data?.id}); 
        }
    };

    const handleChange = (e) => {
        formik.handleChange(e)
    }

    const handleAddComment = (comment,index) => {
        // let newComments;
        // if (!comments.includes(comment)) {
        //     newComments = [...comments, comment];
        // } else {
        //     newComments = comments.filter(c => c !== comment);
        // }
        // setcomments(newComments);
        // formik.setFieldValue('options',newComments.join('/'))
        if (!comments?.includes(comment)) {
            setcomments(comment);
            formik.setFieldValue('options',comment)
        }else{
            setcomments('');
            formik.setFieldValue('options','')
        }
        setBouncingIndex(index);

        // Elimina la animación después de 500ms
        setTimeout(() => {
          setBouncingIndex(null);
        }, 500);
    }

    useEffect(() => {
        if (formik.values.estado === 'Validada') {
            setbgOption('bg-[#49C27A]/60');
        } else if (formik.values.estado === 'Rechazada') {
            setbgOption('bg-[#edb3b3]');
        } else {
            setbgOption('bg-[#FFFFFF]');
        }
    }, [formik.values.estado]);

    useEffect(() => {
        formik.validateForm();  // Cada vez que comments cambia, forzamos la revalidación
    }, [comments,curp,idcrede]);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detecta si es un dispositivo móvil o no
        const checkIfMobile = () => {
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
            if (/android|iphone|ipad|ipod|opera mini|iemobile|wpdesktop/i.test(userAgent)) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        // Verificar al cargar el componente
        checkIfMobile();

        // Opcional: actualizar si el usuario cambia el tamaño de la ventana
        window.addEventListener('resize', checkIfMobile);
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    if (supervisionStatus === 'loading' || !supervision) {
        return <Loader />;
    }

    return (
        <>
        {showModal && 
        <div className='absolute z-10 bg-neutral-300/60 size-full total-center'>
            <div className='flex flex-col bg-white w-1/2 h-[90%] gap-3 rounded-xl'>
                <div className='flex flex-row w-full bg-slate-300 p-2 rounded-t-xl'>
                    <div className='font-bold text-center text-xl w-full'><span>Ingresa los datos del inversor</span></div>
                    <button className='text-[#E04646] ms-auto' onClick={()=>{
                        formik.setFieldValue('curp', '');
                        formik.setFieldValue('idCrede', '');
                        setCurp(false)
                        setidcrede(false)
                        setShowModal(false)}
                    }><Icons.Refused size={24}/></button>
                </div>
                <div className='flex flex-col px-4 pb-4 size-full gap-2'>
                    <div className='flex flex-col w-full'>
                        <p className='font-bold'>CURP/DNI:</p>
                        <InputForm formik={formik} id="curp" name="curp" />
                    </div>
                    <div className='flex flex-col w-full'>
                        <p className='font-bold text-nowrap'>ID credencial:</p>
                        <InputForm formik={formik} id="idCrede" name="idCrede"/>
                    </div>
                    <AbsScroll vertical centerColumn>
                        <img src={supervision?.movimiento?.data?.credencialFrente} />
                        <img src={supervision?.movimiento?.data?.credencialReverso} />
                    </AbsScroll>
                    <div className='flex flex-row w-full'>
                        <button className='w-full p-2 bg-[#FFD34B] rounded-lg font-bold text-lg' onClick={handleSaveModal}>Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
        }
        {verFotos &&
            <PhotosModal
               photos={ImagenesData}
               onClose={() => setverFotos(false)}
               initIndex={initIndex}
               supervision={true}
            />
        } 
        <form onSubmit={formik.handleSubmit} className='sm:pl-[4.5rem] size-full gap-4 flex flex-col bg-[#F1F5F9] p-3 font-[Roboto] max-sm:overflow-y-auto max-sm:mb-2 h-screen'>
            <div className='flex flex-row w-full gap-4 max-md:flex-col-reverse flex-grow '>
                <div className='flex flex-col w-[48%] gap-4 h-full max-md:flex-row max-md:w-full max-md:h-1/2'>
                    <div className='flex flex-col flex-1 max-md:max-w-[50%]'>
                        <p className='font-bold text-lg'>Descripción:</p>
                        <div className='size-full shadow-md shadow-black/30 bg-white rounded-2xl p-2 overflow-y-auto'>
                            <span>{supervision?.supervisar}</span>
                        </div>
                    </div>
                    <div className='flex flex-col flex-1'>
                        <p htmlFor="comments" className='font-bold text-lg'>Comentarios:</p>
                        {showError &&
                        <div className=''>
                            <p className='font-normal text-sm flex items-center gap-1 h-full italic text-red-500 '>
                                <Icons.Alert size="14px" />
                                {error}
                            </p>
                        </div>}
                        <div className='flex flex-col lg:flex-row size-full gap-3'>
                            <div className='flex w-full h-[70%] lg:h-full lg:w-[70%] min-h-14'>
                                <AbsScroll vertical>
                                    <ul className='grid grid-row gap-2 w-full px-3 py-2'> 
                                        {allComents.map((c,i)=>(  
                                            <li key={i} className={`${comments?.includes(c) ? 'bg-[#6B9DFF] text-white':'bg-white'} 
                                            py-2 px-3 gap-1 flex flex-row rounded-xl items-center select-none shadow-md
                                            shadow-black/30 ${bouncingIndex === i ? 'bounce' : ''} ${supervision.estado === 'Pendiente' ? 'cursor-pointer' : ''}`} 
                                            onClick={()=>{supervision.estado === 'Pendiente'&& handleAddComment(c,i)}}>
                                                {comments?.includes(c) ?  <Icons.Accepted className='size-4 text-white min-w-4'/>: <Icons.point className='size-4 text-black min-w-4'/>}
                                                <span>{c}</span>
                                            </li>
                                        ))}
                                        
                                    </ul>
                                </AbsScroll>
                            </div>
                            <div className='flex sm:flex-1 sm:flex-col'>
                                <textarea
                                id="comentarios"
                                name="comentarios"
                                value={formik?.values.comentarios || ''}
                                readOnly={supervision?.estado!='Pendiente'}
                                onChange={handleChange}
                                className={`px-2 pt-2 w-full h-full resize-none border bg-white border-gray-300 rounded-md focus:outline-none
                                    ${supervision?.estado=='Pendiente'?'focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500':''}overflow-y-auto`}
                                placeholder={supervision?.estado!='Pendiente'? "Sin comentarios.":"Escribe otros comentarios aquí..."}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='relative w-[52%] shadow-lg shadow-black/30 bg-white rounded-2xl max-md:w-full max-md:h-1/2'>
                    <div className='absolute size-full top-0 left-0 p-2 '>
                        { supervision?.movimiento?.tipo_movimiento === 'Contrato' ?
                            <>
                            {isMobile ? (
                                // Mostrar un enlace para abrir el PDF en una nueva pestaña o visor
                                <div className='flex size-full items-center justify-center'>
                                    <a href={supervision?.movimiento?.data?.fileSigned} target="_blank" rel="noopener noreferrer" className='p-2 rounded-md bg-[#FFD34B]'>
                                    Visualizar el PDF en una pestaña nueva
                                    </a>
                                </div>
                            ) : <>{loading && supervision?.movimiento?.data?.fileSigned!=null &&(
                                <div className='absolute inset-0 flex items-center justify-center z-50'>
                                    <Loader />
                                </div>
                                )}
                                {supervision?.movimiento?.data?.fileSigned ? 
                                    <object
                                    className={`size-full rounded-lg ${loading ? 'invisible' : 'visible'}`}
                                    data={supervision?.movimiento?.data?.fileSigned}
                                    type='application/pdf'
                                    onLoad={() => setLoading(false)}
                                    onError={() => {
                                        setLoading(false);
                                        console.error('Error al cargar el PDF.');
                                    }}/>
                                : 
                                <div className=' size-full total-center border-2 border-gray-300 rounded-lg'>
                                    <Icons.ContractNull className='size-20 text-gray-500'/>
                                    <p>Sin contrato</p>
                                </div>}
                               </>}
                            </>
                            :
                                <AbsScroll vertical centerColumn>
                                    { ImagenesData.map((item,i)=>(
                                        item ?
                                        <div key={i} className='relative flex justify-center'>
                                        {loading && (
                                            <div className="absolute flex size-full justify-center items-center">
                                            <Loader />
                                            </div>
                                        )}
                                        <img className={`size-[95%] hover:cursor-pointer ${loading ? 'invisible' : 'visible'}`} src={item} 
                                        onClick={()=>{setverFotos(!verFotos); setInitIndex(i)}}
                                        onLoad={() => setLoading(false)}/></div>: 

                                        <div key={i} className=' size-[95%] total-center border-2 border-gray-300 rounded-lg'>
                                            <Icons.EmptyImage className='size-20 text-gray-500'/>
                                            <p>Sin imagen</p>
                                        </div>
                                        ))
                                    }
                                    <div className='w-[95%] border-2 border-gray-300 px-2 rounded-lg text-lg'>
                                        <p className='font-bold text-3xl pb-3 text-center'>RESUMEN GENERAL</p>
                                        {supervisionData.map((item, index) => (
                                        <p key={index}>
                                            <span className='font-bold'>{item.label}:</span> {item.value ? item.value:"---"}
                                        </p>
                                        ))}
                                    </div>
                                </AbsScroll>
                        }
                    </div>
                </div>
            </div>
            <div className={`w-full h-[40px] min-h-[40px] flex flex-row gap-4  ${supervision?.estado=="Pendiente" ? 'items-center':''} max-sm:flex-col`}>
                <div className={`flex flex-row w-full ${supervision?.estado=="Pendiente" ? 'sm:w-[40%]':''} items-center gap-2`}>
                    <p className='font-bold text-lg'>Estado:</p>
                    <CustomSelect
                        id="estado"
                        name="estado"
                        formik={formik}
                        options={estados}
                        value={formik.values.estado}
                        onChange={(val) => formik.setFieldValue('estado', val)}
                        openUp={true}
                        estadoS={bgOption}
                        habilitado={supervision?.estado=='Pendiente'}
                    />
                    {supervision?.estado!="Pendiente" && 
                    <div className='flex size-full'> 
                         <button className='bg-[#CBD5E1] rounded-2xl flex items-center justify-center w-full' type='button' onClick={() => { navigate(-1); }}>
                            <Icons.LeftArrow className='h-[60%] w-auto text-black' />
                        </button>
                    </div>}
                </div>
                    {supervision?.estado=="Pendiente" && 
                    <div className='flex flex-row size-full sm:w-[60%] gap-4'>
                        <button className='bg-[#FFD34B] h-full flex-1 max-sm:py-2 rounded-2xl text-xl flex total-center font-bold' type='submit' >Guardar</button>
                        <button className='bg-[#CBD5E1] h-full flex-1 rounded-2xl text-xl font-bold flex total-center' type='button' onClick={() => { navigate(-1); }}>Cancelar</button>
                    </div>}
            </div>
        </form>
        </>
    );
}

export default DetailsSupervisions