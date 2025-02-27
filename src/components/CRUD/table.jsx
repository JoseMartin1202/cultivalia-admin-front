import React,{useEffect, useMemo, useRef, useState } from 'react'
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
import GalleryForm from '../forms/GalleryForm';
import AbsScroll from '../AbsScroll';
import OfferForm from '../forms/OfferForm';
import Switch from '../switch';
import PricesForm from '../forms/PriceForm';
import ModalElimiar from '../modals/ModalEliminar';
import GroupTable from './tableGroup';
import AnioForm from '../forms/AnioForm';
import { formatDateLong, formatDateSupervision, formatHourSupervision } from '../../constants/functions';
import EditVisibilityForm from '../forms/EditVisibility';
import SalesCancelForm from '../forms/SalesCancelForm';
import AdvisorForm from '../forms/AdvisorForm';
import JimaForm from '../forms/JimasForm';
import PagosSForm from '../forms/PagosSForm';
import { PhotosModal } from '../../screens/Galeria/DetailsGalery';
import AjusteTiempoForm from '../forms/AjusteTiempoForm';
import EmptyElements from '../EmptyElements';

const CRUD=({
    columns, 
    data, 
    estatusdata, 
    supervision,
    predios,
    prices,
    sales, 
    path,
    filter,
    dataFilter,
    galleries,
    offers,
    searchAdd,
    searchFilterAdd,
    searchFilter,
    switchFilterAdd,
    onlysearch,
    investors,
    advisors,
    jimas,
    pagosS,
    ajusteTiempo,
    ganancias
    })=>{

    const navigate = useNavigate();
    const [ganancia, setGanancia] = useState(0);
    const [elements, setElements] = useState();
    const { 
        filterStateSupervisions, filterStateOffers,filterStatePrices, filterStateSales, filterStateInversors,
        setFilterStateSupervisions, setFilterStateOffers,setFilterStatePrices, setFilterStateSales, setfilterStateInversors } = useApp();
    const [modal, setModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');
    const [editForm, setEditForm] = useState(null)
    const [agregar, setAgregar] = useState(false)
    const [editarVisibilidad, seteditarVisibilidad] = useState(false)
    const [anio, setanio] = useState(false)
    const [cancelarVenta, setcancelarVenta] = useState(false)
    const [yearsGroup, setyearsGroup] = useState();
    const [colsGroup, setcolsGroup] = useState();
    const closeModal = () => {
        if(prices){
            setanio(false)
        }
        if(offers){
            seteditarVisibilidad(false)
        }
        setModal(false)
    };

    const formik = useFormik({
        initialValues: {
            searchText: '',
            estado: supervision ? filterStateSupervisions :offers ? filterStateOffers: prices ? filterStatePrices:  sales ? filterStateSales: filterStateInversors ,
            groupByYear: false
        }
    })

    const EditViewModal = ({ Form, item, close,title}) => {
        const formRef = useRef(null);
        const [showImage, setshowImage] = useState(false)
        const [Image, setImage] = useState('');
        const [isSubmitting, setIsSubmitting] = useState(false) 
        const [clicks, setclicks]=useState(0)
        const actions = useMemo(() => [
            { label:editarVisibilidad  ? "Aceptar": "Guardar", onClick: () => {clicks<=1 && setclicks(1);formRef.current?.requestSubmit()} } // Dispara el submit del formulario
        ], [clicks]);

        return (
            <>
            {showImage &&
             <div id="modalBackground" className='absolute z-50 inset-0 '>
                <PhotosModal
                    photos={[Image]}
                    onClose={() => setshowImage(false)}
                    initIndex={0}
                    supervision={true}
                />
             </div>
            }
            {
                <GenericModal
                title={title}
                close={close}
                content={
                <Form item={item} close={close} formRef={formRef} setIsSubmitting={setIsSubmitting} clicks={clicks} 
                    setclicks={setclicks} setImage={setImage} setshowImage={setshowImage}/>
                }
                actions={pagosS ? (item.estado=='Pagado' ? []:actions):actions}
                loading={isSubmitting}
                />
            }</>
        )
     }

    useEffect(() => {
    if (predios) {
        setEditForm(() => PropertiesForm);
    }
    if(galleries){
        setEditForm(() => GalleryForm)
    }
    if(advisors){
        setEditForm(() => AdvisorForm)
    }
    if(jimas){
        setEditForm(() => JimaForm)
    }
    if(ajusteTiempo){
        setEditForm(() => AjusteTiempoForm)
    }
    }, [predios,galleries,advisors,jimas,ajusteTiempo]);

    useEffect(() => {
        let newElements = data ? [...data] : []; 
        let newCols=columns ? [...columns] : [];
        let mark = new Map()// marks the idclient with the index in the list
        let years = []
        if (supervision) setFilterStateSupervisions(formik.values.estado);
        if (offers) setFilterStateOffers(formik.values.estado);
        if (prices) setFilterStatePrices(formik.values.estado);
        if (sales) setFilterStateSales(formik.values.estado);
        if (investors) setfilterStateInversors(formik.values.estado);
        let searchText = formik?.values?.searchText?.toLowerCase()
        if (formik?.values?.estado!==undefined && formik?.values?.estado!=='' && filter) {
            newElements = newElements.filter(item => 
                item.estado === formik.values.estado || item.is_visible === formik.values.estado || item.isCurrent === formik.values.estado || item.status === formik.values.estado 
            );
        }

        if(supervision){
            newElements= newElements.map((item)=>{
                const newItem = { ...item };
                columns.forEach((col)=>{ 
                    if(col.attribute === "supervisar") {
                        const mensaje=JSON.parse(newItem[col.attribute]).message
                        newItem[col.attribute] = mensaje.length > 50
                        ? mensaje.substring(0, 50) + "..."
                        : mensaje;
                    }else if(col.attribute === "mov"){
                        if(newItem["movimiento"]){
                            if(newItem["movimiento"].tipo_movimiento==="PagoEntrante"){
                                newItem[col.attribute]= newItem["movimiento"].tipo_movimiento+" por "+newItem["movimiento"].data.metodo
                            }else  if(newItem["movimiento"].tipo_movimiento==="Contrato"){
                                newItem[col.attribute]= newItem["movimiento"].tipo_movimiento+" de "+newItem["movimiento"].data.inversor.nombre
                            }else{//Beneficiario o inversor
                                newItem[col.attribute]= newItem["movimiento"].tipo_movimiento+" "+newItem["movimiento"].data.nombre+" "+newItem["movimiento"].data.apellidos
                            }
                        }else{
                            newItem[col.attribute]= "Registro no encontrado o borrado"
                        }
                    }else if(col.attribute === "fechaRegistro"){
                        newItem[col.attribute]= formatDateSupervision({data:newItem[col.attribute]})
                    } else if(col.attribute === "horaRegistro"){
                        newItem[col.attribute]= formatHourSupervision({data:item['fechaRegistro']})
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
                        newItem[col.attribute]= newItem["predio"].nombre
                    }else if(col.attribute==="precio_planta"){
                        newItem[col.attribute]="$"+newItem[col.attribute]
                    }else if(col.attribute==="is_visible"){
                        if(newItem[col.attribute])
                            newItem[col.attribute]="Visible"
                        else
                            newItem[col.attribute]="No visible"
                    }else if(col.attribute==="precio_reventa"){
                        if(newItem[col.attribute])
                            newItem[col.attribute]="$"+newItem[col.attribute]
                        else
                            newItem[col.attribute]="- - -"
                    }else if(col.attribute==="descuento_porcentaje"){
                        newItem[col.attribute]="%"+newItem[col.attribute]
                    }
                })
                return newItem
            })
        }
        
        if(prices){
            newElements= newElements.map((item)=>{
                const newItem = { ...item };
                columns.forEach((col)=>{
                    if(col.attribute==="isCurrent"){
                        newItem[col.attribute] ? newItem[col.attribute]= "actual": newItem[col.attribute]= "NoActual"
                    }else if(col.attribute==="isJimated"){
                            newItem[col.attribute] ? newItem[col.attribute]= "jimada": newItem[col.attribute]= "NoJimada"
                    }else if(col.attribute==="anio"){
                        newItem[col.attribute]= newItem[col.attribute].anio
                    }else if(col.attribute==="precio"){
                        newItem[col.attribute]= Number(newItem[col.attribute]).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
                    }
                })
                return newItem
            })
            newElements.sort((a, b) => {
                // Primero, ordenar por año en orden descendente
                if (b.anio !== a.anio) {
                    return b.anio - a.anio; // Ordenar por año de forma descendente
                } else {
                    // Si los años son iguales, ordenar por fechaRegistro en orden descendente
                    let dateA = new Date(a.fechaRegistro);
                    let dateB = new Date(b.fechaRegistro);
                    return dateB - dateA; // Ordenar por fecha en orden descendente
                }
            });
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

                    anio.precios.sort((a, b) => {
                        let dateA = new Date(a.fechaRegistro); // Convertir cadena de fecha en objeto Date
                        let dateB = new Date(b.fechaRegistro);
                        return dateB - dateA;
                    });
                }
            })
          
            newElements= newElements.map((item)=>{
                const newItem = { ...item };
                columns.forEach((col)=>{
                    if(col.attribute==="fechaRegistro"){
                        newItem[col.attribute]= formatDateLong({data:newItem[col.attribute]})
                    }
                })
                return newItem
            })

            years = years.map(year => {
                const formattedYear = { ...year };
                formattedYear.precios = year.precios.map(precio => {
                    const formattedPrecio = { ...precio };
                    formattedPrecio.fechaRegistro = formatDateLong({ data: precio.fechaRegistro });
                    return formattedPrecio;
                });
                return formattedYear;
            });
            
            setcolsGroup(newCols.splice(1,1))
            setyearsGroup(years)
            //console.log(years)
        }

        if(sales){
            newElements= newElements.map((item)=>{
                const newItem = { ...item };
                columns.forEach((col)=>{
                    if(col.attribute==="fecha"){
                        newItem[col.attribute]= formatDateLong({ data: newItem[col.attribute] })
                    }else if(col.attribute==="comprador"){
                        newItem[col.attribute]= newItem[col.attribute].nombre+" "+newItem[col.attribute].apellidos
                    }else if(col.attribute==="codigoReferido"){
                        newItem[col.attribute]= newItem[col.attribute] ? `${newItem[col.attribute].codigo} (${newItem[col.attribute].inversor?.nombre} ${newItem[col.attribute].inversor?.apellidos})`:"---"
                    }else if(col.attribute==="monto"){
                        newItem[col.attribute] = Number(newItem[col.attribute]).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
                    }
                })
                return newItem
            })
        }

        if(investors){
            newElements= newElements.map((item)=>{
                const newItem = { ...item };
                columns.forEach((col)=>{
                    if(col.attribute==="sexo"){
                        newItem[col.attribute]== 'M' ? newItem[col.attribute]='Masculino': newItem[col.attribute]='Femenino'
                    }else if(col.attribute==="fechaRegistro"){
                        //console.log(formatDateLong({ data: newItem[col.attribute] }))
                        newItem[col.attribute]= formatDateLong({ data: newItem[col.attribute] })
                    }
                })
                return newItem
            })
        }

        if(jimas){
            newElements= newElements.map((item)=>{
                const newItem = { ...item };
                columns.forEach((col)=>{
                    if(col.attribute==="predio"){
                        newItem[col.attribute] = newItem[col.attribute].nombre
                    }else if(col.attribute==="fecha"){
                        newItem[col.attribute] = formatDateLong({data: newItem[col.attribute]})
                    }
                })
                return newItem
            })
        }

        if(pagosS){
            newElements= newElements.map((item)=>{
                const newItem = { ...item };
                columns.forEach((col)=>{
                    if(col.attribute==="inversor"){
                        newItem[col.attribute] = newItem[col.attribute].nombre+" "+newItem[col.attribute].apellidos
                    }else if(col.attribute==="fechaRegistro"){
                        newItem[col.attribute] = formatDateLong({data:newItem[col.attribute]})
                    }else  if(col.attribute==="monto"){
                        //console.log(newItem[col.attribute])
                        newItem[col.attribute] = Number(newItem[col.attribute]).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
                    }else  if(col.attribute==="descripcion"){
                        newItem[col.attribute] = newItem[col.attribute].substring(0,50)+"...";
                    }
                })
                return newItem
            })
        }

        if(ajusteTiempo){
            newElements= newElements.map((item)=>{
                const newItem = { ...item };
                columns.forEach((col)=>{
                    if(col.attribute==="predio"){
                        newItem[col.attribute] = newItem[col.attribute].nombre
                    }
                })
                //console.log(item)
                return newItem
            })
        }

        if(ganancias){
            let gane=0
            newElements= newElements.map((item)=>{
                const newItem = { ...item };
                columns.forEach((col)=>{
                    if(col.attribute==="fecha"){
                        newItem[col.attribute] = formatDateLong({data:newItem[col.attribute]})
                    }else  if(col.attribute==="monto"){
                        gane+=Number(newItem[col.attribute])
                        newItem[col.attribute] = Number(newItem[col.attribute]).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
                    }
                })
                return newItem
            })
            
            setGanancia(gane.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }))
        }

        if(!prices && !ajusteTiempo){
            newElements = newElements.filter(item => {
                return columns.some(col => {
                    //console.log(col.attribute)
                    return col.search && item[col.attribute] && item[col.attribute].toLowerCase().includes(searchText);
                });
            });
        }
        setElements(newElements)
    }, [data,formik.values]);

    return(
        <div className='sm:ml-14 size-full flex flex-col bg-[#f6f6f6] pl-4 py-2 pe-4 sm:pe-3 font-[Roboto]'>
            <div className='size-full flex flex-col bg-white gap-2 px-2 py-2 rounded-xl shadow'>
                <div className='w-full flex items-start'>
                    <div className={`flex flex-row gap-3 w-full`}>
                        {onlysearch && <InputSearch formik={formik}/>}
                        {searchAdd && 
                        <div className='flex flex-row w-full gap-2'>
                        <InputSearch formik={formik}/>
                        <button onClick={()=>{
                            setSelectedItem(null)  
                            setAgregar(true)
                            setModal(true)
                        }}><Icons.Add className='size-11 text-[#6B9DFF]'/></button></div>}
                        {searchFilterAdd &&
                            <div className='flex-col sm:flex-row flex w-full gap-3'>
                            <InputSearch formik={formik}/>
                            <div className='flex flex-row flex-grow gap-2'>
                            {supervision ? <Filter data={dataFilter} formik={formik} opt={filterStateSupervisions} />:
                            offers ?  <Filter data={dataFilter} formik={formik} opt={filterStateOffers} />:
                            undefined}
                            <button onClick={()=>{
                                setSelectedItem(null)
                                setEditForm(() => OfferForm);
                                setModal(true) 
                            }}><Icons.Add className='size-11 text-[#6B9DFF]'/></button></div></div>
                        }
                        {searchFilter &&
                            <div className='flex flex-col sm:flex-row w-full gap-3'>
                            <div className='flex-1 flex'><InputSearch formik={formik}/></div>
                            {supervision ? <Filter data={dataFilter} formik={formik} opt={filterStateSupervisions} />:
                            offers ? <Filter data={dataFilter} formik={formik} opt={filterStateOffers} />:
                            sales ? <Filter data={dataFilter} formik={formik} opt={filterStateSales} />:
                            <Filter data={dataFilter} formik={formik} opt={filterStateInversors} />}</div>
                        }
                        {switchFilterAdd &&
                            <div className='w-full flex md:flex-row flex-col md:items-center gap-2 box-border'>
                                <div className='flex flex-row flex-1 gap-3 w-full box-border'>
                                    <Filter data={dataFilter} formik={formik} opt={filterStatePrices} />
                                    <Switch formik={formik} />
                                    <button onClick={() => {
                                        setEditForm(() => PricesForm);
                                        setModal(true);
                                    }}>
                                        <Icons.Add className='size-11 text-[#6B9DFF]' />
                                    </button>
                                </div>  
                                <button 
                                    className='bg-[#FFD34B] size-fit p-2 rounded-xl font-bold' 
                                    onClick={() => {
                                        setEditForm(() => AnioForm)
                                        setanio(true);
                                        setModal(true);
                                    }}>
                                    Agregar año
                                </button>
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
                        offers && !editarVisibilidad ? 'Nueva Oferta': 
                        offers && editarVisibilidad ?  (selectedItem.is_visible=='Visible' ? 'Cancelar oferta':'Editar estatus'):
                        sales && cancelarVenta ? 'Cancelar venta':
                        advisors ? !agregar ? "Asesor: "+selectedItem.nombre: "Nuevo Asesor":
                        prices && !anio ? "Nuevo precio": 
                        prices &&  anio ? "Nuevo año":
                        pagosS ? "Editar pago saliente":
                        jimas ? "Nueva jima":
                        "Nuevo ajuste de tiempo" 
                    }
                    open={modal}
                    pagosS={pagosS}/>
                }
                {estatusdata==='pending' ? <Loader/>: 
                estatusdata==='success' ?  
                (elements && elements.length>0  ? 
                <>
                <AbsScroll vertical horizontal>
                <table className="custom-table">
                    <thead className='sticky top-0 z-5'>
                        <tr className='bg-[#E2E8F0] h-[35px]'>
                            {
                            formik.values.groupByYear && prices?
                            <th>
                                <p>Año</p>
                            </th>
                            :
                            columns.map((col, i) =>(
                                <th key={`TH_${i}`}>
                                    <p>{col.label}</p>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {prices && formik.values.groupByYear ? <GroupTable cols={columns} dataAgruped={yearsGroup} colsAgrup={colsGroup} filter={formik.values.estado}/>:
                        elements.map((item, i) => (
                            <tr key={`TR_${i}`} className={`${sales && item.estado=='Pendiente'||offers && item.estado=='Vigente'|| pagosS || galleries || advisors || investors || predios || supervision ? 'hover:cursor-pointer hover:bg-blue-100':''} h-[30px] bg-white active:opacity-70 active:duration-0`} onClick={() => {
                                if (path) {
                                    navigate(`/${path}/${item.id}`);
                                } else {
                                setSelectedItem(item);
                                    if(predios){
                                        setAgregar(false)
                                        setModal(true);
                                    }
                                    if(offers && item.estado=='Vigente'){
                                        setEditForm(() => EditVisibilityForm);
                                        seteditarVisibilidad(true)
                                        setModal(true)
                                    }
                                    if(sales && item.estado=='Pendiente'){
                                        setEditForm(() => SalesCancelForm);
                                        setcancelarVenta(true)
                                        setModal(true)
                                    }
                                    if(advisors){
                                        setAgregar(false)
                                        setModal(true)
                                    }
                                    if(pagosS){
                                        const newItem=data.find(i => i.id === item.id)
                                        newItem.monto=item.monto
                                        //console.log(newItem)
                                        setSelectedItem(newItem)
                                        setEditForm(() => PagosSForm);
                                        setModal(true)
                                    }
                                }
                            }}>
                                {columns.map((col, j) => (
                                <td className='border-b py-1 px-3 text-nowrap' key={`TD_${i}_${j}`}>
                                    {col.Component ? <col.Component state={item[col.attribute]} option={col.option}/>: item[col.attribute]}
                                    </td>
                                ))}
                            </tr>
                        ))}                  
                    </tbody>
                </table>
                </AbsScroll>
                <div className='mt-auto'>
                    <div className='bg-[#E2E8F0] p-2 font-bold text-md rounded-lg w-fit'>
                    <p>Total de 
                        {supervision ? ' supervisiones':
                        predios ? ' predios':
                        galleries ? ' galerías':
                        offers ? ' ofertas':
                        prices ? ' precios':
                        sales ? ' ventas':
                        investors ? ' inversores':
                        advisors ? ' asesores':
                        jimas ? ' jimas':
                        pagosS ? ' pagos salientes':
                        ganancias ? ' ganancias':
                        ' ajustes de tiempo'
                        }: {ganancias ? ganancia:elements.length}</p>
                    </div>
                </div>
                </>
                :
                <EmptyElements/>
                ):
                <></>}   
            </div>
        </div>
    )
}

export default CRUD