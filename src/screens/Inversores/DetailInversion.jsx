import React, { useEffect, useState } from 'react';
import { Icons } from '../../constants/Icons';
import AbsScroll from '../../components/AbsScroll';
import { useLocation, useNavigate, useParams} from 'react-router-dom';
import EstadoView from '../../components/estado';
import { formatDateLong, formatDateMedium } from '../../constants/functions';
import useInvestment from '../../Server/Investors/InvestmentDetailProvider';
import Loader from '../../components/Loader';
import EmptyElements from '../../components/EmptyElements';
import { PhotosModal } from '../Galeria/DetailsGalery';

const DetailInversion=()=>{
    const { inversionId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [verFotos,setverFotos]= useState(false)
    const [loading, setLoading] = useState(true)
    const [initIndex, setInitIndex] = useState(0)
    const [ImagenesData, setImagenesData] = useState([])
    const rowData = location.state?.rowData;
    const {investorPagos, investorPagosStatus} = useInvestment(inversionId)

    return (
        <>
        {verFotos &&
            <PhotosModal
            photos={ImagenesData}
            onClose={() => setverFotos(false)}
            initIndex={initIndex}
            supervision={true}
            />
        } 
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
                    {investorPagosStatus=='success' ?
                    <>
                     <div className='flex flex-1 flex-col'>
                        <p className='text-white bg-[#656464] text-lg rounded-t-xl text-center w-full'>Pago Entrante</p>
                        <div className='flex flex-grow border-2 p-2 border-[#656464] rounded-b-xl'>
                            {investorPagos?.pagoE ?
                                <AbsScroll vertical>
                                    <div className='flex flex-col size-full border-2 rounded-lg border-blue-300 px-2 py-1'>
                                        <div className='flex flex-row justify-between'>
                                            <div className='flex flex-col'>
                                                <p><b>Fecha de la venta:</b> {formatDateLong({data:investorPagos?.pagoE?.fechaVenta})}</p>
                                                <p><b>Fecha de pago:</b> {formatDateLong({data:investorPagos?.pagoE?.fechaRegistro})}</p>
                                            </div>
                                            <div className='flex flex-col items-end'>
                                                {investorPagos?.pagoE?.metodo=='Transferencia' ?
                                                    <span className='flex flex-row items-center gap-1 font-bold'>
                                                        Transferencia
                                                        <Icons.Transferencia className='text-[#49C27A] size-6'/>
                                                    </span>:
                                                investorPagos?.pagoE?.metodo=='Efectivo' ?
                                                    <span className='flex flex-row items-center gap-1 font-bold'>
                                                        Efectivo
                                                        <Icons.Efectivo className='text-[#49C27A] size-6'/>                                                    
                                                    </span>:
                                                investorPagos?.pagoE?.metodo=='Cheque' ?
                                                    <span className='flex flex-row items-center gap-1 font-bold'>
                                                        Cheque
                                                        <Icons.Cheque className='text-[#49C27A] size-6'/>
                                                    </span>:
                                                investorPagos?.pagoE?.metodo=='Deposito' ?
                                                    <span className='flex flex-row items-center gap-1 font-bold'>
                                                        Deposito
                                                        <Icons.Deposito className='text-[#49C27A] size-6'/>                                                    
                                                    </span>:
                                                    <span className='flex flex-row items-center gap-1 font-bold'>
                                                        Otro
                                                        <Icons.Information className='text-gray-500 size-6'/>                                                    
                                                    </span>
                                                }
                                                <p><b>Monto:</b> {Number(investorPagos?.pagoE?.monto).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</p>
                                            </div>
                                        </div>
                                        <p><b>Comentarios:</b> {investorPagos?.pagoE?.comentarios}</p>
                                        <div className='relative w-full h-auto'>
                                        {loading && <Loader />}
                                        <img className={`hover:cursor-pointer rounded-lg   ${loading ? 'invisible' : 'visible'}`} src={investorPagos?.pagoE?.comprobante} 
                                        onClick={()=>{setImagenesData([investorPagos?.pagoE?.comprobante]);setverFotos(true); setInitIndex(0)}}
                                        onLoad={() => setLoading(false)}/></div>
                                    </div>
                                </AbsScroll>
                                :
                                <EmptyElements text={"Sin pago entrante"}/>
                            }      
                        </div>
                    </div>
                    <div className='flex flex-1 flex-col'>
                        <p className='text-white bg-[#656464] text-lg rounded-t-xl text-center w-full'>Pagos Salientes</p>
                        <div className='flex flex-grow border-2 border-[#656464] rounded-b-xl'>
                            {investorPagos?.pagosS.length>0 ?
                                <AbsScroll vertical centerColumn>
                                    {investorPagos?.pagosS.map((p)=>(
                                        <div className='flex flex-col size-full px-2 border-2 rounded-lg'>
                                            <div className='flex flex-row justify-between'>
                                                <div className='flex flex-col'>
                                                    <p><b>Fecha de la venta:</b> {formatDateLong({data:p.fechaVenta})}</p>
                                                    <p><b>Fecha de pago:</b> {formatDateLong({data:p.fechaRegistro})}</p>
                                                </div>
                                                <div className='flex flex-col items-end'>
                                                    {p.metodo=='Transferencia' ?
                                                        <span className='flex flex-row items-center gap-1 font-bold'>
                                                            Transferencia
                                                            <Icons.Transferencia className='text-[#49C27A] size-6'/>
                                                        </span>:
                                                    p.metodo=='Efectivo' ?
                                                        <span className='flex flex-row items-center gap-1 font-bold'>
                                                            Efectivo
                                                            <Icons.Efectivo className='text-[#49C27A] size-6'/>                                                    
                                                        </span>:
                                                    p.metodo=='Cheque' ?
                                                        <span className='flex flex-row items-center gap-1 font-bold'>
                                                            Cheque
                                                            <Icons.Cheque className='text-[#49C27A] size-6'/>
                                                        </span>:
                                                    p.metodo=='Deposito' ?
                                                        <span className='flex flex-row items-center gap-1 font-bold'>
                                                            Deposito
                                                            <Icons.Deposito className='text-[#49C27A] size-6'/>                                                    
                                                        </span>:
                                                        <span className='flex flex-row items-center gap-1 font-bold'>
                                                            Otro
                                                            <Icons.Information className='text-gray-500 size-6'/>                                                    
                                                        </span>
                                                    }
                                                    <p><b>Monto:</b> {Number(p.monto).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</p>
                                                </div>
                                            </div>
                                            <p><b>Comentarios:</b> {p.comentarios}</p>
                                            <div className='relative w-full h-auto'>
                                                {loading && <Loader />}
                                                <img className={`hover:cursor-pointer rounded-lg   ${loading ? 'invisible' : 'visible'}`} src={p.comprobante} 
                                                onClick={()=>{setImagenesData([p.comprobante]);setverFotos(true); setInitIndex(0)}}
                                                onLoad={() => setLoading(false)}/></div>
                                            </div>
                                    ))}
                                </AbsScroll>
                                :
                                <EmptyElements text={"Sin pagos salientes"}/>
                            } 
                        </div>
                    </div>
                    </>
                    : <Loader/>}       
                </div>
            </div>
        </div>
        </>
    )
}

export default DetailInversion