import React from 'react'
import '../../index.css'
import { Columns } from '../../constants/ColumsDataTable';
import CRUD from '../../components/CRUD/table';
import { Filters } from '../../constants/datasFilter';
import useInvestors from '../../Server/Investors/InvestorsProvider';

const Investors=()=>{
    
    const { investors, investorsStatus }= useInvestors();

    return(
        <CRUD
        columns={Columns.ColumnsDataInversores} 
        data={investors} 
        estatusdata={investorsStatus}
        onlysearch={true}
        investors={true}/> 
    );
}

export default Investors