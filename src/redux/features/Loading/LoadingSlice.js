import { createSlice } from '@reduxjs/toolkit';

const LoadingSlice = createSlice({
    name: 'loading',
    initialState: {
        isShowLoading: false,
    },
    reducers: {
        toggleLoading: (state, action) => {
            state.isShowLoading = action.payload;
        }
    },
});

export const { toggleLoading } = LoadingSlice.actions;
export default LoadingSlice.reducer;