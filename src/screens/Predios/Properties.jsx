import React from 'react'
import '../../index.css'
import { Columns } from '../../constants/ColumsDataTable';
import useProperties from '../../Server/Properties/PropertiesProvider';
import CRUD from '../../components/CRUD/table';

export const Properties=()=>{
    
    const { properties, propertiesStatus }= useProperties();

    return(
        <CRUD
        columns={Columns.ColumnsDataPredios} 
        data={properties} 
        estatusdata={propertiesStatus} 
        predios={true}
        search={true}
        add={true}/> 
    );
}

export default Properties