import React from 'react'
import '../../index.css'
import CRUD from '../../components/CRUD/table';
import { Filters } from '../../constants/datasFilter';
import { Columns } from '../../constants/ColumsDataTable';
import useJimas from '../../Server/Jimas/JimasProvider';

 const Jimas=()=>{

    const {jimas, jimasStatus} = useJimas();

    return(
       <CRUD
        columns={Columns.ColumnsDataJimas} 
        data={jimas} 
        estatusdata={jimasStatus}
        jimas={true}
        searchAdd={true}/>
    );
}

export default Jimas