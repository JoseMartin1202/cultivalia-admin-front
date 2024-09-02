import { React, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Icons } from '../../constants/Icons';
import '../../index.css'
import Loader from '../../components/Loader';
import useSupervision from '../../Server/Supervisions/SupervisionProvider';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { getErrorMessage, valueFromId } from '../../constants/functions';

export const DetailsSupervisions = () => {
    const navigate = useNavigate();
    const { supervisionId } = useParams();
    const { supervision, supervisionStatus, updateSupervision } = useSupervision(supervisionId);
    const back = import.meta.env.VITE_BACKEND_HOST;
    const [bgOption, setbgOption] = useState('');

    const supervisionData = [
        { label: 'Nombre completo', value: `${supervision?.entidad.nombre} ${supervision?.entidad.apellidos}` },
        { label: 'Sexo', value: supervision?.entidad.sexo === 'M' ? 'Masculino' : 'Femenino' },
        { label: 'Teléfono', value: supervision?.entidad.telefono },
        { label: 'Correo', value: supervision?.entidad.correo },
        { label: 'Nacionalidad', value: supervision?.entidad.nacionalidad },
        { label: 'Dirección', value: supervision?.entidad.direccion },
        { label: 'CP', value: supervision?.entidad.codigoPostal },
        { label: 'Ciudad', value: supervision?.entidad.ciudad },
        { label: 'Tipo de movimiento', value: supervision?.tipoMovimiento.nombre },
        { label: 'Fecha de registro', value: supervision?.fechaRegistro.split('T')[0] },
      ];
      

    const formik = useFormik({
        initialValues: {
            comentaios: '',
            estado: '',
        },
        validationSchema: Yup.object().shape({
          comentaios: Yup.string().required('Requerido'),
          estado: Yup.string().required('Requerido')
        }),
        onSubmit: async (values) => {
          try {
            updateSupervision(values)
          } catch (e) {
           // notify(getErrorMessage(e), true)
          }
        }
    })

    useEffect(() => {
        if (supervision) {
            formik.setValues({
                comentaios: supervision.comentaios,
                estado: supervision.estado
            });
        }
    }, [supervision]);

    const handleChange = (e) => {
        formik.handleChange(e)
    }

    const error = valueFromId("comentaios", formik.errors)
    const touched = valueFromId("comentaios", formik.touched)
    const showError = error && (touched || formik.submitCount > 0);

    useEffect(() => {
        if (formik.values.estado === 'Validada') {
            setbgOption('bg-[#49C27A]/60');
        } else if (formik.values.estado === 'Rechazada') {
            setbgOption('bg-[#edb3b3]');
        } else {
            setbgOption('bg-[#FFFFFF]');
        }
    }, [formik.values.estado]);


    if (supervisionStatus === 'loading' || !supervision) {
        return <Loader />;
    }

    return (
        <form onSubmit={formik.handleSubmit} className='sm:ml-14 size-full gap-4 flex flex-col bg-[#F1F5F9] p-3 font-[Roboto] max-sm:overflow-y-auto max-sm:mb-2 h-screen'>
            <div className='flex flex-row w-full gap-4 max-md:flex-col-reverse flex-grow '>
                <div className='flex flex-col w-1/2 gap-4 h-full max-md:flex-row max-md:w-full max-md:h-1/2'>
                    <div className='flex flex-col flex-1 max-md:max-w-[50%]'>
                        <p className='font-bold text-lg'>Descripción:</p>
                        <div className='size-full shadow-lg shadow-black/30 bg-white rounded-2xl p-2 overflow-y-auto'>
                            <span>{supervision?.supervisar}</span>
                        </div>
                    </div>
                    <div className='flex flex-col flex-1'>
                        <p htmlFor="comments" className='font-bold text-lg'>Comentarios:</p>
                        <textarea
                            id="comentaios"
                            name="comentaios"
                            value={formik?.values.comentaios || ''}
                            onChange={handleChange}
                            className='p-2 w-full h-full resize-none border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 overflow-y-auto'
                            placeholder="Escribe tus comentarios aquí..."
                        />
                         {showError &&
                        <div className='h-4 pt-4'>
                            <p className='font-normal text-lg flex items-center gap-1 h-full italic text-red-500 '>
                                <Icons.Alert size="14px" />
                                {error}
                            </p>
                        </div>}
                    </div>
                </div>
                <div className='relative w-1/2 shadow-lg shadow-black/30 bg-white rounded-2xl max-md:w-full max-md:h-1/2 overflow-y-auto'>
                    <div className='absolute w-full top-4 flex flex-col items-center gap-2 pb-4 '>
                        { supervision?.entidad.credencialFrente ? 
                            <img className='size-[90%]' src={back + supervision?.entidad.credencialFrente} />:
                            <div className=' size-[90%] total-center border-2 border-gray-300 rounded-lg'>
                                <Icons.EmptyImage className='size-20'/>
                                <p>Sin imagen</p>
                            </div>
                        }
                        { supervision?.entidad.credencialReverso ? 
                            <img className='size-[90%]' src={back + supervision?.entidad.credencialReverso} />:
                            <div className=' size-[90%] total-center border-2 border-gray-300 rounded-lg'>
                                <Icons.EmptyImage className='size-20'/>
                                <p>Sin imagen</p>
                            </div>
                        }
                        <div className='size-[90%] border-2 border-gray-300 px-2 rounded-lg text-lg'>
                            <p className='font-bold text-3xl text-center'>RESUMEN GENERAL</p>
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
    );
}

export default DetailsSupervisions