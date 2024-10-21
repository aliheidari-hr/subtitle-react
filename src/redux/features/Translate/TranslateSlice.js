import { createSlice } from '@reduxjs/toolkit';

const TranslateSlice = createSlice({
    name: 'translate',
    initialState: {
        files: [],
        activePage: 'AddSubtitle',
        inputLanguage: { value: 'Auto (Recommend)', key: 'auto', error: { isError: false, textError: '' } },
        outputLanguage: { value: 'Select the language', key: null, error: { isError: false, textError: '' } },
        bilingual: false,
    },
    reducers: {
        reset: (state) => {
            state.files = [];
            state.activePage = 'AddSubtitle';
            state.inputLanguage = { value: 'Auto (Recommend)', key: 'auto', error: { isError: false, textError: '' } };
            state.outputLanguage = { value: 'Select the language', key: null, error: { isError: false, textError: '' } };
            state.bilingual = false;
            state.error = { isError: false, textError: '' };
        },
        setInputLanguage: (state, action) => {
            state.inputLanguage = action.payload;
        },
        setOutputLanguage: (state, action) => {
            state.outputLanguage = action.payload;
        },
        setBilingual: (state) => {
            state.bilingual = !state.bilingual;
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
    setInputLanguage,
    setOutputLanguage,
    setBilingual,
    setActivePage,
    setFiles,
    clearFiles,
    removerFile,
    reset,
} = TranslateSlice.actions;
export default TranslateSlice.reducer;