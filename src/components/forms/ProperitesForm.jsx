import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Icons } from '../../constants/Icons'
import InputForm from '../inputs/inputForm'
import useGalleries from '../../Server/Gallery/GalleriesProvider'
import useYears from '../../Server/Year/YearsProvider'
import FileInput from '../inputs/FileInput'
import Loader from '../Loader'
import { useFormik } from 'formik'
import usePropertie from '../../Server/Properties/PropertieProvider'
import * as Yup from 'yup';
import CustomSelect from '../CustomSelect'


const PropertiesForm = ({item,close,formRef, setIsSubmitting }) => {
    const { galleries, galleriesStatus }= useGalleries()
    const { years, yearsStatus }= useYears()
    const [loading, setLoading] = useState(true)
    const [previewImage, setPreviewImage] = useState(null);
    const {propertieAdd,propertieAddStatus,updatePropertie,updatePropertieStatus } = usePropertie(item?.id);

    const initialValues = item ? {
        nombre: item.nombre ,
        anio: item.anio ,
        galeria: item.galeria ,
        latitud: item.latitud ,
        longitud: item.longitud ,
        plantasTotales: item.plantasTotales ,
        plantasDisponibles: item.plantasDisponibles ,
        hectareas: item.hectareas ,
        photo_cover: item.photo_cover 
    }:{
        nombre:'',
        anio: '',
        galeria: '',
        latitud: '',
        longitud: '',
        plantasTotales: '',
        plantasDisponibles:  '',
        hectareas: '',
        photo_cover: ''
    };    

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object().shape({
            plantasDisponibles: Yup.number().test(
                'is-less-than-plantasTotales',
                'No disponible',
                function (value) {
                const { plantasTotales } = this.parent;
                return value <= plantasTotales;
                }
            ),
            plantasTotales: Yup.number()
                .required('Obligatorio')
                .test('is-more-than-0', 'Obligatorio', function (value) {
                return value > 0;
                }),
            hectareas: Yup.number()
                .required('Obligatorio')
                .test('is-more-than-0', 'Obligatorio', function (value) {
                return value > 0;
                }),
            photo_cover: Yup.string().nullable(),
            galeria: Yup.string().notRequired(),
            nombre: Yup.string().required('Obligatorio'),
            latitud: Yup.number().required('Obligatorio'),
            longitud: Yup.number().required('Obligatorio')
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true) // Aquí establecemos que se está enviando el formulario
            if (item?.id) {
                delete values.id
                updatePropertie(values)
            } else {
                propertieAdd(values)
            }
        }
    })

    // Monitorear el estado de la mutación para cerrar el modal
    useEffect(() => {
        if (propertieAddStatus === 'success' || updatePropertieStatus === 'success') {
            setIsSubmitting(false)
            close();
        }
    }, [propertieAddStatus, updatePropertieStatus]);

    useEffect(() => {
        if (formik.values.photo_cover) {
            // Verifica si es un objeto File
            if (formik.values.photo_cover instanceof File) {
            // Usar URL.createObjectURL para crear una URL del archivo
            const objectUrl = URL.createObjectURL(formik.values.photo_cover);
            setPreviewImage(objectUrl);
        
            // Liberar la URL cuando el componente se desmonte o cuando el archivo cambie
            return () => {
                URL.revokeObjectURL(objectUrl);
            };
            } else if (typeof formik.values.photo_cover === 'string') {
            // Si es una URL, úsala directamente
            setPreviewImage(formik.values.photo_cover);
            }
        } else {
            setPreviewImage(null);
        }
    }, [formik.values.photo_cover]);

    useEffect(() => {
       if (yearsStatus === "success" && galleriesStatus === "success") {
            const yearSelected= years.find(y => y.anio == formik.values.anio);
            if(yearSelected){
                formik.setFieldValue('anio', yearSelected.id)
            }else{
                formik.setFieldValue('anio', years[0].id);
            }
            const gallerySelected= galleries.find(g => g.titulo == formik.values.galeria);
            if(gallerySelected){
                formik.setFieldValue('galeria', gallerySelected.id)
            }else{
                formik.setFieldValue('galeria', 'ninguna');
            }
       }
    }, [yearsStatus, galleriesStatus, galleries, years]);

    const anios = years?.map(y => ({
        value: y.id,
        label: y.anio
    }));
    
    const galerias = galleries?.map(g => ({
        value: g.id,
        label: g.titulo
    }));

    return (
    <form ref={formRef} onSubmit={formik.handleSubmit} className='sm:relative p-4 flex flex-col w-full gap-3'>
          {console.log( formRef)}
        {propertieAddStatus === 'pending' || updatePropertieStatus === 'pending' ?
            <Loader/>
        :
        <>
        {console.log(formik.values.photo_cover)}
         <div className='flex sm:flex-row w-full gap-3 flex-col'>
            <div className='flex-grow flex-col'>
                <p className='font-bold'>Portada:</p>
                <FileInput id="photo_cover" name="photo_cover" formik={formik} />
                    {formik.values.photo_cover=='' || formik.values.photo_cover==null ?'':
                    previewImage ? 
                    <div className='w-full h-40 rounded-2xl'>{loading && <Loader/>}
                    <img src={previewImage} 
                    className={`over:cursor-pointer size-full object-cover max-h-40 rounded-2xl ${loading ? 'invisible' : 'visible'}`}
                    onLoad={() => setLoading(false)}/></div>
                    :
                    <div className='w-full h-40 rounded-2xl'>{loading && <Loader/>}
                    <img src={formik.values.photo_cover} 
                    className={`over:cursor-pointer size-full object-cover max-h-40 rounded-2xl ${loading ? 'invisible' : 'visible'}`}
                    onLoad={() => setLoading(false)}/></div>
                    }
                
            </div>
        </div>
        <div className='flex sm:flex-row w-full gap-3 flex-col'>
            <div className='flex-grow flex-col'>
                <p className='font-bold'>Nombre:</p>
                <InputForm formik={formik} id="nombre" name="nombre"/>
            </div>
            <div className='flex flex-col sm:w-32'>
                <p className='font-bold'>Año:</p>
                <CustomSelect
                    options={anios}
                    value={formik.values.anio}
                    onChange={(val) => formik.setFieldValue('anio', val)}
                />  
            </div>
        </div>
        <div className='flex flex-row w-full gap-3 max-sm:flex-col'>
            <div className='flex-1 flex-col'>
                <p className='font-bold '>Plantas totales:</p>
                <InputForm formik={formik} name="plantasTotales" id="plantasTotales" number={true} preventSigns={true}/>
            </div>
            <div className='flex-1 flex-col'>
                <p className='font-bold'>Plantas disponibles:</p>
                <InputForm formik={formik} name="plantasDisponibles" id="plantasDisponibles" number={true} preventSigns={true}/>
            </div>
            <div className='flex-1 flex-col'>
                <p className='font-bold'>Hectareas:</p>
                <InputForm formik={formik} name="hectareas" id="hectareas" number={true}/>
            </div>
        </div>
        <div className='flex flex-row w-full gap-3 max-sm:flex-col'>
            <div className='flex flex-col w-1/2 max-sm:w-full'>
                <p className='font-bold'>Galeria:</p>
                <CustomSelect
                    options={galerias}
                    value={formik.values.galeria}
                    onChange={(val) => formik.setFieldValue('galeria', val)}
                    openUp={true}
                />  
            </div>
            <div className='flex flex-row gap-3 w-full sm:w-1/2 max-sm:flex-col'>
                <div className='flex-1 flex-col'>
                    <p className='font-bold'>Longitud:</p>
                    <InputForm formik={formik} id="longitud" name="longitud" number={true}/>
                </div>
                <div className='flex-1 flex-col'>
                    <p className='font-bold'>Latitud:</p>
                    <InputForm formik={formik} id="latitud" name="longitud" number={true}/>
                </div>
            </div>
        </div>
        </>}
    </form>
  )
}

export default PropertiesForm