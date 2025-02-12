import React, { useEffect, useState } from 'react'
import InputForm from '../inputs/inputForm'
import useYears from '../../Server/Year/YearsProvider';
import { Icons } from '../../constants/Icons';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import usePrice from '../../Server/Prices/PriceProvider';
import CustomSelect from '../CustomSelect';
import AbsScroll from '../AbsScroll';
import { valueFromId } from '../../constants/functions';

const PricesForm = ({close,formRef, setIsSubmitting}) => {
    const { years, yearsStatus } = useYears()
    const { priceAdd, priceAddStatus,yearsExisting } =usePrice() 
    const [yearSelected, setyearSelected] = useState([]);
    const jimada = [{value:false,label:'No'},{value:true,label:'Si'}]
    const forma = [{value:'Manual',label:'Manual'},{value:'Automatica',label:'Automática'}]
    const manera = [{value:'Porcentaje',label:'Porcentaje'},{value:'Cantidad',label:'Cantidad'}]
    const [bouncingIndex, setBouncingIndex] = useState(null); 
    const [all, setAll] = useState(false); 

    useEffect(() => {
        if (priceAddStatus === 'success') {
            setIsSubmitting(false)
            close();
        }
    }, [priceAddStatus]);

    const formik = useFormik({
        initialValues: {
            forma:'Manual',
            precio: '',
            anio:'',
            isJimated:false,
            isCurrent:true,
            manera:'Porcentaje',
            porcentaje:'',
            cantidad:'',
            anios:''
        },
        validationSchema: Yup.object().shape({
            precio: Yup.number().when('forma', {
                is: 'Manual',
                then: (schema) =>
                  schema
                    .required('Requerido')
                    .test(
                    'is-greater-than-0',
                    'No válido',
                        function (value) {
                            return value > 0;
                        }
                    ),
                otherwise: (schema) => schema.notRequired(),
            }),
            anio: Yup.string().when('forma', (tipo, schema) => {
                return tipo == 'Manual' ? schema.required('Requerido') : schema.notRequired();
            }),
            isJimated: Yup.boolean().required('Requerido'),
            manera: Yup.string().when('forma', (tipo, schema) => {
                return tipo == 'Automatica' ? schema.required('Requerido') : schema.notRequired();
            }),
            porcentaje: Yup.number().when(['manera', 'forma'], {
                is: (manera, forma) =>forma === 'Automatica' && manera === 'Porcentaje' ,
                then: (schema) =>
                  schema
                    .required('Requerido')
                    .test(
                    'is-less-than-100-and-more-that-0',
                    'No válido',
                        function (value) {
                            return value <=100 && value>0;
                        }
                    ),
                otherwise: (schema) => schema.notRequired(),
            }),
            cantidad: Yup.number().when(['manera', 'forma'], {
                is: (manera, forma) =>forma === 'Automatica' && manera === 'Cantidad',
                then: (schema) =>
                  schema
                    .required('Requerido')
                    .test(
                    'is-greater-than-0',
                    'No válido',
                        function (value) {
                            return value > 0;
                        }
                    ),
                otherwise: (schema) => schema.notRequired(),
            }),
            anios: Yup.string().when('forma', (tipo, schema) => {
                return tipo == 'Automatica' ? schema.required('Escoge al menos un año') : schema.notRequired();
            }),
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true) 
            priceAdd(values)
        }
    })

    const error = valueFromId("anios", formik.errors)
    const touched = valueFromId("anios", formik.touched)
    const showError = error && (touched || formik.submitCount > 0);

    useEffect(() => {
        if (yearsStatus === "success") {
            const yearSelected = years.find(y => y.anio == formik.values.anio);
            if (yearSelected) {
                formik.setFieldValue('anio', yearSelected.id)
            } else {
                formik.setFieldValue('anio', years[0]?.id);
            }
        }
    }, [yearsStatus, years]);

    const anios = years?.map(y => ({
        value: y.id,
        label: y.anio
    })).reverse();

    const handleAddYear = (year,index) => {
        let newYears;
        if (!yearSelected.includes(year)) {
            newYears = [...yearSelected, year];
        } else {
            newYears = yearSelected.filter(y => y !== year);
        }
        console.log(newYears)
        newYears.length==yearsExisting.length ? setAll(true): setAll(false)
        setyearSelected(newYears);
        formik.setFieldValue('anios',newYears.join('/'))
        setBouncingIndex(index);

        // Elimina la animación después de 500ms
        setTimeout(() => {
          setBouncingIndex(null);
        }, 500);
    }

    const handleAllsYear = () => {
        let newYears=yearSelected
        if(newYears.length==yearsExisting.length){
            newYears=[]
            setAll(false)
        }else{
            yearsExisting.forEach(y => {
                if(!newYears.includes(y.id))
                    newYears.push(y.id)
            });
            setAll(true)
        }
        setyearSelected(newYears);
        formik.setFieldValue('anios',newYears.join('/'))
    }


    return (
        <form ref={formRef} onSubmit={formik.handleSubmit} className='p-4 flex flex-col sm:w-80 items-center gap-3'>
            <div className='flex flex-row items-center gap-3 w-full'>
                <p className='font-bold'>Forma:</p>
                <CustomSelect
                    id='forma'
                    name='forma'
                    formik={formik}
                    options={forma}
                    value={formik.values.forma}
                    onChange={(val) => formik.setFieldValue('forma', val)}
                />  
            </div>
            {formik.values.forma==='Manual' ?
            <><div className='flex flex-col w-full'>
                    <p className='font-bold'>Precio:</p>
                    <InputForm formik={formik} id="precio" name="precio" number={true} />
                </div>
                <div className='flex flex-col w-full'>
                    <p className='font-bold'>Año:</p>
                    <CustomSelect
                        id='anio'
                        name='anio'
                        formik={formik}
                        options={anios}
                        value={formik.values.anio}
                        onChange={(val) => formik.setFieldValue('anio', val)}
                        openUp={true}
                    />  
                </div></>
            :
            <>
                <div className='flex flex-col w-full'>
                    <p className='font-bold'>Manera:</p>
                    <CustomSelect
                        id='manera'
                        name='manera'
                        formik={formik}
                        options={manera}
                        value={formik.values.manera}
                        onChange={(val) => formik.setFieldValue('manera', val)}
                    />
                </div>
                <div className='flex flex-col w-full'>
                    <p className='font-bold'>{formik.values.manera==='Porcentaje' ? 'Porcentaje a aumentar:':'Cantidad a aumentar:'}</p>
                    <InputForm formik={formik} id={`${formik.values.manera==='Porcentaje' ? 'porcentaje':'cantidad'}`} name={`${formik.values.manera==='Porcentaje' ? 'porcentaje':'cantidad'}`} number={true} /> 
                </div>
                <div className='flex flex-col w-full'>
                    <div className='flex flex-row w-full items-center pb-1'>
                        <p className='font-bold'>Años a aplicar:</p>
                        <button type='button' className={`flex flex-row items-center gap-1 ml-auto font-bold border-2 p-1 rounded-lg ${all ? 'border-[#6B9DFF]':''}`} onClick={handleAllsYear}>
                            {all ? <Icons.Accepted className='size-4 text-[#6B9DFF] min-w-4'/>:<Icons.point className='size-4 text-black min-w-4'/>}
                            <span>Todos</span>
                        </button>
                    </div>
                    <div className='w-full h-40 border-2 rounded-lg' id='anios' name="anios">
                        <AbsScroll vertical>
                            <ul className='grid grid-cols-3 gap-2 w-full px-3 py-2'>
                                {yearsExisting?.map((y,i)=>(
                                    <li key={i} className={`${yearSelected?.includes(y.id) ? 'bg-[#6B9DFF] text-white':'bg-white'} py-2 px-3 gap-1 flex flex-row rounded-md  items-center cursor-pointer select-none shadow-md shadow-black/30 ${bouncingIndex === i ? 'bounce' : ''}`} 
                                    onClick={()=>handleAddYear(y.id,i)}>
                                        {yearSelected?.includes(y.id) ?  <Icons.Accepted className='size-4 text-white min-w-4'/>: <Icons.point className='size-4 text-black min-w-4'/>}
                                        <span>{y.anio}</span>
                                    </li>
                                ))}
                            </ul> 
                        </AbsScroll>
                    </div>
                    {showError &&
                    <div className=''>
                        <p className='text-lg italic flex items-center gap-1 h-full text-red-500 '>
                            <Icons.Alert size="14px" />
                            {error}
                        </p>
                    </div>}
                </div>
            </>}
            <div className='flex flex-col w-full'>
                <p className='font-bold'>Es jimada:</p>
                <CustomSelect
                    id='isJimated'
                    name='isJimated'
                    formik={formik}
                    options={jimada}
                    value={formik.values.isJimated}
                    onChange={(val) => formik.setFieldValue('isJimated', val)}
                    openUp={true}
                />  
            </div>
        </form>
    )
}

export default PricesForm