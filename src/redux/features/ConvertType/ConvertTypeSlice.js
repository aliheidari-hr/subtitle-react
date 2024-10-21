import { createSlice } from '@reduxjs/toolkit';

const ConvertTypeSlice = createSlice({
    name: 'convertType',
    initialState: {
        files: [],
        activePage: 'AddSubtitle',
        outputType: { value: 'Select the type', key: null, error: { isError: false, textError: '' } },
    },
    reducers: {
        reset: (state) => {
            state.files = [];
            state.activePage = 'AddSubtitle';
            state.outputType = { value: 'Select the type', error: { isError: false, textError: '' } };
            state.error = { isError: false, textError: '' };
        },
        setOutputType: (state, action) => {
            state.outputType = action.payload;
        },
        setActivePage: (state, action) => {
            state.activePage = action.payload;
        },
        setFiles: (state, action) => {
            state.files = [...state.files, ...action.payload];
        },
        clearFiles: (state) => {
            state.files = [];
        },
        removerFile: (state, action) => {
            state.files = state.files.filter(file => file.id !== action.payload);
        }
    },
});

export const {
    setOutputType,
    setActivePage,
    setFiles,
    clearFiles,
    removerFile,
    reset,
} = ConvertTypeSlice.actions;
export default ConvertTypeSlice.reducer;