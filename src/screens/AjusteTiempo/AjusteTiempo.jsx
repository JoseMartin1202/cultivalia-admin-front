import React from 'react'
import CRUD from '../../components/CRUD/table';
import { Columns } from '../../constants/ColumsDataTable';
import useAjusteTiempos from '../../Server/AjusteTiempo/AjusteTiemposProvider';

const AjusteTiempo=()=>{

    const {ajusteTiempos, ajusteTiemposStatus}=useAjusteTiempos();

    return(
        <CRUD
        columns={Columns.ColumnsDataAjusteTiempos} 
        data={ajusteTiempos} 
        estatusdata={ajusteTiemposStatus}
        ajusteTiempo={true} 
        searchAdd={true}/>   
    );
}

export default AjusteTiempo