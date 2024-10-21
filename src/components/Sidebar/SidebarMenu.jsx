import React, { useRef, useEffect, useState, memo } from 'react';
import * as Icons from 'react-bootstrap-icons';
import SidebarSubItem from './SidebarSubItem';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebarSubList } from './../../redux/features/Sidebar/SidebarSilce';

const SidebarMenu = memo(({ title, boxID, subItems, icon }) => {
    const isOpenSidbarSubList = useSelector((state) => state.sidebar.isOpenSidbarSubList);
    const dispatch = useDispatch();
    const IconTag = Icons[icon];
    const IconChevronLeft = Icons['ChevronLeft'];
    const subListElem = useRef(null);
    const [heightElem, setHeightElem] = useState(0);

    useEffect(() => {
        if (subListElem.current) {
            setHeightElem(subListElem.current.scrollHeight);
        }
    }, [subItems]);

    useEffect(() => {
        if ((isOpenSidbarSubList == boxID) && (subListElem.current != null)) {
            subListElem.current.style.height = heightElem + 'px';
        } else {
            if (subListElem.current != null) {
                subListElem.current.removeAttribute("style");
            }
        }
    }, [isOpenSidbarSubList]);


    return (
        <li className='w-full'>
            <span onClick={() => dispatch(() => dispatch(toggleSidebarSubList(boxID)))} className={`w-full hover:bg-white-50 flex items-center gap-2 p-3 rounded-md transition-all text-[13px] cursor-pointer ${isOpenSidbarSubList == boxID ? 'bg-white-80 text-white hover:bg-white-80' : 'text-zinc-400'}`} >
                <div className='w-full flex items-center gap-1'>
                    <IconTag className='text-[22px]' />
                    <span>{title}</span>
                </div>
                <IconChevronLeft className={`text-[20px] transition-all duration-300 ${isOpenSidbarSubList == boxID ? '-rotate-90' : ''}`} />
            </span>
            <div className='pr-3'>
                <ul className={`w-full flex flex-col gap-1 overflow-y-hidden h-0 transition-all duration-300 mt-1`} ref={subListElem}>
                    {
                        subItems.map((item) => (
                            <SidebarSubItem key={item.id}{...item} />
                        ))
                    }
                </ul>
            </div>
        </li >
    )
});

export default SidebarMenu;