import React from 'react'
import InputSearch from '../../components/inputs/InputSeacrh';
import Filter from '../../components/filter';
import {Filters}  from '../../constants/datasFilter';
import '../../index.css'
import { Columns } from '../../constants/ColumsDataTable';

export const Contract=()=>{
    return(
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
                           
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>dffd</td>
                            <td>dffd</td>
                            <td>dffd</td>
                            <td>dffd</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Contract