import React, { useEffect, useState } from 'react';
import { Icons } from '../../constants/Icons';
import AbsScroll from '../../components/AbsScroll';
import { useLocation, useNavigate, useParams} from 'react-router-dom';
import EstadoView from '../../components/estado';
import { formatDateLong, formatDateMedium } from '../../constants/functions';
import useInvestment from '../../Server/Investors/InvestmentDetailProvider';

const DetailInversion=()=>{
    const { inversionId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    console.log(inversionId)
    const rowData = location.state?.rowData;
    const {investorPagosE, investorPagosEStatus, investorPagosS, investorPagosStatus} = useInvestment(inversionId)

    return (
        <div className='sm:pl-[72px] size-full box-border gap-3 flex flex-col bg-[#F1F5F9] pl-4 py-2 pe-4 sm:pe-3 font-[Roboto] overflow-y-auto'>
            <div className='size-full flex flex-col bg-white p-2 rounded-xl shadow gap-2'>
                <div className='flex flex-row w-full max-h-[30%] h-fit rounded-lg shadow border-2 p-2 justify-between overflow-auto'>
                    <div className='flex flex-col gap-3'>
                        <button className='flex flex-row gap-2 py-1 px-3 w-fit rounded-lg bg-[#CBD5E1] items-center text-lg' onClick={()=>{navigate(-1)}}>
                            <Icons.ArrowBack className=' size-5'/>Regresar
                        </button>
                        <div className='text-lg'>
                            {rowData.type=='distribucion' ?
                            <>
                            <p>Precio por planta: {Number(rowData.precioPlanta).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</p>
                            <p>Precio actual: {Number(rowData.precioPlantaActual).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</p>
                            <p>Predio: {rowData.predio}</p>
                            <p>Tipo: {rowData.tipo}</p>
                            </>:
                            <>
                            </>}
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        {rowData.type=='distribucion' ?
                        <>
                        <p className='text-5xl font-bold'>{rowData.totalPlantas}</p>
                        <Icons.Plant className='size-8'/>
                        </>
                        :
                        <>
                        </>}
                    </div>
                    <div className='flex flex-col items-end justify-center'>
                        {rowData.type=='distribucion' ?
                        <>
                            <p className='text-5xl font-bold text-[#279E54]'>{Number(rowData.monto).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</p>
                            <EstadoView state={rowData.estado} fontlg={true}/>
                            <p>{formatDateLong({data:rowData.fecha_registro})}</p>
                        </>
                        :
                        <>
                        </>}
                    </div>
                </div>
                <div className='flex flex-row flex-grow gap-2'>
                    <div className='flex flex-1 flex-col'>
                        <p className='text-white bg-[#656464] text-lg rounded-t-xl text-center w-full'>Pagos Entrantes</p>
                        <div className='flex flex-grow border-2 border-[#656464] rounded-b-xl'>
                            
                        </div>
                    </div>
                    <div className='flex flex-1 flex-col'>
                        <p className='text-white bg-[#656464] text-lg rounded-t-xl text-center w-full'>Pagos Salientes</p>
                        <div className='flex flex-grow border-2 border-[#656464] rounded-b-xl'>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailInversion