import React from 'react'
import '../../index.css'
import { Columns } from '../../constants/ColumsDataTable';
import CRUD from '../../components/CRUD/table';
import { Filters } from '../../constants/datasFilter';
import useInvestors from '../../Server/Investors/InvestorsProvider';
import Table from '../../components/CRUD/tablaOpcion';

const Investors=()=>{
    
    const { investors, investorsStatus }= useInvestors();

    return(
        <CRUD
        columns={Columns.ColumnsDataInversores} 
        data={investors} 
        estatusdata={investorsStatus}
        searchFilter={true}
        path={"inversor"}
        filter={true}
        dataFilter={Filters.InversorsFilterData}
        investors={true}/> 
    );
}

export default Investors