import React from 'react'
import InputSearch from '../../components/inputs/InputSeacrh';
import Filter from '../../components/filter';
import {Filters}  from '../../constants/datasFilter';
import '../../index.css'
import { Icons } from '../../constants/Icons';

 const Offers=()=>{
    return(
        <div className='sm:ml-14 w-full h-full flex-col bg-[#F1F5F9] p-2'>
            <div className='w-full flex items-start'>
                <div className='flex flex-row gap-4 max-md:flex-col items-center w-full'>
                    <InputSearch/>
                    <div className='flex flex-row md:w-auto w-full gap-2 sm:min-w-fit'>
                        <Filter data={Filters.OffersFilterData}/> 
                        <button><Icons.Add className='size-11 text-[#6B9DFF]'/></button>
                    </div>
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

export default Offers