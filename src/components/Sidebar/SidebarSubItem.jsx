import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const SidebarSubItem = memo((props) => {
    return (
        <li className='relative w-[95%] my-0 mx-auto pr-[6px] rounded-md'>
            <Link className='border_side w-full flex hover:bg-white-50 items-center gap-2 p-3 pr-[10px] rounded-md text-zinc-400 transition-all text-[13px] cursor-pointer' to="#">{props.title}</Link>
        </li>
    )
});

export default SidebarSubItem;
