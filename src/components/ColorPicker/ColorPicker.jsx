import React from 'react';
import { colors } from '../../data';
import { Eyedropper, Check } from 'react-bootstrap-icons';
import { setColor } from '../../redux/features/Translate/TranslateSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function ColorPicker() {
    const dispatch = useDispatch();
    const color = useSelector(state => state.translate.color);

    return (
        <div className='w-fit mt-3 flex flex-col gap-2'>
            <ul className='grid grid-cols-8 gap-2'>
                {
                    colors.map((item, i) => (
                        <li
                            key={i}
                            onClick={() => dispatch(setColor(item))}
                            style={{ backgroundColor: item }}
                            className={`w-8 h-8 rounded-md cursor-pointer flex justify-center items-center`}
                        >
                            {color == item && <Check className='text-white text-xl' />}
                        </li>
                    ))
                }
            </ul>
            <div className='flex items-center rounded-lg border-2 border-solid border-gray-100 p-1'>
                <span className='text-zinc-600 text-sm min-w-fit p-2'><Eyedropper /></span>
                <input
                    type="color"
                    value={color}
                    onChange={(event) => dispatch(setColor(event.target.value))}
                    style={{ outline: 'none' }}
                    className='border-none w-full h-8 bg-transparent cursor-pointer'
                />
            </div>
        </div>
    )
}
