import React, { useEffect, useState } from 'react'
import { Columns } from '../../constants/ColumsDataTable';
import useSupervisions from '../../Server/Supervisions/SupervisionsProvider';
import '../../index.css'
import CRUD from '../../components/CRUD/table';
import { Filters } from '../../constants/datasFilter';

const HomeScreen = () => {

    const { supervisions, supervisionsStatus }= useSupervisions();

    return (
        <CRUD
         columns={Columns.ColumnsDataHome} 
         data={supervisions} 
         estatusdata={supervisionsStatus} 
         supervision={true} 
         path={"detallesSupervision"}
         search={true}
         filter={true}
         dataFilter={Filters.HomeFilterData}/>     
    );
}
// 
export default HomeScreen