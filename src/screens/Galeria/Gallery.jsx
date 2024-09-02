import React from 'react'
import useGalleries from '../../Server/Gallery/GalleriesProvider';
import CRUD from '../../components/CRUD/table';
import { Columns } from '../../constants/ColumsDataTable';

const Gallery=()=>{

    const {galleries, galleriesStatus}=useGalleries();

    return(
        <CRUD
        columns={Columns.ColumnsDataGallery} 
        data={galleries} 
        estatusdata={galleriesStatus} 
        path={"detallesGaleria"}
        galleries={true}
        search={true}
        add={true}
        searchAdd={true}/>   
    );
}

export default Gallery