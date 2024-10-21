import { createSlice } from '@reduxjs/toolkit';

const NotificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notification: { isShow: false, text: '', status: false },
    },
    reducers: {
        setNotification: (state, action) => {
            state.notification = action.payload;
        }
    },
});

export const { setNotification } = NotificationSlice.actions;
export default NotificationSlice.reducer;