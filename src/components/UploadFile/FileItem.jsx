import React, { memo } from 'react';
import { Trash } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';

const FileItem = memo(({ item, number, remove }) => {
    const dispatch = useDispatch();

    return (
        <li className='p-3 flex justify-between items-center w-full rounded-xl border-2 border-solid border-gray-100'>
            <div className='w-full flex items-center gap-2'>
                <span className='flex p-2 text-sm text-zinc-600 border-r-2 border-solid border-gray-100'>{number}</span>
                <img className='rounded-[10px] max-w-[50px] overflow-hidden' src="/assets/images/subtitle.png" alt="subtitle file" />
                <p className='text-[13px] p-1 text-zinc-800'>{item.name}</p>
            </div>
            <span onClick={() => dispatch(remove(item.id))} className='text-red-500 cursor-pointer p-2 text-xl'><Trash /></span>
        </li>
    )
})

export default FileItem;