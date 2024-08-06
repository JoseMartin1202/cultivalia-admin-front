import {React,useEffect,useState } from 'react'
import '../../index.css'
import { Icons } from '../../constants/Icons';

export const DetailsSupervisions=()=>{
    const data=["sdadas"]
    const [value, setValue] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [bgOption, setbgOption] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleChangeOption = (event) => {
        setSelectedOption(event.target.value);
    };
    
    useEffect(() => {
        if (selectedOption=='Aceptado') {
            setbgOption('bg-[#49C27A]/50');
        }else if(selectedOption=='Rechazado'){
            setbgOption('bg-[#edb3b3]');
        }else{
            setbgOption('bg-[#FFFFFF]');
        }
      }, [selectedOption]);

    return(
        <div className='sm:ml-14 size-full gap-4 flex flex-col bg-[#F1F5F9] p-3 font-[Roboto] max-sm:overflow-y-auto max-sm:mb-2'>
            <div className='flex flex-row w-full h-full gap-4 max-sm:flex-col-reverse'>
                <div className='flex flex-col w-1/2 gap-4 h-full max-sm:flex-row max-sm:w-full'>
                    <div className='flex flex-col flex-1'>
                        <p className='font-bold text-lg'>Descripción:</p>
                        <div className='size-full shadow-lg shadow-black/30 bg-white rounded-2xl p-2 overflow-y-auto'><span>{data}</span></div>
                    </div>
                    <div className='flex flex-col flex-1'>
                        <p htmlFor="multiline-input" className='font-bold text-lg'>Comentarios:</p>
                        <textarea
                            id="multiline-input"
                            value={value}
                            onChange={handleChange}
                            className='p-2 w-full h-full resize-none border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500'
                            placeholder="Escribe tus comentarios aquí..."/>
                    </div>
                </div>
                <div className='flex flex-col w-1/2 h-full shadow-lg shadow-black/30 p-2 bg-white rounded-2xl max-sm:w-full overflow-y-auto'>
                    <div id='Credencial'>
                        {data}
                    </div>
                    <div>{data}</div>
                </div>
            </div>
            <div className='w-full sm:h-auto flex flex-row gap-4 items-center max-sm:flex-col'>
                <div className='flex flex-row w-full sm:w-[40%] items-center gap-2'>
                    <p className='font-bold text-lg'>Estado:</p>
                    <div className='relative size-full text-xl min-w-fit'>
                        <select
                        id="custom-select"
                        value={selectedOption}
                        onChange={handleChangeOption}
                        className={`w-full text appearance-none block size-full border-gray-300 border-[1px] py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 ${bgOption}`}
                        >
                            <option className='bg-white' value="Aceptado">Aceptado</option>
                            <option className='bg-white' value="Rechazado" >Rechazado</option>
                            <option className='bg-white' value="Pendiente">Pendiente</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700">
                            <Icons.ArrowUp className='size-[80%] max-md:size-[60%]'/>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row size-full sm:w-[60%] gap-4'>
                    <button className='bg-[#FFD34B] size-full max-sm:py-2 rounded-2xl text-xl font-bold'>Guardar</button>
                    <button className='bg-[#CBD5E1] size-full rounded-2xl text-xl font-bold'>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default DetailsSupervisions