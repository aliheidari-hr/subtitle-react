import React from 'react';
import { ExclamationCircle, CheckCircle } from 'react-bootstrap-icons';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';

export default function Notification({ setNotification, notification }) {
    const dispatch = useDispatch();

    return createPortal(
        <div className={`${notification.isShow ? '' : 'opacity-0 invisible'} transition-all fixed top-0 left-0 w-full h-[100vh] flex justify-center items-center bg-black-50 backdrop-blur-[1px] z-[4000]`}>
            <div className={`w-full max-w-[310px] rounded-2xl ${notification.isShow ? 'notificationShow' : 'notificationHide'} transition-all bg-white flex justify-center items-center`}>
                <div className='w-full p-5 gap-2 flex flex-col justify-between items-center'>
                    <span className={`${notification.status ? 'text-green-500' : 'text-red-400'} text-5xl min-w-fit flex`}>
                        {notification.status ? (<CheckCircle />) : (<ExclamationCircle />)}
                    </span>
                    <h2 className='w-full text-sm text-center py-4 text-zinc-700'>{notification.text}</h2>
                    <div className='w-full flex justify-center items-center'>
                        <span className='btn-gray px-5 py-[6px]' onClick={() => dispatch(setNotification({ isShow: false, text: notification.text, status: notification.status }))}>close</span>
                    </div>
                </div>
            </div>
        </div>

        , document.getElementById('parent_module')
    )
}
