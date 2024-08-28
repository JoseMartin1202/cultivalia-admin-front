import React,{useEffect, useState } from 'react'
import { Icons } from '../../constants/Icons';
import { useNavigate } from 'react-router-dom';
import '../../index.css'
import Loader from '../Loader'
import InputSearch from '../inputs/InputSeacrh';
import Filter from '../filter';
import { useFormik } from 'formik';
import { useApp } from '../../context/AppContext';
import GenericModal from '../modals/GenericModal';
import PropertiesForm from '../forms/ProperitesForm';
import { emptyGalería, emptyPredio } from '../../constants/functions';
import usePropertie from '../../Server/Properties/PropertieProvider';
import * as Yup from 'yup';
import GalleryForm from '../forms/GalleryForm';
import useGalleries from '../../Server/Gallery/GalleriesProvider';

const CRUD=({
    columns, 
    data, 
    estatusdata, 
    supervision,
    predios, 
    path,
    search,
    filter,
    dataFilter,
    add,
    galleries
    })=>{

    const navigate = useNavigate();
    const [elements, setElements] = useState();
    const { filterState, setFilterState } = useApp();
    const [modal, setModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [editForm, setEditForm] = useState(null)
    const [agregar, setAgregar] = useState(false)
    const [optionForm, setoptionForm] = useState()
    const [necesary, setNecesary] = useState(true)
    

    const formik = useFormik({
        initialValues: {
            searchText: '',
            estado: filterState,
        }
    })

    const EditViewModal = ({ Form, item, close,title,option}) => {
        const { updatePropertie, propertieAdd } = usePropertie(item.id);
        const { galerryAdd } = useGalleries()
        
        const formik = useFormik({
            initialValues: item,
            validationSchema : Yup.object().shape(
            Object.keys(item).reduce((schema, key) => {
                schema[key] = Yup.mixed().required('Obligatorio');
                return schema;
            }, {})
            ).concat(
                option === "Predios" ? Yup.object().shape({
                    plantasDisponibles: Yup.number()
                        .test(
                            'is-less-than-plantasTotales',//nombre prueba
                            'No disponible',//mensaje de error
                            function (value) {
                                const { plantasTotales } = this.parent;
                                return value <= plantasTotales;
                            }
                        ),
                    plantasTotales: Yup.number().required('Obligatorio')
                        .test(
                            'is-more-that-0',//nombre prueba
                            'Obligatorio',//mensaje de error
                            function (value) {
                                return value > 0;
                            }
                        ),
                    hectareas: Yup.number().required('Obligatorio')
                    .test(
                        'is-more-that-0',//nombre prueba
                        'Obligatorio',//mensaje de error
                        function (value) {
                            return value > 0;
                        }
                    ),
                }) : Yup.object({})
            ),
            onSubmit: async (values) => {
                if(option=="Predios"){
                    if(item.id){
                        delete values.id
                        updatePropertie(values)
                    }else{
                        propertieAdd(values)
                    }
                }
                if(option=="Galerias"){
                    galerryAdd(values)
                }
                close()
           }
        })
     
        return (
           <GenericModal
              title={title}
              close={close}
              content={<Form formik={formik}/>}
              actions={[{ label: "Guardar", onClick: formik.handleSubmit}]}
              necesary={necesary}
              gallery={option=="Galerias"}
           />
        )
     }

    useEffect(() => {
    if (predios) {
        setEditForm(() => PropertiesForm);
        setoptionForm("Predios")
        setNecesary(true)
    }
    if(galleries){
        setEditForm(() => GalleryForm);
        setoptionForm("Galerias")
        setNecesary(false)
    }
    }, [predios,galleries]);

    useEffect(() => {
        if(data?.length>0){
            let newElements = [...data]; 

            let searchText = formik?.values?.searchText?.toLowerCase()
            if (formik?.values?.estado && filter) {
                newElements = newElements.filter(item => item.estado === formik.values.estado);
            }

            if(supervision){
                newElements= newElements.map((item)=>{
                    const newItem = { ...item };
                    columns.forEach((col)=>{ 
                        if(col.attribute === "supervisar") {
                            newItem[col.attribute] = newItem[col.attribute].length > 50
                            ? newItem[col.attribute].substring(0, 50) + "..."
                            : newItem[col.attribute];
                        }else if(col.attribute === "entidad"){
                            newItem[col.attribute]= newItem["tipoMovimiento"].nombre+" "+newItem["entidad"].nombre
                        }else if(col.attribute === "fechaRegistro"){
                            newItem[col.attribute]= newItem[col.attribute].split('T')[0]
                        }    
                    })
                    return newItem
                })
            }
            
            if(predios){
                newElements= newElements.map((item)=>{
                    const newItem = { ...item };
                    columns.forEach((col)=>{
                        if(col.attribute==="anio"){
                            newItem[col.attribute]= newItem[col.attribute].anio
                        }else if(col.attribute==="galeria"){
                            newItem[col.attribute]= newItem[col.attribute].titulo
                        }
                    })
                    return newItem
                })
            }

            if(galleries){
                newElements= newElements.map((item)=>{
                    const newItem = { ...item };
                    columns.forEach((col)=>{
                        if(col.attribute==="fecha"){
                            newItem[col.attribute]= newItem[col.attribute].split('T')[0]
                        }
                    })
                    return newItem
                })
            }

            newElements = newElements.filter(item => {
                return columns.some(col => {
                    return col.search && item[col.attribute] && item[col.attribute].toLowerCase().includes(searchText);
                });
            });


            setElements(newElements)
            setFilterState(formik.values.estado)
        }
    }, [data,formik.values]);

    return(
        <div className='sm:ml-14 size-full flex flex-col bg-[#F1F5F9] p-2 font-[Roboto]'>
            <div className='w-full flex items-start'>
                <div className='flex flex-row gap-4 max-sm:flex-col items-center w-full'>
                    {search && add && 
                        <div className='flex flex-row gap-1 w-full'>
                            <InputSearch formik={formik}/>
                            <button onClick={()=>{
                                if(predios)setSelectedItem(emptyPredio)
                                if(galleries) setSelectedItem(emptyGalería)
                                setAgregar(true)
                                setModal(true)
                            }}><Icons.Add className='size-11 text-[#6B9DFF]'/></button>
                        </div>}
                    {search && !add && <InputSearch formik={formik}/>}
                    {filter && <Filter data={dataFilter} formik={formik} opt={filterState} />}
                </div>
            </div>
                {modal && 
                    <EditViewModal
                    item={selectedItem}
                    Form={editForm}
                    close={()=>setModal(false)}
                    title={
                        predios ? !agregar ? "Predio: "+selectedItem.nombre : "Nuevo Predio":
                        galleries && "Nueva Galería"
                    }
                    option={optionForm}/>
                }
                {estatusdata==='pending' ? <Loader/>: 
                estatusdata==='success' ?  
                (elements?.length>0  ? 
                <>
                <table className="custom-table">
                <thead>
                    <tr>
                        {supervision ? columns.map((col, i) =>(
                            <th className={`border-b-2 border-black h-[30px] bg-[#E2E8F0]  ${supervision && i!=1 ? 'w-1/5' : 'w-2/5'}`} key={`TH_${i}`}>
                                <p>{col.label}</p>
                            </th>
                        )):
                        columns.map((col, i) =>(
                            <th className={'border-b-2 border-black h-[30px] bg-[#E2E8F0]'} key={`TH_${i}`}>
                                <p>{col.label}</p>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody >
                    {elements.map((item, i) => (
                        <tr key={`TR_${i}`} className='hover:cursor-pointer h-[30px] bg-white hover:bg-blue-100' onClick={() => {
                            if (path) {
                              navigate(`/${path}/${item.id}`);
                            } else {
                              setSelectedItem(item);
                              setAgregar(false)
                              setModal(true);
                            }
                          }}>
                            {columns.map((col, j) => (
                               <td className='border-b p-1' key={`TD_${i}_${j}`}>
                                {col.Component ? <col.Component state={item[col.attribute]}/> : item[col.attribute]}
                                </td>
                            ))}
                        </tr>
                    ))}                  
                </tbody>
                </table>
                <div className='mt-auto bg-[#E2E8F0] w-fit p-2 font-bold text-md rounded-xl'>
                    {supervision && <p>Total de supervisiones: {elements.length}</p>}
                    {predios && <p>Total de predios: {elements.length}</p>}
                </div>
                </>
                :
                <div className='size-full total-center flex flex-col gap-3 text-center'>
                        <Icons.Empty className='size-12 text-orange-300'/>
                        <p className='text-[20px] '>¡Uuups. No se tiene elementos <br/>que coincidan con lo solicitado!</p>
                </div>
                ):<></>}   
        </div>
    )
}

export default CRUD