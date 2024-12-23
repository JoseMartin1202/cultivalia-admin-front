import React, { useState, useEffect, useRef } from 'react';
import { Icons } from '../constants/Icons';
import { valueFromId } from '../constants/functions';

const CustomSelect = ({ id,formik,options, value, onChange, openUp=false,estadoS='',habilitado=true }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);
    const error = valueFromId(id, formik?.errors)
    const touched = valueFromId(id, formik?.touched)
    const showError = error && (touched || formik?.submitCount > 0);
  
    const handleOptionClick = (val) => {
      onChange(val);
      setIsOpen(false); // Cerrar el menú después de seleccionar
    };
  
    // Maneja clics fuera del componente para cerrar el dropdown
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
  
      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }
  
      // Limpia el event listener al desmontar el componente
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);
  
    return (
      <>
      <div className="relative w-full" ref={selectRef}>
        <div
          className={`px-4 py-2 border-gray-300 border-2 rounded-[10px] focus:outline-none  ${
            isOpen ? 'ring-2 ring-indigo-400 border-indigo-500 cursor-pointer' : ''
          } ${estadoS} ${habilitado ? 'cursor-pointer':''}`}
          onClick={() =>{habilitado && setIsOpen(!isOpen)}}
          style={{ userSelect: 'none' }}
        >
          <span className='w-full'>
            {options?.find(opt => opt.value === value)?.label || "ninguna"}
          </span>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700">
            {openUp ? <Icons.ArrowUp className='size-[80%]'/>:<Icons.ArrowDown className='size-[80%]'/>}
          </div>
        </div>
        {isOpen && (
          <ul
            className={`absolute w-full max-h-40 rounded-[10px] overflow-y-auto bg-white border border-gray-300 z-20 ${
              openUp ? 'bottom-full mb-1' : 'mt-1'
            }`}
            style={{ userSelect: 'none' }}
          >
            {options?.map((option) => (
              <li
                key={option.value}
                className="py-1 px-4 hover:bg-[#6e6e6e] hover:text-white cursor-pointer"
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {showError &&
        <div className='h-fit'>
            <p className='font-normal text-lg flex items-center gap-1 h-full italic text-red-500 '>
                <Icons.Alert size="14px" />
                {error}
            </p>
        </div>}
      </>
    );
  };

  export default CustomSelect