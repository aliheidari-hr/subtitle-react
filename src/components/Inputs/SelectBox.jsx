import React, { memo, useRef, useState, useEffect } from 'react';
import { Check, ChevronUp } from 'react-bootstrap-icons';
import useOutsideClick from '../../hooks/useOutsideClick';
import { useDispatch } from 'react-redux';

const SelectBox = memo(({ mandatory, label, setValue, value, array, search, defaultValue }) => {
    const dispatch = useDispatch();
    const menuRef = useRef(null);
    const listRef = useRef(null);
    const [toggle, setToggle] = useState(false);
    const [filteredArray, setFilteredArray] = useState([]);
    const [flag, setFlag] = useState(false);

    useOutsideClick(menuRef, () => setToggle(false));

    useEffect(() => { setFilteredArray(array) }, [array]);

    useEffect(() => {
        if (toggle && listRef.current) {
            listRef.current.scrollTop = 0;
        }

        if (toggle == true && flag == false && value.value == defaultValue) {
            setFlag(true);
        }

        if (toggle == false && flag == true && value.value == defaultValue) {
            if (mandatory) {
                dispatch(setValue({ value: value.value, error: { isError: true, textError: `Please select an ${label}!` } }));
            } else {
                dispatch(setValue({ value: value.value, error: { isError: false, textError: '' } }));
            }
        }

    }, [toggle]);

    const changeHandler = (event) => {
        const inputValue = event.target.value.trim();
        const newFilter = array.filter(item => item.includes(inputValue));
        setFilteredArray(newFilter);
    }

    return (
        <div className='flex flex-col w-full'>
            <label className='p-1'>
                <span className='text-zinc-600 text-[13px]'>{label}</span>
                {mandatory && <span className='text-red-500 text-[13px]'> * </span>}
            </label>
            <div className='relative' ref={menuRef}>
                <div onClick={() => setToggle(!toggle)} className={`flex items-center cursor-pointer justify-between bg-gray-50 p-3 text-zinc-700 rounded-lg text-[14px] outline outline-2 ${toggle ? 'outline-blue-400' : 'outline-transparent'}`}>
                    <span className='text-zinc-600 text-[14px]'>{value.value}</span>
                    <span className={`transition-all ${toggle ? 'rotate-180' : ''}`}><ChevronUp /></span>
                </div>
                <div className={`absolute bg-white z-10 left-0 shadow-sm w-full border-2 border-solid border-slate-100 rounded-2xl px-1 py-2 transition-all ${toggle ? 'top-[120%]' : 'top-[150%] opacity-0 invisible'}`}>
                    {search &&
                        <div className='pl-3 pb-1'>
                            <input onChange={changeHandler} className='p-2 text-[13px] focusOff text-zinc-600 outline-none border-b-2 border-solid border-gray-100 w-full' type="text" placeholder='search...' />
                        </div>
                    }
                    <div ref={listRef} className='overflow-y-auto scrollbar-y h-full max-h-[14rem]'>
                        <ul className='pl-1 triangleMenu_selectBox w-full h-full transition-all'>
                            {
                                filteredArray.length ? (
                                    <>
                                        <li className={`text-[13px] mt-1 flex h-9 justify-between items-center p-2 cursor-pointer hover:bg-slate-50 transition-all rounded-md ${defaultValue === value.value ? 'text-blue-500 bg-slate-50' : 'text-zinc-600'}`}
                                            onClick={() => {
                                                dispatch(setValue({ value: defaultValue, error: { isError: true, textError: `Please select an ${label}!` } }));
                                                setToggle(false);
                                            }} >
                                            {defaultValue}
                                            {defaultValue === value.value && <span className='text-lg'><Check /></span>}
                                        </li>
                                        {
                                            filteredArray.map((item, i) => (
                                                <li
                                                    onClick={() => {
                                                        dispatch(setValue({ value: item, error: { isError: false, textError: '' } }));
                                                        setToggle(false);
                                                    }}
                                                    key={i}
                                                    className={`text-[13px] mt-1 flex h-9 justify-between items-center p-2 cursor-pointer hover:bg-slate-50 transition-all rounded-md ${item === value.value ? 'text-blue-500 bg-slate-50' : 'text-zinc-600'}`}
                                                >
                                                    {item}
                                                    {item === value.value && <span className='text-lg'><Check /></span>}
                                                </li>
                                            ))
                                        }
                                    </>
                                ) : (
                                    <li className='text-[13px] flex h-9 justify-between items-center p-2 text-zinc-600' >
                                        موردی یافت نشد!
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className='h-6 flex items-center'>
                {value.error.isError && <span className='text-[10px] p-1 text-red-500'>{value.error.textError}</span>}
            </div>
        </div>
    )
})

export default SelectBox;
