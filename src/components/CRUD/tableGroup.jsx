import React, { useEffect, useState } from 'react'
import AbsScroll from '../AbsScroll'
import '../../index.css'
import { Icons } from '../../constants/Icons';

const GroupTable = ({colsAgrup,dataAgruped,cols}) => {
    const [columnas, setcolumns] = useState([]);
    const [elementos, setElements] = useState([]);
    const [detallesRow, setdetallesRow] = useState([]);
    const [columnasDetail, setcolumnasDetail] = useState([]);
    const [focusRow, setFocusRow] = useState();
    

    const handleRowClick = (id) =>{
        setFocusRow(prev => prev === id ? '' : id)
    }

    useEffect(()=>{
        setElements(dataAgruped)
        setcolumns(colsAgrup)
        let cls=[...cols]
        cls.splice(1,1)
        setcolumnasDetail(cls)
    },[dataAgruped])

    useEffect(()=>{
        let newElements=dataAgruped.filter(item => 
            item.anio == focusRow
        );
        setdetallesRow(newElements[0]?.precios || [] )
    },[focusRow,dataAgruped])
    
    return (
    <>
    {elementos.map((item, i) => (
        <>
        <tr key={`TR_${i}`} className={`hover:cursor-pointer hover:bg-blue-100 h-[30px] bg-white ${item.anio === focusRow ? 'font-bold':''}`} onClick={() => { 
            handleRowClick(item.anio)
        }   
        }>
            {columnas.map((col, j) => (
            <td className='border-b p-1' key={`TD_${i}_${j}`}>
                {col.Component ? <col.Component state={item[col.attribute]}/> : item[col.attribute]}
                </td>
            ))}
        </tr>
        { item.anio === focusRow && detallesRow?.length>0 &&
        <tr> 
            <td>
                <div className='w-full h-60 border-blue-300 border-2 bg-slate-50'>
                <AbsScroll vertical horizontal>
                <table className="custom-table">
                    <thead className='sticky top-0 z-5'>
                        <tr>
                            {columnasDetail.map((col, i) =>(
                                <th className={'h-[35px] bg-blue-100'} key={`TH_${i}`}>
                                    <p>{col.label}</p>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {detallesRow.map((item, i) => (
                            <tr key={`TR_${i}`} className=' h-[30px] bg-white'>
                                {columnasDetail.map((col, j) => (
                                <td className='border-b p-1' key={`TD_${i}_${j}`}>
                                    {col.Component ? <col.Component state={item[col.attribute]}/> : item[col.attribute]}
                                    </td>
                                ))}
                            </tr>
                        ))}                  
                    </tbody>
                </table>
                </AbsScroll>
                </div>
            </td>
        </tr>}
        </>
    ))     
    }
    </>
  )
}

export default GroupTable