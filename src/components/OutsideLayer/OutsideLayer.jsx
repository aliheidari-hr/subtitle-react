import React from 'react';
import { useDispatch } from 'react-redux';

export default function OutsideLayer({ setData, custom_class }) {
    const dispatch = useDispatch();

    return (
        <span onClick={() => dispatch(setData())} className={`w-full h-[100vh] backdrop-blur-[1px] fixed top-0 left-0 bg-bg-outSide z-20 transition-all ${custom_class}`}></span>
    )
}
