import React,{useEffect, useMemo, useState } from 'react'
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
import { emptyGaleria, emptyOffer, emptyPredio, emptyPrice } from '../../constants/functions';
import usePropertie from '../../Server/Properties/PropertieProvider';
import * as Yup from 'yup';
import GalleryForm from '../forms/GalleryForm';
import useGalleries from '../../Server/Gallery/GalleriesProvider';
import AbsScroll from '../AbsScroll';
import OfferForm from '../forms/OfferForm';
import useOffer from '../../Server/Offers/OfferProvider';
import Switch from '../switch';
import PricesForm from '../forms/PriceForm';
import usePrice from '../../Server/Prices/PriceProvider';
import ModalElimiar from '../modals/ModalEliminar';
import GroupTable from './tableGroup';

const CRUD=({
    columns, 
    data, 
    estatusdata, 
    supervision,
    predios,
    prices, 
    path,
    filter,
    dataFilter,
    galleries,
    offers,
    searchAdd,
    searchFilterAdd,
    searchFilter,
    switchFilterAdd
    })=>{

    const navigate = useNavigate();
    const [elements, setElements] = useState();
    const { 
        filterStateSupervisions, filterStateOffers,filterStatePrices,
        setFilterStateSupervisions, setFilterStateOffers,setFilterStatePrices } = useApp();
    const [modal, setModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [editForm, setEditForm] = useState(null)
    const [agregar, setAgregar] = useState(false)
    const [optionForm, setoptionForm] = useState()
    const [necesary, setNecesary] = useState(true);
    const [yearsGroup, setyearsGroup] = useState();
    const [colsGroup, setcolsGroup] = useState();
    const closeModal = () => setModal(false);

    const formik = useFormik({
        initialValues: {
            searchText: '',
            estado: supervision ? filterStateSupervisions :offers ? filterStateOffers:filterStatePrices ,
            groupByYear: false
        }
    })

    const EditViewModal = ({ Form, item, close,title,option}) => {
        const { updatePropertie, propertieAdd } = usePropertie(item.id);
        const { galerryAdd } = option === 'Galerias' ? useGalleries() : {};
        const { offerAdd } = option === 'Ofertas' ? useOffer() : {};
        const { priceAdd } = option === 'Precios' ? usePrice() : {};
        
        const validationSchema = useMemo(() => {
            return Yup.object()
              .shape(
                Object.keys(item).reduce((schema, key) => {
                  schema[key] = Yup.mixed().required('Obligatorio');
                  return schema;
                }, {})
              )
              .concat(
                option === "Predios"
                  ? Yup.object().shape({
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
                    })
                  : option === "Ofertas"
                  ? Yup.object().shape({
                      plantas_totales_directa: Yup.number().when('tipo', {
                        is: 'Directa',
                        then: (schema) =>
                          schema
                            .required('El campo es obligatorio')
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
                            .required('El campo es obligatorio')
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
                    })
                  : option === "Precios"
                  ? Yup.object().shape({
                      precio: Yup.number().test(
                        'is-greater-than-0',
                        'No válido',
                        function (value) {
                          return value > 0;
                        }
                      ),
                    })
                  : Yup.object({})
              );
          }, [item, option]);

        const formik = useFormik({
            initialValues: item,
            validationSchema : validationSchema,
            onSubmit: async (values) => {
                if(option=="Predios"){
                    if(item.id){//saber si se seleccionó o es nuevo
                        delete values.id
                        updatePropertie(values)
                    }else{
                        propertieAdd(values)
                    }
                }
                if(option=="Galerias"){
                    galerryAdd(values)
                }
                if(option=="Ofertas"){
                    offerAdd(values)
                }
                if(option=="Precios"){
                    priceAdd(values)
                }
                close()
           }
        })
        
        console.log(formik.values)
        
        const actions = useMemo(() => [{ label: "Guardar", onClick: formik.handleSubmit }], [formik.handleSubmit]);
        return (
            <>
            {prices ?
                <ModalElimiar
                title={title}
                close={close}
                content={<Form formik={formik}/>}
                actions={actions}/>
                :
                <GenericModal
                title={title}
                close={close}
                content={<Form formik={formik}/>}
                actions={actions}
                necesary={necesary}//Si se ocupa el Abscroll
                center={option=="Galerias"}/>
            }</>
           
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
    if(offers){
        setEditForm(() => OfferForm);
        setoptionForm("Ofertas")
        setNecesary(true)
    }
    if(prices){
        setEditForm(() => PricesForm);
        setoptionForm("Precios")
        setNecesary(false)
    }
    }, [predios,galleries,offers,prices]);

    useEffect(() => {
        let newElements = data ? [...data] : []; 
        let newCols=columns ? [...columns] : [];
        let mark = new Map()// marks the idclient with the index in the list
        let years = []
        if (supervision) setFilterStateSupervisions(formik.values.estado);
        if (offers) setFilterStateOffers(formik.values.estado);
        if (prices) setFilterStatePrices(formik.values.estado);

        let searchText = formik?.values?.searchText?.toLowerCase()
        if (formik?.values?.estado!==undefined && formik?.values?.estado!=='' && filter) {
            newElements = newElements.filter(item => 
                item.estado === formik.values.estado || item.is_visible === formik.values.estado || item.isCurrent === formik.values.estado 
            );
        }

        if(supervision){
            newElements= newElements.map((item)=>{
                const newItem = { ...item };
                columns.forEach((col)=>{ 
                    if(col.attribute === "supervisar") {
                        newItem[col.attribute] = newItem[col.attribute].length > 50
                        ? newItem[col.attribute].substring(0, 50) + "..."
                        : newItem[col.attribute];
                    }else if(col.attribute === "mov"){
                        if(newItem["movimiento"].tipo_movimiento==="PagoEntrante"){
                            newItem[col.attribute]= newItem["movimiento"].tipo_movimiento+" por "+newItem["movimiento"].data.metodo
                        }else{
                            newItem[col.attribute]= newItem["movimiento"].tipo_movimiento+" "+newItem["movimiento"].data.nombre
                        }
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
                        newItem[col.attribute]= newItem[col.attribute]?.titulo ? newItem[col.attribute].titulo:"---"
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

        if(offers){
            newElements= newElements.map((item)=>{
                const newItem = { ...item };
                columns.forEach((col)=>{
                    if(col.attribute==="fecha_creacion"){
                        newItem[col.attribute]= newItem[col.attribute].split('T')[0]
                    }else if(col.attribute==="predio"){
                        newItem[col.attribute]= newItem["predio_data"].nombre
                    }else if(col.attribute==="precio_planta"){
                        newItem[col.attribute]="$ "+newItem[col.attribute]
                    }else if(col.attribute==="is_visible"){
                        if(newItem[col.attribute])
                            newItem[col.attribute]="Visible"
                        else
                            newItem[col.attribute]="No visible"
                    }else if(col.attribute==="precio_reventa"){
                        if(newItem[col.attribute])
                            newItem[col.attribute]="$ "+newItem[col.attribute]
                        else
                            newItem[col.attribute]="- - -"
                    }
                })
                return newItem
            })
        }
        
        if(prices){
            newElements= newElements.map((item)=>{
                const newItem = { ...item };
                columns.forEach((col)=>{
                    if(col.attribute==="fechaRegistro"){
                        newItem[col.attribute]= newItem[col.attribute].split('T')[0]
                    }else if(col.attribute==="isCurrent"){
                        newItem[col.attribute] ? newItem[col.attribute]= "actual": newItem[col.attribute]= "NoActual"
                    }else if(col.attribute==="isJimated"){
                            newItem[col.attribute] ? newItem[col.attribute]= "jimada": newItem[col.attribute]= "NoJimada"
                    }else if(col.attribute==="anio"){
                        newItem[col.attribute]= newItem[col.attribute].anio
                    }else if(col.attribute==="precio"){
                        newItem[col.attribute]= "$ "+newItem[col.attribute]
                    }
                })
                return newItem
            })
            newElements.sort((a, b) => b.anio - a.anio);
            // Gruping by years
            newElements.forEach(p => {
                let yCopy = { ...p };
                if (!mark.has(p.anio)) {
                    mark.set(p.anio, years.length)
                    delete yCopy.id;
                    delete yCopy.anio;
                    years.push({
                        anio:p.anio,
                        precios:[yCopy]
                    })
                }else{
                    let anio = years[mark.get(p.anio)]
                    delete yCopy.id;
                    delete yCopy.anio;
                    anio.precios.push(yCopy)
                }
            })
            setcolsGroup(newCols.splice(1,1))
            setyearsGroup(years)
            
        }

        if(!prices){
            newElements = newElements.filter(item => {
                return columns.some(col => {
                    return col.search && item[col.attribute] && item[col.attribute].toLowerCase().includes(searchText);
                });
            });
        }

        setElements(newElements)
    }, [data,formik.values]);

    return(
        <div className='sm:ml-14 size-full flex flex-col bg-[#F1F5F9] p-2 font-[Roboto]'>
            <div className='w-full flex items-start mb-4'>
                <div className={`flex flex-row gap-3 ${searchFilterAdd ? 'max-md:flex-col':'max-sm:flex-col items-center'} w-full`}>
                    {searchAdd && 
                     <div className='flex flex-row w-full gap-2'>
                     <InputSearch formik={formik}/>
                     <button onClick={()=>{
                        if(predios) setSelectedItem(emptyPredio)
                        if(galleries) setSelectedItem(emptyGaleria)  
                        setAgregar(true)
                        setModal(true)
                     }}><Icons.Add className='size-11 text-[#6B9DFF]'/></button></div>}
                    {searchFilterAdd &&
                        <><InputSearch formik={formik}/>
                        <div className='flex flex-row w-full sm:min-w-fit sm:max-w-fit gap-1'>
                        {supervision ? <Filter data={dataFilter} formik={formik} opt={filterStateSupervisions} />:
                        offers ?  <Filter data={dataFilter} formik={formik} opt={filterStateOffers} />:
                        undefined}
                        <button onClick={()=>{
                            setSelectedItem(emptyOffer)
                            setAgregar(true)
                            setModal(true) 
                        }}><Icons.Add className='size-11 text-[#6B9DFF]'/></button></div></>
                    }
                    {searchFilter &&
                        <><InputSearch formik={formik}/>
                        {supervision ? <Filter data={dataFilter} formik={formik} opt={filterStateSupervisions} />:
                        offers ?  <Filter data={dataFilter} formik={formik} opt={filterStateOffers} />:
                        undefined}</>
                    }
                    {switchFilterAdd &&
                        <div className='flex flex-row gap-3 w-full'>
                            <Filter data={dataFilter} formik={formik} opt={filterStatePrices} />
                            <div className='flex flex-row gap-1 w-full'>
                                <Switch formik={formik}/>
                                <button onClick={()=>{
                                    setSelectedItem(emptyPrice)
                                    setAgregar(true)
                                    setModal(true)
                                }}><Icons.Add className='size-11 text-[#6B9DFF]'/></button></div>
                        </div>}
                </div>
            </div>
                {modal && 
                    <EditViewModal
                    item={selectedItem}
                    Form={editForm}
                    close={closeModal}
                    title={
                        predios ? !agregar ? "Predio: "+selectedItem.nombre : "Nuevo Predio":
                        galleries ? "Nueva Galería":
                        offers ? 'Nueva Oferta':
                        prices && "Nuevo precio" 
                    }
                    option={optionForm}
                    open={modal}/>
                }
                {estatusdata==='pending' ? <Loader/>: 
                estatusdata==='success' ?  
                (elements && elements.length>0  ? 
                <>
                <AbsScroll vertical horizontal>
                <table className="custom-table">
                    <thead className='sticky top-0 z-5'>
                        <tr>
                            {supervision ? columns.map((col, i) =>(
                                <th className={`h-[35px] bg-[#E2E8F0]  ${supervision && i!=1 ? 'w-1/5' : 'w-2/5'}`} key={`TH_${i}`}>
                                    <p>{col.label}</p>
                                </th>
                            )):
                            formik.values.groupByYear && prices?
                            <th className={'h-[35px] bg-[#E2E8F0]'}>
                                <p>Año</p>
                            </th>
                            :
                            columns.map((col, i) =>(
                                <th className={'h-[35px] bg-[#E2E8F0]'} key={`TH_${i}`}>
                                    <p>{col.label}</p>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {prices && formik.values.groupByYear ? <GroupTable cols={columns} dataAgruped={yearsGroup} colsAgrup={colsGroup} filter={formik.values.estado}/>:
                        elements.map((item, i) => (
                            <tr key={`TR_${i}`} className={`${galleries || predios || supervision ? 'hover:cursor-pointer hover:bg-blue-100':''} h-[30px] bg-white`} onClick={() => {
                                if (path) {
                                navigate(`/${path}/${item.id}`);
                                } else {
                                setSelectedItem(item);
                                    if(predios){
                                        setAgregar(false)
                                        setModal(true);
                                    }
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
                </AbsScroll>
                <div className='mt-auto py-2'>
                    <div className='bg-[#E2E8F0] p-2 font-bold text-md rounded-xl w-fit'>
                    {supervision && <p>Total de supervisiones: {elements.length}</p>}
                    {predios && <p>Total de predios: {elements.length}</p>}
                    {galleries && <p>Total de galerias: {elements.length}</p>}
                    {offers && <p>Total de ofertas: {elements.length}</p>}
                    {prices && <p>Total de precios: {elements.length}</p>}
                    </div>
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