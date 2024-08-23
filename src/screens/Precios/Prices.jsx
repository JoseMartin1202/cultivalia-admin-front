import React from 'react'
import InputSearch from '../../components/inputs/InputSeacrh';
import Filter from '../../components/filter';
import {Filters}  from '../../constants/datasFilter';
import '../../index.css'
import { Columns } from '../../constants/ColumsDataTable';
import Switch from '../../components/switch';
import { Icons } from '../../constants/Icons';


export const Prices=()=>{
    return(
        <div className='sm:ml-14 w-full h-full flex-col bg-[#F1F5F9] p-2'>
            <div className='w-full flex items-start'>
                <div className='flex flex-1 flex-row gap-2 items-center w-full'>
                    <Switch/>
                    <Filter data={Filters.PricesFilterData}/> 
                    <button><Icons.Add className='size-11 text-[#6B9DFF]'/></button>
                </div>
            </div>
            <div>
                <table className="custom-table font-[Roboto]">
                    <thead>
                        <tr>
                            {Columns.ColumnsDataPrecios.map((col, i) =>
                                <th className='border-b-2 border-black' key={`TH_${i}`}>
                                    
                                </th>
                            )}
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

export default Prices