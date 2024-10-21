import React, { memo } from 'react';

const ToggleBox = memo(({ status, setStatus }) => {
    return (
        <div className='w-fit flex justify-between sm:w-fit sm:justify-normal items-center gap-2'>
            <div onClick={() => setStatus(!status)} className='relative w-[45px] h-[26px] rounded-full bg-gray-100 border-2 border-solid cursor-pointer border-slate-200'>
                <span className={`flex absolute top-[3.5px] w-[16px] h-[16px] transition-all rounded-full ${status ? 'bg-blue-500 right-[4px]' : 'bg-slate-400 right-[21px]'}`}></span>
            </div>
        </div>
    );
});

export default ToggleBox;
