import React from 'react'
import {Filters}  from '../../constants/datasFilter';
import { Columns } from '../../constants/ColumsDataTable';
import usePrices from '../../Server/Prices/PricesProvider';
import CRUD from '../../components/CRUD/table';

export const Prices=()=>{
    const {prices, pricesStatus} = usePrices();

    return(
       <CRUD
        columns={Columns.ColumnsDataPrecios} 
        data={prices} 
        estatusdata={pricesStatus} 
        filter={true}
        dataFilter={Filters.PricesFilterData}
        switchFilterAdd={true}
        prices={true}/>
    );
}

export default Prices