import React, { useState, useEffect, useRef } from 'react';
import '../../index.css'
import LogoCult from '../../assets/cultivaliaLogo.png';
import { Icons } from '../../constants/Icons';
import Fondo from '../../assets/fondoAgave.jpg'

export const DetailsGallery=({data})=>{

    const dataExample=[Fondo,LogoCult,Fondo,LogoCult,Fondo,LogoCult]
    const containerRef = useRef(null);

    useEffect(() => {
      const updateColumns = () => {
        if (containerRef.current) {
          const containerWidth = containerRef.current.offsetWidth;
          const itemWidth = 240; // Ancho del elemento en píxeles (ajusta según tu diseño)
          const gap = 16; // Espacio entre elementos en píxeles (ajusta según tu diseño)
          const newColumns = Math.floor(containerWidth / (itemWidth + gap));
          containerRef.current.style.gridTemplateColumns = `repeat(${newColumns}, minmax(0, 1fr))`;
        }
      };
  
      updateColumns();
      window.addEventListener('resize', updateColumns);
      return () => {
        window.removeEventListener('resize', updateColumns);
      };
    }, []);
  
    return (
      <div className='sm:ml-14 w-full h-full flex flex-col gap-3 bg-slate-100 p-2 overflow-y-auto'>
        <div className='w-full h-[93%] bg-white shadow-lg  rounded-2xl overflow-y-auto p-2'>
          <div ref={containerRef} className='w-full h-fit grid gap-4'>
          {dataExample.map((item, i) => (
            <div key={i} className='w-full h-fit rounded-2xl relative'>
              <img src={item} className='size-full object-cover max-h-40 rounded-2xl' />
              <button className='absolute top-0 right-0 bg-gray-800/80 rounded-lg'><Icons.Trash className='size-8 p-2 text-red-500' /></button>
            </div>
          ))}
          <div className='size-full rounded-2xl border-2 border-[#696969] p-1 flex flex-col items-center gap-2'>
              <button className='size-full flex justify-center items-center'><Icons.AddGallery className='size-full max-h-40' /></button>
          </div>
          </div>
        </div>
        <div className='w-full h-[7%] max-sm:h-[5%] flex flex-row items-center font-[Roboto]'>
            <button className='h-full'><Icons.ArrowBack className='size-full min-h-8 min-w-8 text-[#4382ff] hover:text-[#81aafe]'/></button>
            <p className='text-xl max-sm:text-base font-bold pl-3'>Total de fotos:X</p>
            <button className='ms-auto hover:bg-red-300 max-sm:text-base text-xl font-bold bg-red-400 rounded-full py-1 px-3'>Eliminar todas</button>
        </div>
      </div>
    );
}

export default DetailsGallery