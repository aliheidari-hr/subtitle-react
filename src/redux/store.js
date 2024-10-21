import { configureStore } from '@reduxjs/toolkit';
import SidebarSilce from './features/Sidebar/SidebarSilce';
import LoadingSlice from './features/Loading/LoadingSlice';
import TranslateSlice from './features/Translate/TranslateSlice';
import ConvertTypeSlice from './features/ConvertType/ConvertTypeSlice';
import NotificationSlice from './features/Notification/NotificationSlice';

export const store = configureStore({
    reducer: {
        sidebar: SidebarSilce,
        loading: LoadingSlice,
        translate: TranslateSlice,
        convertType: ConvertTypeSlice,
        notification: NotificationSlice,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                warnAfter: 500,
            },
        }),
});


