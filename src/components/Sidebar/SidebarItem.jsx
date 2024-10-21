import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import * as Icons from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../redux/features/Sidebar/SidebarSilce';

const SidebarItem = memo((props) => {
    const dispatch = useDispatch();
    const Icon = Icons[props.icon];

    const toggle = () => {
        if (window.innerWidth < 1024) {
            dispatch(toggleSidebar());
        }
    }

    return (
        <li className='w-full'>
            <NavLink
                onClick={toggle}
                className={(link) => link.isActive ? 'text-blue-400 w-full hover:bg-white-50 flex items-center gap-2 p-3 rounded-md transition-all text-[13px] cursor-pointer' : 'text-zinc-300 w-full hover:bg-white-50 flex items-center gap-2 p-3 rounded-md transition-all text-[13px] cursor-pointer'} to={props.href} >
                <Icon className='text-[22px]' />
                <span>{props.title}</span>
            </NavLink>
        </li>
    )
});

export default SidebarItem;