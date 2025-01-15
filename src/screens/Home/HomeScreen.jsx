import React, { useEffect, useState } from 'react'
import { Columns } from '../../constants/ColumsDataTable';
import useSupervisions from '../../Server/Supervisions/SupervisionsProvider';
import '../../index.css'
import CRUD from '../../components/CRUD/table';
import { Filters } from '../../constants/datasFilter';

const HomeScreen = () => {

    const { supervisions, supervisionsStatus }= useSupervisions();
    console.log(supervisions)
    return (
        <CRUD
         columns={Columns.ColumnsDataHome} 
         data={supervisions} 
         estatusdata={supervisionsStatus} 
         supervision={true} 
         path={"detallesSupervision"}
         filter={true}
         dataFilter={Filters.HomeFilterData}
         searchFilter={true}/>     
    );
}

export default HomeScreen