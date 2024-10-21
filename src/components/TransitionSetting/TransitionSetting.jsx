import React, { useEffect } from 'react';
import { languages } from '../../data';
import { FileEarmarkText } from 'react-bootstrap-icons';
import SelectBoxObj from '../../components/Inputs/SelectBoxObj';
import ToggleBox from '../../components/Inputs/ToggleBox';
import { useDispatch, useSelector } from 'react-redux';
import { setInputLanguage, setOutputLanguage, setBilingual, setActivePage } from '../../redux/features/Translate/TranslateSlice';
import useValidation from '../../hooks/useValidations';
import { setNotification } from '../../redux/features/Notification/NotificationSlice';

export default function TransitionSetting() {
    const dispatch = useDispatch();
    const validator = useValidation();
    const inputLanguage = useSelector(state => state.translate.inputLanguage);
    const outputLanguage = useSelector(state => state.translate.outputLanguage);
    const bilingual = useSelector(state => state.translate.bilingual)

    const goToTranslate = () => {
        const outputLanguagesValid = validator({
            type: 'selectBoxObj',
            value: outputLanguage.value,
            key: outputLanguage.key,
            defaultValue: 'Select the language',
            setValue: setOutputLanguage,
            mandatory: true,
            label: 'Output languages'
        });

        if (outputLanguagesValid) {

            if (navigator.onLine) {
                dispatch(setNotification({ isShow: false, text: '', status: false }));
                dispatch(setActivePage('translate'));
            } else {
                dispatch(setNotification({ isShow: true, text: 'Please check your internet connection.', status: false }));
            }
        } else {
            dispatch(setNotification({ isShow: true, text: 'Please select an Output languages.', status: false }));
        }
    }

    useEffect(() => {
        if (outputLanguage.value != 'Select the language' && navigator.onLine) {
            dispatch(setNotification({ isShow: false, text: '', status: false }));
        }
    }, [outputLanguage])

    return (
        <div className='flex flex-col justify-between min-h-[calc(100vh-140px)] bg-white rounded-xl mb-5'>
            <div className='p-3 sm:p-5 grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-7'>
                <SelectBoxObj
                    value={inputLanguage}
                    setValue={setInputLanguage}
                    mandatory={false}
                    array={languages}
                    search={true}
                    defaultValue='Auto (Recommend)'
                    label='Input languages'
                    optionKey='value'
                    optionValue='ln'
                />
                <SelectBoxObj
                    value={outputLanguage}
                    setValue={setOutputLanguage}
                    mandatory={true}
                    array={languages}
                    search={true}
                    defaultValue='Select the language'
                    label='Output languages'
                    optionKey='value'
                    optionValue='ln'
                />
                <div className='p-5 col-span-1 md:col-span-2 border-2 border-dashed border-blue-200 rounded-2xl'>
                    <div className='flex w-full justify-between items-center'>
                        <div className='flex w-full gap-1 items-center'>
                            <FileEarmarkText className='text-blue-500 text-2xl' />
                            <h4 className='text-zinc-600 text-lg'>Bilingual</h4>
                        </div>
                        <ToggleBox status={bilingual} setStatus={() => dispatch(setBilingual())} />
                    </div>
                    <p className='text-zinc-600 text-md pt-3 mt-4 border-t-2 border-solid border-gray-100'>By activating this option, you can have your subtitle translation together with the original translation.</p>
                </div>
            </div>
            <div className='px-3 sm:px-5'>
                <div className='border-t-2 border-solid py-3 sm:py-5 border-gray-100 flex items-center justify-between'>
                    <span onClick={() => dispatch(setActivePage('AddSubtitle'))} className='btn-gray text-[14px] py-[6px] w-fit flex items-center justify-between cursor-pointer'>Prev</span>
                    <span onClick={goToTranslate} className='btn-blue text-[14px] py-[6px] w-fit flex items-center justify-between cursor-pointer'>Next</span>
                </div>
            </div>
        </div>
    )
}