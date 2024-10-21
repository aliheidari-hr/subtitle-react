import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Loading from "../../components/Loading/Loading";
import { useSelector } from 'react-redux';
import Notification from '../../components/Notification/Notification';
import { setNotification } from '../../redux/features/Notification/NotificationSlice';

export default function AppLayout() {
    const isShowLoading = useSelector(state => state.loading.isShowLoading);
    const notification = useSelector(state => state.notification.notification);

    return (
        <div className='flex w-full overflow-hidden'>
            <Sidebar />
            <main className='flex flex-col w-full h-full max-h-screen min-h-screen overflow-hidden'>
                <Header />
                <div className='w-full h-full main-height px-[2px] flex flex-col relative'>
                    <div className='w-full h-full overflow-y-auto min-h-[calc(100vh-66px)] max-h-[calc(100vh-66px)] scrollbar-y main-app px-4'>
                        <Outlet />
                    </div>
                    {isShowLoading && <Loading />}
                </div>
            </main>
            <Notification setNotification={setNotification} notification={notification} />
        </div>
    )
}