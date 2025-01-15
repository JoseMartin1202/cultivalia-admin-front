import React, { useEffect, useRef, useState } from 'react'
import InputForm from '../inputs/inputForm'
import { Icons } from '../../constants/Icons'
import useProperties from '../../Server/Properties/PropertiesProvider';
import useOffer from '../../Server/Offers/OfferProvider';
import { formatDateLong, formatDateMedium } from '../../constants/functions';
import Loader from '../Loader';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import CustomSelect from '../CustomSelect';
import usePrices from '../../Server/Prices/PricesProvider';

const OfferForm = ({close,formRef, setIsSubmitting}) => {

    const formik = useFormik({
        initialValues: {
            tipo:'Directa',
            plantas_totales_directa:'',
            plantas_totales_indirecta:'',
            plantas_disponibles_directa:'',
            plantas_disponibles_indirecta:'',
            precio_reventa:'',
            predio_directa:'',
            distribucion:'',
            predio_indirecta:'',
            is_visible_directa:true,
            is_visible_indirecta:true,
            descuento_porcentaje:0,
            vendedor:'',
            // predioName:'',
            // anio:'',
            // precioPlanta:''
        },
        validationSchema: Yup.object().shape({
            plantas_totales_directa: Yup.number().when('tipo', {
              is: 'Directa',
              then: (schema) =>
                schema
                  .required('Requerido')
                  .test(
                    'is-less-than-disponibles',
                    'No disponible',
                    function (value) {
                      const { plantas_disponibles_directa } = this.parent;
                      return value <= plantas_disponibles_directa && value > 0;
                    }
                  ),
              otherwise: (schema) => schema.notRequired(),
            }),
            plantas_totales_indirecta: Yup.number().when('tipo', {
              is: 'Indirecta',
              then: (schema) =>
                schema
                  .required('Requerido')
                  .test(
                    'is-less-than-disponibles',
                    'No disponible',
                    function (value) {
                      const { plantas_disponibles_indirecta } = this.parent;
                      return value <= plantas_disponibles_indirecta && value > 0;
                    }
                  ),
              otherwise: (schema) => schema.notRequired(),
            }),
            plantas_disponibles_indirecta: Yup.number().when('tipo', (tipo, schema) => {
              return tipo == 'Indirecta' ? schema.required('Requerido') : schema.notRequired();
            }),
            precio_reventa: Yup.number().when('tipo', (tipo, schema) => {
              return tipo == 'Indirecta' ? schema.required('Requerido') : schema.notRequired();
            }),
            predio_indirecta: Yup.string().when('tipo', (tipo, schema) => {
              return tipo == 'Indirecta' ? schema.required('Requerido') : schema.notRequired();
            }),
            predio_directa: Yup.string().when('tipo', (tipo, schema) => {
              return tipo == 'Directa' ? schema.required('Requerido') : schema.notRequired();
            }),
            distribucion: Yup.string().when('tipo', (tipo, schema) => {
              return tipo == 'Indirecta' ? schema.required('Requerido') : schema.notRequired();
            }),
            vendedor: Yup.string().when('tipo', (tipo, schema) => {
              return tipo == 'Indirecta' ? schema.required('Requerido') : schema.notRequired();
            }),
            descuento_porcentaje: Yup.number().required("Requerido").test(
                'is-less-100',
                'No valido',
                function (value) {
                  return value < 101 && value>=0;
                }
              ),
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true) 
            offerAdd(values)
        }
    })

    const { properties, propertiesStatus } = useProperties();
    // const { prices, pricesStatus } = usePrices();
    const { offerAdd,offerAddStatus, vendedores, vendedoresStatus, distribucionesInversor, distribucionesInversorStatus } = useOffer(formik.values.vendedor,null,true);
    const [telefono, setTelefono] = useState('');
    const [fechaDist, setfechaDist] = useState('');

    const predios = properties?.map(p => ({
        value: p.id,
        label: p.nombre
    }));

    const vendedorOptions = vendedores?.map(v => ({
        value: v.id,
        label: v.nombre +" "+v.apellidos
    }));

    const estadoOptions = [{value:true, label: "Visible"},{value:false, label: "No visible"}]

    const distribuciones = distribucionesInversor?.map(d => ({
        value: d.id,
        label: d.predio.nombre}
    ));

    useEffect(() => {
        if (offerAddStatus === 'success') {
            setIsSubmitting(false)
            close();
        }
    }, [offerAddStatus]);

    useEffect(() => {
        if (propertiesStatus === "success") {
            const selectedProperty = properties.find(p => p.id == formik.values.predio_directa);
            if (selectedProperty) {
                formik.setFieldValue('plantas_disponibles_directa', selectedProperty.plantasDisponibles);
                // formik.setFieldValue('predioName',selectedProperty.nombre)
                // formik.setFieldValue('anio',selectedProperty.anio.anio)
            } else {
                formik.setFieldValue('predio_directa', properties[0].id);
                formik.setFieldValue('plantas_disponibles_directa', properties[0].plantasDisponibles);
                // formik.setFieldValue('predioName',properties[0].nombre)
                // formik.setFieldValue('anio',properties[0].anio.anio)
            }
        }  
    }, [propertiesStatus, properties,formik.values.predio_directa]);

    // useEffect(()=>{
    //     if (pricesStatus === "success") {
    //         const pricePlanta = prices.find(p => p.anio.anio == formik.values.anio);
    //         if(pricePlanta){
    //             formik.setFieldValue('precioPlanta',pricePlanta.precio)
    //         }else{
    //             formik.setFieldValue('precioPlanta',prices[0].precio)
    //         }
    //     }
    // },[formik.values.predioName])

    // useEffect(()=>{
    //    if(formik.values.tipo === "Indirecta"){
    //         const selectedProperty = properties?.find(p => p.id == formik.values.predio_indirecta);
    //         if(selectedProperty){
    //             formik.setFieldValue('predioName',selectedProperty.nombre)
    //             formik.setFieldValue('anio',selectedProperty.anio.anio)
    //         }
    //    }else{
    //         const selectedProperty = properties?.find(p => p.id == formik.values.predio_directa);
    //         if(selectedProperty){
    //             formik.setFieldValue('predioName',selectedProperty.nombre)
    //             formik.setFieldValue('anio',selectedProperty.anio.anio)
    //         }
    //    }
    // },[formik.values.predio])

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
                updates.plantas_disponibles_indirecta = distribucion.disponiblesOfertar;
                updates.predio_indirecta = distribucion.predio.id;
                setfechaDist(formatDateMedium({ data: distribucion.fecha_registro }));
            } else {
                updates.plantas_disponibles_indirecta = distribucionesInversor[0].disponiblesOfertar;
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

    return (
        <form ref={formRef} onSubmit={formik.handleSubmit} className={`p-6 flex flex-col items-center gap-4`}>
            {offerAddStatus === 'pending' ?
            <Loader/>:
            <>
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
                        <CustomSelect
                            id='predio_directa'
                            name='predio_directa'
                            formik={formik}
                            options={predios}
                            value={formik.values.predio_directa}
                            onChange={(val) => formik.setFieldValue('predio_directa', val)}
                        />
                    </div>
                    <div className='w-full flex flex-col gap-3'>
                        <div className='flex sm:flex-row w-full flex-col gap-3'>
                            <div className='font-bold text-[#279E54] flex flex-1 flex-col justify-center shadow-md shadow-black/30 border-gray-300 border-2 items-center rounded-[10px] max-sm:py-2'>
                                <p>Plantas Disponibles:</p>
                                <p className='text-lg'>{formik.values.plantas_disponibles_directa}</p>
                            </div>
                            <div className='flex flex-col flex-1'>
                                <p className='font-bold'>Plantas a ofertar:</p>
                                <InputForm formik={formik} id="plantas_totales_directa" name="plantas_totales_directa" number={true} preventSigns={true} />
                            </div>
                        </div>
                        <div className='flex sm:flex-row w-full flex-col gap-3'>
                            <div className='flex flex-col flex-1'>
                                <p className='font-bold'>Estatus:</p>
                                <CustomSelect
                                    id='is_visible_directa'
                                    name='is_visible_directa'
                                    formik={formik}
                                    options={estadoOptions}
                                    value={formik.values.is_visible_directa}
                                    onChange={(val) => formik.setFieldValue('is_visible_directa', val)}
                                    openUp={true}
                                />   
                            </div>
                            <div className='flex flex-col flex-1'>
                                <p className='font-bold'>Descuento (%):</p>
                                <InputForm formik={formik} id="descuento_porcentaje" name="descuento_porcentaje" number={true} preventSigns={true} descuento={true} />
                            </div>
                        </div>
                    </div>
                </>
                :
                <div className='w-full flex flex-col gap-3'>
                    <div className='flex flex-row gap-3'>
                        <div className='flex flex-col w-full'>
                            <p className='font-bold'>Vendedor/Inversor:</p>
                            <CustomSelect
                            id='vendedor'
                            name='vendedor'
                            formik={formik}
                            options={vendedorOptions}
                            value={formik.values.vendedor}
                            onChange={(val) => formik.setFieldValue('vendedor', val)}
                            />
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
                                    <CustomSelect
                                        id='distribucion'
                                        name='distribucion'
                                        formik={formik}
                                        options={distribuciones}
                                        value={formik.values.distribucion}
                                        onChange={(val) => formik.setFieldValue('distribucion', val)}
                                    />   
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
                                    <InputForm formik={formik} id="precio_reventa" name="precio_reventa" number={true} />
                                </div>
                            </div>
                            <div className='flex sm:flex-row w-full flex-col gap-3'>
                                <div className='flex flex-col flex-1'>
                                    <p className='font-bold'>Estatus:</p>
                                    <CustomSelect
                                        id='is_visible_indirecta'
                                        name='is_visible_indirecta'
                                        formik={formik}
                                        options={estadoOptions}
                                        value={formik.values.is_visible_indirecta}
                                        onChange={(val) => formik.setFieldValue('is_visible_indirecta', val)}
                                        openUp={true}
                                    />   
                                </div>
                                <div className='flex flex-col flex-1'>
                                    <p className='font-bold'>Descuento (%):</p>
                                    <InputForm formik={formik} id="descuento_porcentaje" name="descuento_porcentaje" number={true} preventSigns={true} descuento={true}/>
                                </div>
                            </div>
                            </>
                    ) :
                        distribucionesInversorStatus === 'pending' ?
                            <Loader />
                            :
                            <div className='size-full total-center flex flex-col gap-3 text-center'>
                                <Icons.unknown className='size-16 text-orange-300'/>
                                <p className='text-[20px] '>¡Uuups. El inversor no cuenta <br/> con distribuciones para ofertar plantas!</p>
                            </div>
                    }
                </div>
            }
            </>}
            
        </form>
    )
}

export default OfferForm