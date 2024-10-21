import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { translator } from '../../utils/translator';
import { toggleLoading } from '../../redux/features/Loading/LoadingSlice';
import { reset, setActivePage } from '../../redux/features/Translate/TranslateSlice';
import SubtitleItem from './SubtitleItem';
import { downloadFile } from '../../utils/downloadSubtitle';
import { setNotification } from '../../redux/features/Notification/NotificationSlice';
import { writeSubtitle } from '../../utils/writeSubtitle';

export default function Translate() {
    const dispatch = useDispatch();
    const [newFiles, setNewFiles] = useState([]);
    const files = useSelector(state => state.translate.files);
    const inputLanguage = useSelector(state => state.translate.inputLanguage);
    const outputLanguage = useSelector(state => state.translate.outputLanguage);
    const bilingual = useSelector(state => state.translate.bilingual)

    useEffect(() => {
        const translateFiles = async () => {
            dispatch(toggleLoading(true));

            const { status, translateFiles, error } = await translator({
                fileArray: files,
                inputLanguage: inputLanguage.key,
                outputLanguage: outputLanguage.key
            });

            if (!status && error) {
                dispatch(setActivePage('transitionSetting'));
                setTimeout(() => { dispatch(setNotification({ isShow: true, text: error, status: false })); }, 0);
            } else {
                const writeNewFiles = writeSubtitle({ subtitles: translateFiles, bilingual, translate: true, type: 'default' });
                setNewFiles([...writeNewFiles]);
            }

            dispatch(toggleLoading(false));
        };

        if (files.length > 0 && inputLanguage.key && outputLanguage.key) {
            translateFiles();
        } else {
            dispatch(setActivePage('AddSubtitle'));
        }
    }, []);

    const downloadSubtitle = useCallback((id) => {
        const subtitle = newFiles.filter((item) => item.id == id);
        downloadFile({ subtitle: subtitle[0], outputLanguage: outputLanguage.key });
    }, [newFiles, bilingual, outputLanguage]);

    const finishHandler = useCallback(() => {
        dispatch(toggleLoading(true));
        dispatch(reset());
        dispatch(toggleLoading(false));
    }, [dispatch]);

    return (
        <div className='flex flex-col justify-between min-h-[calc(100vh-140px)] bg-white rounded-xl mb-5'>
            <ul className='grid w-full grid-cols-1 md:grid-cols-2 gap-4 p-3 sm:p-5'>
                {newFiles.length > 0 &&
                    newFiles.map((item, index) =>
                        <SubtitleItem
                            key={item.id}
                            clicked={downloadSubtitle}
                            item={item}
                            name={`${item.name}-${outputLanguage.key}.${item.type}`}
                            index={index}
                        />
                    )
                }
            </ul>
            <div className='px-3 sm:px-5 mt-auto'>
                <div className='border-t-2 border-solid py-3 sm:py-5 border-gray-100 flex items-center justify-between'>
                    <span onClick={() => dispatch(setActivePage('transitionSetting'))} className='btn-gray text-[14px] py-[6px] w-fit flex items-center justify-between cursor-pointer'>Prev</span>
                    <span className='btn-blue text-[14px] py-[6px] w-fit flex items-center justify-between cursor-pointer' onClick={finishHandler}>Finish</span>
                </div>
            </div>
        </div>
    );
}
