import React from 'react'
import useGanancias from '../../Server/Ganancias/GananciasProvider';
import CRUD from '../../components/CRUD/table';
import { Columns } from '../../constants/ColumsDataTable';

const Ganancias=()=>{

    const {ganancias, gananciasStatus}=useGanancias();

    return(
        <CRUD
        columns={Columns.ColumnsDataGanancias} 
        data={ganancias} 
        estatusdata={gananciasStatus} 
        ganancias={true}
        onlysearch={true}/>   
    );
}

export default Ganancias