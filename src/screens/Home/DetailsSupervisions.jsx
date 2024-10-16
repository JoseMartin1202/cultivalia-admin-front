import { React, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Icons } from '../../constants/Icons';
import '../../index.css'
import Loader from '../../components/Loader';
import useSupervision from '../../Server/Supervisions/SupervisionProvider';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { getErrorMessage, valueFromId } from '../../constants/functions';
import { PhotosModal } from '../Galeria/DetailsGalery';
import AbsScroll from '../../components/AbsScroll';

export const DetailsSupervisions = () => {
    const navigate = useNavigate();
    const { supervisionId } = useParams();
    const { supervision, supervisionStatus, updateSupervision } = useSupervision(supervisionId);
    const [verFotos,setverFotos]= useState(false)
    const [bgOption, setbgOption] = useState('');
    const [initIndex, setInitIndex] = useState(0)
    const [loading, setLoading] = useState(true)
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
        "niice"
    ]
   
    if(supervision?.movimiento?.tipo_movimiento === 'Beneficiario' || supervision?.movimiento?.tipo_movimiento === 'Inversor'){
        ImagenesData.push( 
            supervision?.movimiento?.data?.credencialFrente,
            supervision?.movimiento?.data?.credencialReverso
        )
    }else if (supervision?.movimiento?.tipo_movimiento === 'PagoEntrante') {
        ImagenesData.push( supervision?.movimiento?.data.comprobante)
    }

    if (supervision?.movimiento?.tipo_movimiento === 'Inversor') {
        supervisionData.push(
            { label: 'Nombre completo', value: `${supervision?.movimiento?.data?.nombre} ${supervision?.movimiento?.data?.apellidos}` },
            { label: 'Teléfono', value: supervision?.movimiento?.data?.telefono }, 
            { label: 'Fecha de nacimiento', value: supervision?.movimiento?.data?.fechaNacimiento },
            { label: 'Sexo', value: supervision?.movimiento?.data?.sexo =="M" ? "Masculino":"Femenino"},
            { label: 'Nacionalidad', value: supervision?.movimiento?.data?.nacionalidad },
            { label: 'Dirección', value: supervision?.movimiento?.data?.direccion },
            { label: 'Colonia', value: supervision?.movimiento?.data?.colonia },
            { label: 'Código postal', value: supervision?.movimiento?.data?.codigoPostal },
            { label: 'Ciudad', value: supervision?.movimiento?.data?.ciudad },
            { label: 'Estado', value: supervision?.movimiento?.data?.estado !='[Please select]' ?supervision?.movimiento?.data?.parentesco :''},
            { label: 'Fecha de registro', value: supervision?.fechaRegistro?.split('T')[0] },
            { label: 'Correo', value: supervision?.movimiento?.data?.correo },
        );
    }else if (supervision?.movimiento?.tipo_movimiento === 'Beneficiario') {
        supervisionData.push(
            { label: 'Nombre completo', value: `${supervision?.movimiento?.data?.nombre} ${supervision?.movimiento?.data?.apellidos}` },
            { label: 'Teléfono', value: supervision?.movimiento?.data?.telefono },
            { label: 'Sexo', value: supervision?.movimiento?.data?.sexo =="M" ? "Masculino":"Femenino"},
            { label: 'Correo', value: supervision?.movimiento?.data?.correo },
            { label: 'Fecha de registro', value: supervision?.fechaRegistro?.split('T')[0] },
        );
    }else if (supervision?.movimiento?.tipo_movimiento === 'PagoEntrante') {
        supervisionData.push(
            { label: 'Fecha de registro', value: supervision?.fechaRegistro?.split('T')[0] },
            { label: 'Monto', value: supervision?.movimiento?.data?.monto },
            { label: 'Método', value: supervision?.movimiento?.data?.metodo },
            //{ label: 'Comentarios', value: supervision?.movimiento?.data?.comentarios},
            { label: 'Inversor', value: `${supervision?.movimiento?.data?.inversor.nombre} ${supervision?.movimiento?.data?.inversor.apellidos}`},
            { label: 'Fecha de la venta', value: supervision?.movimiento?.data?.venta.fecha.split('T')[0] },
            { label: 'Monto de la venta', value: supervision?.movimiento?.data?.venta.monto },
        );
    }


    const formik = useFormik({
        initialValues: {
            comentaios: '',
            estado: '',
            options:''
        },
        validationSchema: Yup.object().shape({
            comentaios: Yup.lazy(() => {
                return comments.length === 0
                    ? Yup.string().required('Escribe o escoge un comentario')
                    : Yup.string().notRequired();
            }),
            estado: Yup.string().required('Requerido'),
            options: Yup.string().notRequired()
        }),
        onSubmit: async (values) => {
          try {
            updateSupervision(values)
          } catch (e) {
           // notify(getErrorMessage(e), true)
          }
        }
    })

    const error = valueFromId("comentaios", formik.errors)
    const touched = valueFromId("comentaios", formik.touched)
    const showError = error && (touched || formik.submitCount > 0);

    useEffect(() => {
        if (supervision) {
            if(supervision.options){
                let commentsList = supervision.options?.split('/');
                setcomments(commentsList)
                formik.setValues({
                    comentaios: supervision.comentaios,
                    estado: supervision.estado,
                    options:commentsList
                });
            }else{
                formik.setValues({
                    comentaios: supervision.comentaios,
                    estado: supervision.estado,
                    options: ''
                });
            }

        }
    }, [supervision]);

    const handleChange = (e) => {
        formik.handleChange(e)
    }

    const handleAddComment = (comment,index) => {
        let newComments;
        if (!comments.includes(comment)) {
            newComments = [...comments, comment];
        } else {
            newComments = comments.filter(c => c !== comment);
        }
        setcomments(newComments);
        formik.setFieldValue('options',newComments.join('/'))
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
        console.log(comments)
        console.log(formik.values)
        formik.validateForm();  // Cada vez que comments cambia, forzamos la revalidación
    }, [comments]);

    if (supervisionStatus === 'loading' || !supervision) {
        return <Loader />;
    }

    return (
        <>
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
                <div className='flex flex-col w-1/2 gap-4 h-full max-md:flex-row max-md:w-full max-md:h-1/2'>
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
                            <div className='flex w-full h-[70%] lg:h-full lg:w-[70%]'>
                                <AbsScroll vertical>
                                    <ul className='grid grid-row gap-2 w-full px-3 py-1' > 
                                        {allComents.map((c,i)=>(  
                                            <li className={`${comments?.includes(c) ? 'bg-[#6B9DFF] text-white':'bg-white'} py-2 px-3 gap-1 flex flex-row rounded-xl  items-center cursor-pointer select-none shadow-md shadow-black/30 ${bouncingIndex === i ? 'bounce' : ''}`} 
                                            onClick={()=>handleAddComment(c,i)}>
                                                {comments?.includes(c) ?  <Icons.Accepted className='size-4 text-white min-w-4'/>: <Icons.point className='size-4 text-black min-w-4'/>}
                                                <span>{c}</span>
                                            </li>
                                        ))}
                                        
                                    </ul>
                                </AbsScroll>
                            </div>
                            <div className='flex sm:flex-1 sm:flex-col'>
                                <textarea
                                id="comentaios"
                                name="comentaios"
                                value={formik?.values.comentaios || ''}
                                onChange={handleChange}
                                className='p-2 w-full h-full resize-none border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 overflow-y-auto'
                                placeholder="Escribe otros comentarios aquí..."/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='relative w-1/2 shadow-lg shadow-black/30 bg-white rounded-2xl max-md:w-full max-md:h-1/2 overflow-y-auto'>
                    <div className='absolute w-full top-4 flex flex-col items-center gap-2 pb-4 '>
                        { ImagenesData.map((item,i)=>(
                            item ?
                            <>{loading&& <Loader/>}
                            <img className={`size-[95%] hover:cursor-pointer ${loading ? 'invisible' : 'visible'}`} src={item} 
                            onClick={()=>{setverFotos(!verFotos); setInitIndex(i)}}
                            onLoad={() => setLoading(false)}/></>: 
                            
                            <div className=' size-[95%] total-center border-2 border-gray-300 rounded-lg'>
                                <Icons.EmptyImage className='size-20 text-gray-500'/>
                                <p>Sin imagen</p>
                            </div>
                            
                            ))
                        }
                        <div className='size-[95%] border-2 border-gray-300 px-2 rounded-lg text-lg'>
                            <p className='font-bold text-3xl pb-3 text-center'>RESUMEN GENERAL</p>
                            {supervisionData.map((item, index) => (
                            <p key={index}>
                                <span className='font-bold'>{item.label}:</span> {item.value ? item.value:"---"}
                            </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-[40px] min-h-[40px] flex flex-row gap-4 items-center max-sm:flex-col'>
                <div className='flex flex-row w-full sm:w-[40%] items-center gap-2'>
                    <p className='font-bold text-lg'>Estado:</p>
                    <div className='relative w-full min-w-fit'>
                        <select
                            id="estado"
                            name="estado"
                            value={formik?.values.estado}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`size-full py-2 appearance-none block border-gray-300 border-[1px] px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 ${bgOption}`}
                        >
                            <option className='bg-white' value="Pendiente">Pendiente</option>
                            <option className='bg-white' value="Validada">Validada</option>
                            <option className='bg-white' value="Rechazada" >Rechazada</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700">
                            <Icons.ArrowUp className='size-[80%]' />
                        </div>
                    </div>
                </div>
                <div className='flex flex-row size-full sm:w-[60%] gap-4'>
                    <button className='bg-[#FFD34B] h-full flex-1 max-sm:py-2 rounded-2xl text-xl flex total-center font-bold' type='submit'>Guardar</button>
                    <button className='bg-[#CBD5E1] h-full flex-1 rounded-2xl text-xl font-bold flex total-center' type='button' onClick={() => { navigate(-1); }}>Cancelar</button>
                </div>
            </div>
        </form>
        </>
    );
}

export default DetailsSupervisions