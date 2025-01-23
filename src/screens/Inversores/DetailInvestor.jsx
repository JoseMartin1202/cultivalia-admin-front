import React, { useEffect, useState } from 'react';
import { Icons } from '../../constants/Icons';
import AbsScroll from '../../components/AbsScroll';
import { useNavigate, useParams } from 'react-router-dom';
import useInvestor from '../../Server/Investors/InvestorProvider';
import Loader from '../../components/Loader';
import { Filters } from '../../constants/datasFilter';
import OptionsDetailsInveror from '../../components/OptionsDetailsInveror';
import Table from '../../components/CRUD/tablaOpcion';
import { Columns } from '../../constants/ColumsDataTable';
import EmptyElements from '../../components/EmptyElements';
import { PhotosModal } from '../Galeria/DetailsGalery';

const DetailInvestor=()=>{
    const { inversorId } = useParams();
    const [ option, setoption ] = useState('Distribuciones');
    const navigate = useNavigate();
    const [verFotos,setverFotos]= useState(false)
    const [loading, setLoading] = useState(true)
    const [initIndex, setInitIndex] = useState(0)
    const [ImagenesData, setImagenesData] = useState([])

    const { 
        investor, investorStatus, 
        investorSales, investorSalesStatus,
        investorPagosE, investorPagosEStatus,
        investorPagosS, investorPagosStatus,
        investorBeneficiarios, investorBeneficiariosStatus
     } = useInvestor(inversorId,option);


    useEffect(()=>{
        if (investorStatus === 'success') {
            setImagenesData([
                investor?.credencialFrente,
                investor?.credencialReverso
            ])
        }
    },[investorStatus])

    if (investorStatus === 'pending' || !investor) {
        return (
        <div className='sm:ml-14 size-full flex flex-col bg-[#f6f6f6] pl-5 py-2 pe-4 sm:pe-3 font-[Roboto]'>
            <div className='size-full flex flex-row bg-white p-2 rounded-xl shadow gap-2'>
                <Loader />
            </div>
        </div>
        );
    }

    return (
        <>
        {verFotos &&
            <PhotosModal
            photos={ImagenesData}
            onClose={() => {
            setImagenesData([
                investor?.credencialFrente,
                investor?.credencialReverso
            ]);
            setverFotos(false)}}
            initIndex={initIndex}
            supervision={true}
            />
        } 
        <div className='sm:pl-[72px] size-full box-border gap-3 flex flex-col bg-[#F1F5F9] pl-4 py-2 pe-4 sm:pe-3 font-[Roboto] overflow-y-auto'>
            <div className='size-full flex flex-col lg:flex-row bg-white p-2 rounded-xl shadow gap-2'>
                <div className="flex flex-col flex-1 lg:min-w-fit  lg:max-w-fit max-lg:max-h-[30%] border-2 shadow rounded-lg box-border p-3 overflow-auto gap-4">
                    <button className='flex flex-row gap-2 py-1 px-3 w-fit rounded-lg bg-[#CBD5E1] items-center text-lg' onClick={()=>{navigate(-1)}}>
                        <Icons.ArrowBack className=' size-5'/>Regresar
                    </button>
                    <div className='flex flex-col max-lg:flex-row max-lg:gap-3'>
                        <div className='flex flex-row w-1/4 lg:w-full justify-center pb-3 min-w-40'>
                            {investor.fotografia ? 
                             <div className='relative flex w-full justify-center'>
                             {loading && (
                                 <div className="absolute flex size-full justify-center items-center">
                                 <Loader />
                                 </div>
                             )}
                             <img className={`hover:cursor-pointer rounded-lg size-40 ${loading ? 'invisible' : 'visible'}`} src={investor.fotografia} 
                             onClick={()=>{setImagenesData([investor.fotografia]);setverFotos(!verFotos); setInitIndex(0)}}
                             onLoad={() => setLoading(false)}/></div>:
                            <Icons.EmptyImage className='size-32  min-w-32'/>}
                        </div>
                        <div className='flex flex-col flex-grow'>
                            <p className='text-2xl font-bold'>{investor.nombre+" "+investor.apellidos}</p>
                            <p className='text-xl'>{investor.curp ?? 'CURP/DNI sin asignar' }</p>
                            <p className='flex flex-row items-center gap-2 text-lg justify-start '>
                                {investor.status=='Completo' ?    <Icons.Accepted className='text-[#279E54] size-5'/>:
                                investor.status=='Rechazado' ?  <Icons.Refused className='text-[#E04646] size-5'/>:
                                investor.status=='Creado' ? <Icons.UserCreated className='text-[#6B9DFF] size-5'/>:
                                investor.status=='Revision' ? <Icons.UserRevision className='text-[#6B9DFF] size-6'/>:
                                <Icons.UserInactive className='text-gray-500'/>}
                                {investor.status}
                            </p>
                            <p className='flex flex-row items-center gap-2'>
                                <Icons.User/>
                                {investor.usuario }
                            </p>
                            <p className='flex flex-row items-center gap-2'>
                                <Icons.Phone/>
                                {investor.telefono }
                            </p>
                            <p className='flex flex-row items-center gap-2'>
                                {investor.sexo=='M' ? <><Icons.Hombre/>Masculino</>:<><Icons.Mujer/>Femenino</>} 
                            </p>
                            <p className='flex flex-row items-center gap-2'>
                                <Icons.User2/>
                                {investor.asesor}
                            </p>
                            <div className='flex flex-row items-center gap-2'>
                                <Icons.Ubication/> 
                                <div className='flex flex-col'>
                                <span>{investor.direccion+", "+investor.colonia}</span>
                                <span>{"CP:"+investor.codigoPostal+", "+investor.estado}</span>
                                </div>
                                
                            </div>
                            <p className='flex flex-row items-center gap-2'>
                                <Icons.Flag/> {investor.pais}
                            </p>
                            <p className='flex flex-row items-center gap-2'>
                                <Icons.Calendar/>
                                {investor.fechaNacimiento} 
                            </p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col flex-grow rounded-lg'>
                    <p className='text-white bg-[#656464] text-lg rounded-t-xl text-center w-full'>Detalles</p>
                    <div className='flex flex-col flex-grow p-2 border-2 border-[#656464] rounded-b-xl'>
                        <OptionsDetailsInveror data={Filters.InversorDetailFilterData} opt={option} setoption={setoption}/>
                        <div className='flex flex-col flex-grow gap-2 px-1'>
                            {option=='Compras' ?
                                investorSalesStatus=='success' ?
                                    ( investorSales.length>0 ?
                                        <Table 
                                        data={investorSales.map(item => ({
                                          ...item,
                                          monto: Number(item.monto)
                                        }))} 
                                        theme='white' 
                                        columns={Columns.ColumnsVentasData} 
                                        search={false}
                                      />
                                        :
                                        <EmptyElements/>
                                    ):
                                <Loader/>
                            :
                            option=='Pagos entrantes' ?
                                investorPagosEStatus=='success' ?
                                    (investorPagosE.length>0 ?
                                        <Table data={investorPagosE.map(item => ({
                                            ...item,
                                            monto: Number(item.monto)
                                          }))}  
                                        theme='white' 
                                        columns={Columns.ColumnsPagosEntrantes} 
                                        search={false}/>
                                        :
                                        <EmptyElements/>
                                    ):
                                <Loader/>
                            :
                            option=='Pagos salientes' ?
                                investorPagosStatus=='success' ?
                                    (investorPagosS.length>0 ?
                                        <Table data={investorPagosS.map(item => ({
                                            ...item,
                                            monto: Number(item.monto)
                                          }))}  
                                        theme='white' 
                                        columns={Columns.ColumnsPagosSalientes} 
                                        search={false}/>
                                        :
                                        <EmptyElements/>
                                    ):
                                <Loader/>
                            :
                            option=='Beneficiarios' ?
                                (investorBeneficiariosStatus=='success' ?
                                    (investorBeneficiarios.length>0 ?
                                        <Table data={investorBeneficiarios} theme='white' columns={Columns.ColumnsBeneficiarios} search={false}/>
                                        :
                                        <EmptyElements/>
                                    ):
                                <Loader/>)
                            :
                            option=='Credenciales' ?
                            <AbsScroll vertical centerRow>
                                { ImagenesData.map((item,i)=>(
                                    item ?
                                    <div key={i} className='relative flex w-full justify-center'>
                                    {loading && (
                                        <div className="absolute flex size-full justify-center items-center">
                                        <Loader />
                                        </div>
                                    )}
                                    <img className={`w-full object-contain hover:cursor-pointer rounded-lg ${loading ? 'invisible' : 'visible'}`} src={item} 
                                    onClick={()=>{setverFotos(!verFotos); setInitIndex(i)}}
                                    onLoad={() => setLoading(false)}/></div>: 

                                    <div key={i} className=' size-[95%] total-center border-2 border-gray-300 rounded-lg'>
                                        <Icons.EmptyImage className='size-20 text-gray-500'/>
                                        <p>Sin imagen</p>
                                    </div>
                                    ))
                                }
                            </AbsScroll>
                            :
                            (investor.distribuciones.length>0 ?
                                <Table data={investor.distribuciones.map(item => ({
                                    ...item,
                                    totalPlantas: Number(item.totalPlantas)
                                  }))}  
                                theme='white' 
                                columns={Columns.ColumnsDistribucionesData} 
                                search={false}/>
                                :
                                <EmptyElements/>
                            )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default DetailInvestor