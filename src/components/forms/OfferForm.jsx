import React, { useEffect, useState } from 'react'
import InputForm from '../inputs/inputForm'
import { Icons } from '../../constants/Icons'
import useProperties from '../../Server/Properties/PropertiesProvider';
import useOffer from '../../Server/Offers/OfferProvider';
import { formatDateLong, formatDateMedium } from '../../constants/functions';
import Loader from '../Loader';

const OfferForm = ({ formik }) => {
    const { properties, propertiesStatus } = useProperties();
    const { vendedores, vendedoresStatus, distribucionesInversor, distribucionesInversorStatus } = useOffer(formik.values.vendedor);
    const [telefono, setTelefono] = useState('');
    const [fechaDist, setfechaDist] = useState('');

    useEffect(() => {
        if (propertiesStatus === "success") {
            const selectedProperty = properties.find(p => p.id == formik.values.predio_directa);
            console.log(properties)
            if (selectedProperty) {
                formik.setFieldValue('plantas_disponibles_directa', selectedProperty.plantasDisponibles);
            } else {
                formik.setFieldValue('predio_directa', properties[0].id);
                formik.setFieldValue('plantas_disponibles_directa', properties[0].plantasDisponibles);
            }
        }  
    }, [propertiesStatus, properties,formik.values.predio_directa]);

    useEffect(() => {
        if (formik.values.tipo === "Indirecta") {
            // Lógica para definir valor de vendedores
            if (vendedoresStatus === "success" && vendedores.length>0) {
                let vendedor = vendedores.find(v => v.id == formik.values.vendedor);
                if (vendedor) {
                    setTelefono(vendedor.telefono);
                } else {
                    formik.setFieldValue('vendedor', vendedores[0].id);
                    setTelefono(vendedores[0].telefono);
                }
            }
        }  
    }, [formik.values.tipo]);

    useEffect(() => {
        const updates = {};
        if (vendedoresStatus === "success" && vendedores.length>0) {
            let vendedor = vendedores.find(v => v.id == formik.values.vendedor);
            if (vendedor) {
                setTelefono(vendedor.telefono);
            }
        }
        // Lógica para definir valor de distribuciones
        if (distribucionesInversorStatus === "success" && distribucionesInversor.length > 0) {
            let distribucion = distribucionesInversor.find(d => d.id == formik.values.distribucion);
            if (distribucion) {
                updates.plantas_disponibles_indirecta = distribucion.totalPlantas;
                updates.predio_indirecta = distribucion.predio.id;
                setfechaDist(formatDateMedium({ data: distribucion.fecha_registro }));
            } else {
                updates.plantas_disponibles_indirecta = distribucionesInversor[0].totalPlantas;
                updates.distribucion = distribucionesInversor[0].id;
                updates.predio_indirecta = distribucionesInversor[0].predio.id;
                setfechaDist(formatDateMedium({ data: distribucionesInversor[0].fecha_registro }));
            }
        }

        // Actualizar valores del formulario si hay actualizaciones
        if (Object.keys(updates).length > 0) {
            formik.setValues({
                ...formik.values,
                ...updates,
            });

        }
    }, [distribucionesInversor,distribucionesInversorStatus, formik.values.vendedor]);


    console.log('value',formik.values.plantas_disponibles_directa)

    return (
        <div className='p-6 flex flex-col w-full items-center gap-4'>
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
            {formik.values.tipo == "Directa" ?
                <>
                    <div className='flex flex-col w-full sm:flex-row sm:items-center sm:gap-3'>
                        <p className='font-bold'>Predio:</p>
                        <div className='relative w-full min-w-fit'>
                            <select
                                className={`size-full py-2 appearance-none block border-gray-300 border-2 px-4 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500`}
                                onChange={formik.handleChange}
                                id="predio_directa"
                                name="predio_directa"
                                value={formik.values.predio_directa}
                            >
                                {
                                    propertiesStatus === 'success' && properties?.length > 0 && (
                                        <>
                                            {properties.map((p, i) => (
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
                    <div className='w-full flex flex-col gap-3'>
                        <div className='flex sm:flex-row w-full gap-3 flex-col'>
                            <div className='font-bold text-[#279E54] flex flex-col sm:w-fit justify-center shadow-md shadow-black/30 border-gray-300 border-2 items-center px-2 rounded-[10px] max-sm:py-2'>
                                <p>Plantas Disponibles:</p>
                                <p className='text-lg'>{formik.values.plantas_disponibles_directa}</p>
                            </div>
                            <div className='flex flex-col flex-1'>
                                <p className='font-bold'>Plantas a ofertar:</p>
                                <InputForm formik={formik} id="plantas_totales_directa" name="plantas_totales_directa" number={true} preventSigns={true} />
                            </div>
                            <div className='flex flex-col flex-1'>
                                <p className='font-bold'>Estatus:</p>
                                <div className='relative w-full min-w-fit'>
                                    <select
                                        className={`size-full py-2 appearance-none block border-gray-300 border-2 px-4 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500`}
                                        onChange={formik.handleChange}
                                        id="is_visible_directa"
                                        name="is_visible_directa"
                                        value={formik.values.is_visible_directa}
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
                    </div>
                </>
                :
                <div className='w-full flex flex-col gap-3'>
                    <div className='flex flex-row gap-3'>
                        <div className='flex flex-col w-full'>
                            <p className='font-bold'>Vendedor/Inversor:</p>
                            <div className='relative w-full min-w-fit'>
                                <select
                                    className={`size-full py-2 appearance-none block border-gray-300 border-2 px-4 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500`}
                                    onChange={formik.handleChange}
                                    id="vendedor"
                                    name="vendedor"
                                    value={formik.values.vendedor}
                                >
                                    {
                                        vendedoresStatus === 'success' && vendedores?.length > 0 && (
                                            <>
                                                {vendedores.map((v, i) => (
                                                    <option key={i} value={v.id}>{v.nombre + " " + v.apellidos}</option>
                                                ))}
                                            </>
                                        )}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700">
                                    <Icons.ArrowDown className='size-[80%]' />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center border-gray-300 border-2 items-center px-2 rounded-[10px]'>
                            <p className='font-bold'>Teléfono:</p>
                            <p>{telefono}</p>
                        </div>
                    </div>
                    {distribucionesInversorStatus === 'success' && distribucionesInversor?.length > 0 ? (
                        <>
                            <div className='flex flex-col w-full md:flex-row sm:items-center gap-3 '>
                                <div className='flex flex-col sm:flex-row w-full sm:flex-1 sm:items-center sm:gap-3 '>
                                    <p className='font-bold'>Distribucion:</p>
                                    <div className='relative w-full sm:flex-1'>
                                        <select
                                            className={`size-full py-2 appearance-none block border-gray-300 border-2 px-4 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500`}
                                            onChange={formik.handleChange}
                                            id="distribucion"
                                            name="distribucion"
                                            value={formik.values.distribucion}
                                        >
                                            {distribucionesInversor.map((d, i) => (
                                                <option key={i} value={d.id}>{i + 1}. {d.predio.nombre}, {d.tipo}</option>))
                                            }
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700">
                                            <Icons.ArrowDown className='size-[80%]' />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex max-md:w-full flex-col justify-center border-gray-300 border-2 items-center px-2 rounded-[10px]'>
                                    <p className='font-bold'>Fecha Distribución:</p>
                                    <p>{fechaDist}</p>
                                </div>
                            </div>
                            <div className='flex sm:flex-row w-full gap-3 flex-col'>
                                <div className='font-bold text-[#279E54] flex flex-col sm:w-fit justify-center shadow-md shadow-black/30 border-gray-300 border-2 items-center px-2 rounded-[10px] max-sm:py-2'>
                                    <p>Plantas Disponibles:</p>
                                    <p className='text-lg'>{formik.values.plantas_disponibles_indirecta}</p>
                                </div>
                                <div className='flex flex-col flex-1'>
                                    <p className='font-bold'>Plantas a ofertar:</p>
                                    <InputForm formik={formik} id="plantas_totales_indirecta" name="plantas_totales_indirecta" number={true} preventSigns={true} />
                                </div>
                                <div className='flex flex-col flex-1'>
                                    <p className='font-bold'>Precio reventa:</p>
                                    <InputForm formik={formik} id="precio_reventa" name="precio_reventa" number={true} preventSigns={true} />
                                </div>
                            </div>
                            <div className='flex flex-col flex-1'>
                                <p className='font-bold'>Estatus:</p>
                                <div className='relative w-full min-w-fit'>
                                    <select
                                        className={`size-full py-2 appearance-none block border-gray-300 border-2 px-4 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500`}
                                        onChange={formik.handleChange}
                                        id="is_visible_indirecta"
                                        name="is_visible_indirecta"
                                        value={formik.values.is_visible_indirecta}
                                    >
                                        <option value={true}>Visible</option>
                                        <option value={false}>No visible</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700">
                                        <Icons.ArrowDown className='size-[80%]' />
                                    </div>
                                </div>
                            </div></>
                    ) :
                        distribucionesInversorStatus === 'pending' ?
                            <Loader />
                            :
                            <div className='size-full total-center flex flex-col sm:flex-row gap-3 text-center'>
                                <Icons.unknown className='size-16 text-orange-300'/>
                                <p className='text-[20px] '>¡Uuups. El inversor no puede <br/> ofertar plantas!</p>
                            </div>
                    }
                </div>
            }

        </div>
    )
}

export default OfferForm