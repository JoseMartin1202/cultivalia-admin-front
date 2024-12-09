import React from 'react'
import '../../index.css'
import { Columns } from '../../constants/ColumsDataTable';
import CRUD from '../../components/CRUD/table';
import useSales from '../../Server/Sales/SalesProvider';
import { Filters } from '../../constants/datasFilter';

const Sales=()=>{
    
    const { sales, salesStatus }= useSales();

    return(
        <CRUD
        columns={Columns.ColumnsDataVentas} 
        data={sales} 
        estatusdata={salesStatus} 
        sales={true}
        searchFilter={true}
        dataFilter={Filters.SalesFilterData}
        filter={true}/> 
    );
}

export default Sales