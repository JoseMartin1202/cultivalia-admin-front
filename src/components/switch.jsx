import React, { useState } from 'react';

const Switch = ({formik}) => {
    const [isOn, setIsOn] = useState(false);

    const toggleSwitch = () => {
        const newIsOn = !isOn;
        setIsOn(newIsOn);
        formik.setFieldValue('groupByYear', newIsOn);
    };

    return (
        <div className='flex w-fit flex-row relative items-center border-2 border-[#696969] py-1 pe-2 bg-white rounded-2xl' >
            <p className='font-[Roboto] px-2 text-center'>Agrupar por año</p>
            <button
            onClick={toggleSwitch}
            className={`w-14 h-8 flex min-w-14 items-center rounded-full p-1 duration-300 ease-in-out ${ isOn ? 'bg-[#49C27A]' : 'bg-gray-300'}`}>
            <div
            className={`bg-white size-6 rounded-full shadow-md transform duration-300 ease-in-out ${isOn ? 'translate-x-[95%]' : ''}`}/>
            </button>
        </div>
        
    );
};

export default Switch;