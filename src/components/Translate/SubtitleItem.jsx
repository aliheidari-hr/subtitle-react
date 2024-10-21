import React from 'react';
import { CloudArrowDown } from 'react-bootstrap-icons';

export default function SubtitleItem({ index, item, name, clicked }) {
    return (
        <li className='p-3 cursor-pointer  w-full flex gap-2 h-fit items-center justify-between rounded-xl border-2 border-solid border-gray-100'>
            <div className='flex gap-2 h-fit items-center'>
                <span className='flex p-2 text-sm text-zinc-600 border-r-2 border-solid border-gray-100'>{index + 1}</span>
                <img className='rounded-[10px] max-w-[50px] overflow-hidden' src="assets/images/subtitle.png" alt="subtitle file" />
                <p className='text-[13px] p-1 text-zinc-800'>{name}</p>
            </div>
            <span onClick={() => { clicked(item.id) }} className='text-blue-500 cursor-pointer p-1 text-2xl' ><CloudArrowDown /></span>
        </li>
    )
}
