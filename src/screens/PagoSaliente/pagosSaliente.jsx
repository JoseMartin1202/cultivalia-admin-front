import React from 'react'
import '../../index.css'
import CRUD from '../../components/CRUD/table';
import { Filters } from '../../constants/datasFilter';
import { Columns } from '../../constants/ColumsDataTable';
import usePagosSalientes from '../../Server/PagoSaliente/PagosSalientesProvider';

 const PagosSalientes=()=>{

    const {pagosSalientes, pagosSalientesStatus} = usePagosSalientes();

    return(
       <CRUD
        columns={Columns.ColumnsDataPagosSalientes} 
        data={pagosSalientes} 
        estatusdata={pagosSalientesStatus}
        pagosS={true}
        onlysearch={true}/>
    );
}

export default PagosSalientes