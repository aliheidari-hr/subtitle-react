import React, { memo } from 'react';
import SidebarItem from './SidebarItem';
import SidebarMenu from './SidebarMenu';

const SidebarList = memo((props) => {
    return (
        <li className='w-full flex items-start justify-center flex-col mt-3 gap-2 border-t-2 border-solid border-[#30363db3] pt-2'>
            <ul className='w-full flex items-start justify-center flex-col gap-1'>
                {
                    props.listItems.map((item) => (
                        item.subItems ? (<SidebarMenu key={item.id} {...item} />) : (<SidebarItem key={item.id} {...item} />)
                    ))
                }
            </ul>
        </li>
    )
});

export default SidebarList;
