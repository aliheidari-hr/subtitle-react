import React, { memo } from 'react';
import { List } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../redux/features/Sidebar/SidebarSilce';

const Header = memo(() => {
    const dispatch = useDispatch();

    return (
        <header className='bg-white h-[65px] flex justify-between p-2 items-center border-b-2 border-solid border-b-slate-100'>
            <span onClick={() => dispatch(toggleSidebar())} className='p-[7px] cursor-pointer rounded-full transition-all border-2 border-solid border-transparent hover:border-gray-100 hover:bg-slate-50'>
                <List className='text-[22px] text-zinc-500' />
            </span>
        </header>
    );
});

export default Header;
