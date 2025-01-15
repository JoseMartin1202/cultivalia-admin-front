import React, { useState } from 'react';
import { Icons } from '../../constants/Icons';
import AbsScroll from '../../components/AbsScroll';
import { useParams } from 'react-router-dom';
import useInvestor from '../../Server/Investors/InvestorProvider';
import Loader from '../../components/Loader';
import { Filters } from '../../constants/datasFilter';
import OptionsDetailsInveror from '../../components/OptionsDetailsInveror';

const DetailInvestor=()=>{
    const { inversorId } = useParams();
    const { investor, investorStatus } = useInvestor(inversorId);
    const [ option, setoption ] = useState('Distribuciones');

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
        <div className='sm:pl-[76px] size-full box-border gap-3 flex flex-col bg-[#F1F5F9] pl-4 py-2 pe-4 sm:pe-3 font-[Roboto] overflow-y-auto'>
            <div className='size-full flex flex-col xl:flex-row bg-white p-2 rounded-xl shadow gap-2'>
                <div className='flex flex-row xl:flex-col flex-grow xl:max-w-fit max-xl:max-h-[40%] gap-2'>
                    <div className="flex flex-col max-h-fit flex-1 border-2 border-black rounded-lg box-border p-3 overflow-auto">
                        <div className='flex flex-col lg:flex-row w-full h-fit items-center lg:items-start'>
                            {investor.fotografia ? <img src={investor.fotografia} className='size-20 md:size-30 lg:size-40 rounded-lg'/>:<Icons.EmptyImage className='size-32  min-w-32'/>}
                            <div className='flex flex-col size-full text-center lg:px-2'>
                                <p className='text-2xl font-bold'>{investor.nombre+" "+investor.apellidos}</p>
                                <p className='text-xl'>{investor.curp ?? 'CURP/DNI sin asignar' }</p>
                                <p className='flex flex-row items-center gap-2 text-lg justify-center lg:justify-start'>
                                    {investor.status=='Completo' ?    <Icons.Accepted className='text-[#279E54] size-5'/>:
                                    investor.status=='Rechazado' ?  <Icons.Refused className='text-[#E04646] size-5'/>:
                                    investor.status=='Creado' ? <Icons.UserCreated className='text-[#6B9DFF] size-5'/>:
                                    investor.status=='Revision' ? <Icons.UserRevision className='text-[#6B9DFF] size-6'/>:
                                    <Icons.UserInactive className='text-gray-500'/>}
                                    {investor.status}
                                </p>
                                <p className='flex flex-row items-center gap-2'>
                                    <Icons.User/>
                                    {investor.usuario.username }
                                </p>
                                <p className='flex flex-row items-center gap-2'>
                                    <Icons.Phone/>
                                    {investor.telefono }
                                </p>
                                <p className='flex flex-row items-center gap-2'>
                                    {investor.sexo=='M' ? <><Icons.Hombre/>Masculino</>:<><Icons.Mujer/>Femenino</>} 
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col items-center lg:items-start'>
                            <p className='flex flex-row items-center gap-2'>
                                <Icons.User2/>
                                {investor.asesor?.nombre ?? 'Asesor: Sin asesor'}
                            </p>
                            <p className='flex flex-row items-center gap-2'>
                                <Icons.Ubication/> 
                                <span>{investor.direccion+", "+investor.colonia+". CP:"+investor.codigoPostal+", "+investor.estado}</span>
                            </p>
                            <p className='flex flex-row items-center gap-2'>
                                <Icons.Flag/>Nacionalidad {investor.pais}
                            </p>
                            <p className='flex flex-row items-center gap-2'>
                                <Icons.Calendar/>
                                {investor.fechaNacimiento} 
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col flex-1 items-center border-2 border-black rounded-lg p-1 gap-2">
                            <p>Credenciales</p>
                            <AbsScroll vertical centerColumn>
                                <img src={investor.credencialFrente} className='rounded-lg'/>
                                <img src={investor.credencialReverso} className='rounded-lg'/>
                            </AbsScroll>
                    </div>
                </div>
                <div className='flex flex-col flex-grow border-2 border-black rounded-lg p-1'>
                    <OptionsDetailsInveror data={Filters.InversorDetailFilterData} opt={option} setoption={setoption}/>
                   <div className='flex flex-col flex-grow'>
                        {investor.distribuciones.map((d)=>(
                            <div className='flex flex-row w-full'>
                                <div className='flex flex-row items-center gap-2'>
                                    <Icons.Comision/>
                                    <div className='flex flex-col'>
                                        <p>{d.tipo}</p>
                                        <p>{Number(d.totalPlantas*d.precioPlanta).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</p>
                                    </div> 
                                </div> 
                                <div className='flex flex-col items-center gap-2'>
                                    <div className='flex flex-row items-center gap-1'>
                                        <p>{d.totalPlantas}</p>
                                        <Icons.Plant/>
                                    </div> 
                                    <p>{d.predio.nombre}</p>
                                </div> 
                            </div>
                        ))}
                   </div>
                </div>
            </div>
        </div>
    )
}

export default DetailInvestor