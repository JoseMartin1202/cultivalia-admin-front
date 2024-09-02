import React from 'react'
import '../../index.css'
import useOffers from '../../Server/Offers/OffersProvider';
import CRUD from '../../components/CRUD/table';
import { Filters } from '../../constants/datasFilter';
import { Columns } from '../../constants/ColumsDataTable';

 const Offers=()=>{

    const {offers, offersStatus} = useOffers();

    return(
       <CRUD
        columns={Columns.ColumnsDataOfertas} 
        data={offers} 
        estatusdata={offersStatus} 
        filter={true}
        dataFilter={Filters.OffersFilterData}
        offers={true}
        searchFilterAdd={true}/>
    );
}

export default Offers