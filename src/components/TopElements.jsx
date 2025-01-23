import {React} from 'react'
import { Icons } from '../constants/Icons'

const TopElements=()=>{
    return (
        <div className={`flex flex-row gap-3 w-full`}>
            {onlysearch && <InputSearch formik={formik}/>}
            {searchAdd && 
            <div className='flex flex-row w-full gap-2'>
                <InputSearch formik={formik}/>
                <button onClick={()=>{
                    setSelectedItem(null)  
                    setAgregar(true)
                    setModal(true)
                }}><Icons.Add className='size-11 text-[#6B9DFF]'/></button>
            </div>}
            {searchFilterAdd &&
            <div className='flex-col sm:flex-row flex w-full gap-3'>
                <InputSearch formik={formik}/>
                <div className='flex flex-row flex-grow gap-2'>
                    {supervision ? <Filter data={dataFilter} formik={formik} opt={filterStateSupervisions} />:
                    offers ?  <Filter data={dataFilter} formik={formik} opt={filterStateOffers} />:
                    undefined}
                    <button onClick={()=>{
                        setSelectedItem(null)
                        setEditForm(() => OfferForm);
                        setModal(true) 
                    }}><Icons.Add className='size-11 text-[#6B9DFF]'/></button>
                </div>
            </div>
            }
            {searchFilter &&
            <div className='flex flex-col sm:flex-row w-full gap-3'>
                <div className='flex-1 flex'><InputSearch formik={formik}/></div>
                {supervision ? <Filter data={dataFilter} formik={formik} opt={filterStateSupervisions} />:
                offers ? <Filter data={dataFilter} formik={formik} opt={filterStateOffers} />:
                sales ? <Filter data={dataFilter} formik={formik} opt={filterStateSales} />:
                <Filter data={dataFilter} formik={formik} opt={filterStateInversors} />}
            </div>
            }
            {switchFilterAdd &&
                <div className='w-full flex md:flex-row flex-col md:items-center gap-2 box-border'>
                    <div className='flex flex-row flex-1 gap-3 w-full box-border'>
                        <Filter data={dataFilter} formik={formik} opt={filterStatePrices} />
                        <Switch formik={formik} />
                        <button onClick={() => {
                            setEditForm(() => PricesForm);
                            setModal(true);
                        }}>
                            <Icons.Add className='size-11 text-[#6B9DFF]' />
                        </button>
                    </div>  
                    <button 
                        className='bg-[#FFD34B] size-fit p-2 rounded-xl font-bold' 
                        onClick={() => {
                            setEditForm(() => AnioForm)
                            setanio(true);
                            setModal(true);
                        }}>
                        Agregar año
                    </button>
                </div>}
        </div>
    )
}

export default TopElements