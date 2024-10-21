import { createSlice } from '@reduxjs/toolkit';

const sidbarSlice = createSlice({
    name: 'sidbar',
    initialState: {
        isOpenSidbar: false,
        isOpenSidbarSubList: null,
    },
    reducers: {
        toggleSidebar: (state) => {
            state.isOpenSidbar = !state.isOpenSidbar;
        },
        toggleSidebarSubList: (state, action) => {
            state.isOpenSidbarSubList = state.isOpenSidbarSubList === action.payload ? null : action.payload;
        }
    },
});

export const { toggleSidebar, toggleSidebarSubList } = sidbarSlice.actions;
export default sidbarSlice.reducer;
