import { React, useEffect, useMemo, useState } from 'react'
import { Icons } from '../../constants/Icons';
import { useNavigate } from 'react-router-dom';
import '../../index.css'
import Loader from '../loader'
import InputSearch from '../inputs/InputSeacrh';
import Filter from '../filter';
import { useFormik } from 'formik';
import { useApp } from '../../context/AppContext';

const CRUD=({
    columns, 
    data, 
    estatusdata, 
    supervision, 
    path,
    search,
    filter,
    dataFilter
    })=>{

    const navigate = useNavigate();
    const [elements, setElements] = useState()
    const { filterState, setFilterState } = useApp(); // Accede al estado del filtro desde el contexto

    const formik = useFormik({
        initialValues: {
            searchText: '',
            estado: filterState,
        }
    })

    useEffect(() => {
        if(data?.length>0){
            let newElements = [...data]; 
            // Filtrar por texto
            let searchText = formik?.values?.searchText?.toLowerCase()
            if (formik?.values?.estado) {
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
        <div className='sm:ml-14 size-full flex-col bg-[#F1F5F9] p-2 font-[Roboto]'>
            <div className='w-full flex items-start'>
                <div className='flex flex-row gap-4 max-sm:flex-col items-center w-full'>
                    {search && <InputSearch formik={formik}/>}
                    {filter && <Filter data={dataFilter} formik={formik} opt={filterState} />}
                </div>
            </div>
            <div className='size-full overflow-auto'>
                {estatusdata==='pending' ? <Loader/>: 
                estatusdata==='success' ?  
                (elements?.length>0  ? 
                <table className="custom-table">
                <thead>
                    <tr>
                        {columns?.map((col, i) =>
                            <th className={`border-b-2 border-black h-[30px] bg-[#E2E8F0]  ${supervision && i!=1 ? 'w-1/5' : 'w-2/5'}`} key={`TH_${i}`}>
                                <p>{col.label}</p>
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody >
                    {elements.map((item, i) => (
                        <tr key={`TR_${i}`} className='hover:cursor-pointer h-[30px] bg-white hover:bg-blue-100' onClick={()=>navigate(`/${path}/${item.id}`)}>
                            {columns.map((col, j) => (
                               <td className='border-b p-1' key={`TD_${i}_${j}`}>
                                  {console.log(item[col.attribute])}
                                {col.Component ? <col.Component state={item[col.attribute]}/> : item[col.attribute]}
                                </td>
                            ))}
                        </tr>
                    ))}                  
                </tbody>
                </table>:
                <div className='size-full total-center flex flex-col gap-3 text-center'>
                        <Icons.Empty className='size-12 text-orange-300'/>
                        <p className='text-[20px] '>¡Uuups. No se tiene elementos <br/>que coincidan con lo solicitado!</p>
                </div>
                ):<></>}
            </div>    
        </div>
    )
}

export default CRUD