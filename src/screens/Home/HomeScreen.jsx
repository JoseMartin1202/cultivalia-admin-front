import React from 'react'
import InputSearch from '../../components/inputs/InputSeacrh';
import Filter from '../../components/filter';
import {Filters}  from '../../constants/datasFilter';
import '../../index.css'

export const HomeScreen = () => {
    return (
        <div className='sm:ml-14 w-full h-full flex-col bg-[#F1F5F9] p-2'>
            <div className='w-full flex items-start'>
                <div className='flex flex-row gap-4 max-sm:flex-col items-center w-full max-sm:pe-2'>
                    <InputSearch/>
                    <Filter data={Filters.HomeFilterData}/> 
                </div>
            </div>
            <div>
                <table className="custom-table font-[Roboto]">
                    <thead>
                        <tr>
                            <th>Asunto</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
// 
export default HomeScreen