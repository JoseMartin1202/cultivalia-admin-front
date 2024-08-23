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
        supervision={false} 
        predios={true}
        editRow={true}
        drop={false}
        search={true}
        filter={false}
        add={true}/> 
    );
}

export default Properties