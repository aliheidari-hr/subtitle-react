import React, { memo } from 'react';
import { sidbarData } from './../../data';
import { List } from 'react-bootstrap-icons';
import SidebarList from './SidebarList';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../redux/features/Sidebar/SidebarSilce';
import OutsideLayer from '../OutsideLayer/OutsideLayer';

const Sidebar = memo(() => {
    const dispatch = useDispatch();
    const isOpenSidbar = useSelector((state) => state.sidebar.isOpenSidbar);

    return (
        <>
            <div className={`sidebar transition-all duration-300 overflow-hidden fixed lg:sticky top-0 -left-[260px] lg:left-auto bg-[#161b22] flex py-2 px-2 flex-col z-[3000] w-[250px] min-w-[250px] max-w-[250px] h-full min-h-[100vh] max-h-[100vh] ${isOpenSidbar ? 'left-[0] lg:-ml-[250px]' : ''}`}>
                <div className='flex justify-between items-center h-[35px] px-1 pt-3'>
                    <div className='flex items-center gap-2 pl-2'>
                        <img className='w-full max-w-[35px]' src="/assets/images/logo.svg" alt="Subtitle Tools" />

                        <span className='text-zinc-300 text-[14px]'>Subtitle Tools</span>
                    </div>
                    <span
                        onClick={() => {
                            dispatch(toggleSidebar());
                        }}
                        className='min-w-fit visible lg:invisible p-[9px] cursor-pointer rounded-full transition-all border-2 border-solid border-transparent hover:border-white-80 hover:bg-white-50'>
                        <List className='text-[22px] text-slate-300' />
                    </span>
                </div>
                <div className='relative w-full mt-2'>
                    <ul className='w-full flex flex-col gap-4 h-full max-h-[calc(100vh-95px)] overflow-y-scroll pl-2 sidebarScrollbar'>
                        {
                            sidbarData.map((item) => (
                                <SidebarList key={item.id} {...item} />
                            ))
                        }
                    </ul>
                </div>
            </div>
            {isOpenSidbar && <OutsideLayer setData={toggleSidebar} custom_class='lg:hidden z-[2000]' />}
        </>
    )
});

export default Sidebar;