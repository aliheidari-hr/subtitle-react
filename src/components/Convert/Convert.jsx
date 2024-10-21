import React, { memo, useState, useEffect } from 'react'
import { types } from '../../data';
import { setOutputType, setActivePage } from '../../redux/features/ConvertType/ConvertTypeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Folder } from 'react-bootstrap-icons';
import SubtitleItem from '../Translate/SubtitleItem';
import { setNotification } from '../../redux/features/Notification/NotificationSlice';
import SelectBoxObj from '../Inputs/SelectBoxObj';
import useValidation from '../../hooks/useValidations';
import { writeSubtitle } from '../../utils/writeSubtitle';
import { downloadFile } from '../../utils/downloadSubtitle';


const Convert = memo(() => {
    const dispatch = useDispatch();
    const outputType = useSelector(state => state.convertType.outputType);
    const files = useSelector(state => state.convertType.files);
    const [newFiles, setNewFiles] = useState([]);
    const validator = useValidation();

    useEffect(() => { setNewFiles([]) }, [outputType.key]);

    const convertHandler = () => {
        const typeValid = validator({
            type: 'selectBoxObj',
            value: outputType.value,
            key: outputType.key,
            defaultValue: 'Select the type',
            setValue: setOutputType,
            mandatory: true,
            label: 'Output languages'
        });

        if (files.length && outputType.key) {
            dispatch(setNotification({ isShow: false, text: '', status: false }));
            const newFiles = writeSubtitle({ subtitles: files, bilingual: false, translate: false, type: outputType.key });
            setNewFiles(newFiles);
        } else {
            dispatch(setNotification({ isShow: true, text: 'Please select the type', status: false }));
        }
    }

    const downloadSubtitle = (id) => {
        const subtitle = newFiles.filter((item) => item.id == id);
        downloadFile({ subtitle: subtitle[0] });
    }

    return (
        <div className='flex flex-col justify-between min-h-[calc(100vh-140px)] bg-white rounded-xl mb-5'>
            <div className='flex flex-col p-3 sm:p-5'>
                <div className='w-full flex gap-7'>
                    <div className='w-full 2xl:w-[60%]'>
                        <SelectBoxObj
                            value={outputType}
                            setValue={setOutputType}
                            mandatory={true}
                            array={types}
                            search={true}
                            defaultValue='Select the type'
                            label='subtitle type'
                            optionKey='value'
                            optionValue='name'
                        />
                    </div>
                    <div className='w-full max-w-fit sm:max-w-full flex items-center justify-end'>
                        <span onClick={convertHandler} className='btn-blue text-[14px] py-[9px] translate-y-[2px] w-fit flex items-center justify-between cursor-pointer'>Convert</span>
                    </div>
                </div>
                <div className='flex justify-center items-start pt-3 sm:pt-5 border-t-2 border-solid border-gray-100 min-h-[calc(100vh-360px)]'>
                    {
                        newFiles.length ? (
                            <ul className='grid w-full grid-cols-1 md:grid-cols-2 gap-4 p-3 sm:p-5'>
                                {
                                    newFiles.map((item, index) => (
                                        <SubtitleItem key={item.id} clicked={downloadSubtitle} item={item} name={`${item.name}.${outputType.key}`} index={index} />
                                    ))
                                }
                            </ul>
                        ) : (
                            <div className='w-full h-full flex justify-center items-center min-h-[calc(100vh-380px)]'>
                                <span className='text-[90px] text-slate-600'><Folder /></span>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className='px-3 sm:px-5'>
                <div className='border-t-2 border-solid py-3 sm:py-5 border-gray-100 flex items-center justify-between'>
                    <span
                        onClick={() => {
                            dispatch(setActivePage('AddSubtitle'));
                            dispatch(setNotification({ isShow: false, text: '', status: false }));
                        }}
                        className='btn-gray text-[14px] py-[6px] w-fit flex items-center justify-between cursor-pointer'>
                        Prev
                    </span>
                    <span className='btn-blue text-[14px] py-[6px] w-fit flex items-center justify-between cursor-pointer'>Finish</span>
                </div>
            </div>
        </div>
    )
})

export default Convert;