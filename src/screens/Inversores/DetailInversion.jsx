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
import OptionsDetailsInveror from '../../components/OptionsDetailsInveror';
import { Filters } from '../../constants/datasFilter';
import Table from '../../components/CRUD/tablaOpcion';
import { Columns } from '../../constants/ColumsDataTable';

const DetailInversion=()=>{
    const { inversionId } = useParams();
    const [ option, setoption ] = useState('Pagos');
    const [ mostrarPDF, setmostrarPDF ] = useState(false);
    const [ pdfView, setpdfView ] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const [verFotos,setverFotos]= useState(false)
    const [loading, setLoading] = useState(true)
    const [loadingDocument, setLoadingDocument] = useState(true)
    const [initIndex, setInitIndex] = useState(0)
    const [ImagenesData, setImagenesData] = useState([])
    const rowData = location.state?.rowData;
    const {investorPagos, investorPagosStatus,
        investorContratos,investorContratosStatus,
        investorCartas,investorCartasStatus} = useInvestment(inversionId,option)

    const mostrarDocumento=(data)=>{
        if(data.fileSigned){
            if(data.fileSigned==pdfView){
                if(mostrarPDF){
                    setmostrarPDF(false)
                    setLoadingDocument(true)
                }else
                    setmostrarPDF(true)
            }else{
                setLoadingDocument(true)
                setmostrarPDF(true)
                setpdfView(data.fileSigned)
            }
        }else{
            if(data.file==pdfView){
                if(mostrarPDF){
                    setmostrarPDF(false)
                    setLoadingDocument(true)
                }else
                    setmostrarPDF(true)
            }else{
                setLoadingDocument(true)
                setmostrarPDF(true)
                setpdfView(data.file)
            }
        }
    }

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
            <div className='size-full flex flex-col lg:flex-row bg-white p-2 rounded-xl shadow gap-2'>
                <div className='flex lg:flex-col flex-row lg:w-fit max-h-fit lg:max-h-full h-full rounded-lg shadow border-2 p-2 justify-between overflow-auto'>
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
                    <div className='flex flex-col lg:items-center lg:text-center items-end justify-center'>
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
                <div className='flex flex-col flex-grow gap-1 border-2 rounded-xl p-1'>
                    <OptionsDetailsInveror data={Filters.DistribucionDetail} opt={option} setoption={setoption}/>
                    {
                        option=="Pagos" ?
                            (investorPagosStatus=='success' ?
                                <div className='flex flex-grow flex-col sm:flex-row gap-2'>
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
                                                    <div className='relative w-full h-auto justify-center flex'>
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
                                    <div className='flex flex-grow border-2 border-[#656464] rounded-b-xl p-2'>
                                        {investorPagos?.pagosS.length>0 ?
                                            <AbsScroll vertical centerColumn>
                                                {investorPagos?.pagosS.map((p,index)=>(
                                                    <div key={index} className='flex flex-col size-full px-2 border-2 rounded-lg'>
                                                        <div className='flex flex-row justify-between'>
                                                            <div className='flex flex-col'>
                                                                <p><b>Estado:</b> {p.estado}</p>
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
                                </div>
                            :<Loader/>):
                        option=="Contratos" ?
                            (investorContratosStatus=='success' ?
                                (investorContratos.length>0 ?
                                    <div className='flex size-full flex-row gap-2'>
                                        <Table data={investorContratos} theme='white' columns={Columns.ColumnsContratos} search={false} 
                                        handleRowClick={(rowData)=>mostrarDocumento(rowData)}/>
                                        {mostrarPDF && 
                                                <div className='size-full'>
                                                {loadingDocument &&  <Loader />}
                                                <object
                                                className={`size-full rounded-lg ${loadingDocument ? 'invisible' : 'visible'}`}
                                                data={pdfView}
                                                type='application/pdf'
                                                onLoad={() => setLoadingDocument(false)}
                                                onError={() => {
                                                    setLoadingDocument(false);
                                                    console.error('Error al cargar el PDF.');
                                                }}/>
                                                </div>
                                            }
                                    </div>
                                    :
                                    <EmptyElements/>
                                ):
                             investorContratosStatus=='error' ?
                             <p>Ocurrio un error</p>:
                             <Loader/>
                            )
                        :
                        (investorCartasStatus=='success' ?
                            (investorCartas.length>0 ?
                                <div className='flex size-full flex-row gap-2'>
                                    <Table data={investorCartas} theme='white' columns={Columns.ColumnsCartas} search={false} 
                                    handleRowClick={(rowData)=>mostrarDocumento(rowData)}/>
                                    {mostrarPDF && 
                                            <div className='size-full'>
                                            {loadingDocument &&  <Loader />}
                                            <object
                                            className={`size-full rounded-lg ${loadingDocument ? 'invisible' : 'visible'}`}
                                            data={pdfView}
                                            type='application/pdf'
                                            onLoad={() => setLoadingDocument(false)}
                                            onError={() => {
                                                setLoadingDocument(false);
                                                console.error('Error al cargar el PDF.');
                                            }}/>
                                            </div>
                                        }
                                </div>
                                :
                                <EmptyElements/>
                            ):
                         investorContratosStatus=='error' ?
                         <p>Ocurrio un error</p>:
                         <Loader/>
                        )
                    }      
                </div>
            </div>
        </div>
        </>
    )
}

export default DetailInversion