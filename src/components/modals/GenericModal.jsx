import React, { useEffect, useState } from 'react'
import { Icons } from '../../constants/Icons'
import AbsScroll from '../AbsScroll'
import { useMediaQuery } from 'react-responsive';
import '../../index.css';

const GenericModal = ({
  title = "",
  close = () => { },
  content = "",
  actions = [],
  loading = false,
  necesary=true,
  center
}) => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 640px)' });
  const [isSmall,setIsSmall]=useState(false);
  
  useEffect(() => {
    if (isSmallScreen) {
       setIsSmall(true);
    }else{
      setIsSmall(false);
    }
  }, [isSmallScreen]);

  return (
    <div id="modalBackground" className={`absolute z-40 size-full left-0 top-0 bg-neutral-900/70 flex justify-center ${center? 'items-center':'items-end'} sm:items-center`}>
      <div id="modalBox"
      className={`rounded-2xl flex flex-col w-full bg-white ${necesary ? 'max-sm:h-[95%]':''} h-fit sm:w-4/5 lg:w-[70%]`}>
        <div id="modalHeader" className='relative flex w-full h-12 shadow-md total-center bg-slate-300 rounded-ss-2xl rounded-se-2xl'>
          <p className='text-xl font-bold'> {title} </p>
          <button className='rounded-2xl absolute right-1 size-8 total-center hover:bg-slate-200 active:opacity-70 active:duration-0' onClick={close}>
            <Icons.Refused size="22px" className='text-[#E04646]' />
          </button>
        </div>
          {isSmall && necesary ? 
            <AbsScroll vertical>{content}</AbsScroll>:
            <div className='emerge'>{content}</div>
          }
        <div className='flex flex-row-reverse gap-1 p-1'>
          {
            actions.map((action, index) =>
              <button type="button" key={index}
                className={`rounded-2xl total-center w-full bg-[#FFD34B] h-8 font-bold text-lg active:opacity-80  
                ${loading && 'cursor-not-allowed'} `}
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

export default GenericModal