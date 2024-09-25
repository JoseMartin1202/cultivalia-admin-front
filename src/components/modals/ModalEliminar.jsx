import React, { useEffect, useState } from 'react'
import { Icons } from '../../constants/Icons'
import AbsScroll from '../AbsScroll'
import { useMediaQuery } from 'react-responsive';
import '../../index.css';

const ModalElimiar = ({
  title = "",
  close = () => { },
  content = "",
  actions = [],
  loading = false
}) => {

  return (
    <div id="modalBackground" className={`absolute z-40 size-full left-0 top-0 bg-neutral-900/70 flex justify-center items-center`}>
      <div id="modalBox"
      className={`rounded-2xl flex flex-col bg-white h-fit w-fit`}>
        <div id="modalHeader" className='relative flex w-full h-12 shadow-md total-center bg-slate-300 rounded-ss-2xl rounded-se-2xl'>
          <p className='text-xl font-bold'> {title} </p>
          <button className='rounded-2xl absolute right-1 size-8 total-center hover:bg-slate-200 active:opacity-70 active:duration-0' onClick={close}>
            <Icons.Refused size="22px" className='text-[#E04646]' />
          </button>
        </div>
        <div className='emerge p-4'>{content}</div>
        <div className='flex flex-row-reverse gap-1 p-1'>
          {
            actions.map((action, index) =>
              <button type="button" key={index}
                className={`rounded-2xl total-center w-full bg-[#FFD34B] h-8 font-bold text-lg active:opacity-80  
                ${loading && 'cursor-not-allowed bg-[#a7a7a7]'} `}
                onClick={action.onClick}
                disabled={loading}>
                <p>{action.label}</p>
              </button>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default ModalElimiar