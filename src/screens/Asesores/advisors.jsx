import React from 'react'
import '../../index.css'
import { Columns } from '../../constants/ColumsDataTable';
import CRUD from '../../components/CRUD/table';
import useAdvisors from '../../Server/Advisors/AdvisorsProvider';


const Advisors=()=>{
    
    const { advisors, advisorsStatus }= useAdvisors();

    return(
        <CRUD
        columns={Columns.ColumnsDataAsesores} 
        data={advisors} 
        estatusdata={advisorsStatus}
        searchAdd={true}
        advisors={true}/> 
    );
}

export default Advisors