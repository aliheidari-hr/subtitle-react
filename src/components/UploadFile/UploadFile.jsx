import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Folder, Plus } from 'react-bootstrap-icons';
import FileItem from './FileItem';
import { toggleLoading } from '../../redux/features/Loading/LoadingSlice';
import useAddFiles from '../../hooks/useAddFiles';

const UploadFile = memo(({ files, setFiles, setNotification, clearFiles, encode, setActivePage, removerFile, activePage }) => {
    const dispatch = useDispatch();
    const addFiles = useAddFiles(encode);

    const addSubtitle = async (event) => {
        dispatch(toggleLoading(true));

        const { subtitles } = await addFiles(event);

        if (!subtitles[0].isError) {
            dispatch(setFiles(subtitles));
        } else {
            dispatch(setNotification(subtitles[0]));
        }

        dispatch(toggleLoading(false));
    }

    const goTransitionSetting = () => {
        if (files.length) {
            dispatch(setActivePage(activePage));
        } else {
            dispatch(setNotification({ isShow: true, text: 'Please select the file', status: false }));
        }
    }

    return (
        <div className='flex flex-col justify-between min-h-[calc(100vh-140px)] bg-white rounded-xl mb-5'>
            <div className='flex flex-col p-3 sm:p-5'>
                <div className='flex justify-between items-center pb-3 sm:pb-5'>
                    <span className='btn-blue flex items-center justify-between relative cursor-pointer'>
                        <input onChange={addSubtitle} multiple accept=".srt,.sub,.vtt" type="file" className='absolute w-full h-full opacity-0 cursor-pointer inputBtn' />
                        <span className='text-md'>Add Subtitle</span>
                        <span className='text-base translate-y-[1px] w-[14px]'><Plus /></span>
                    </span>
                    <span onClick={() => files.length && dispatch(clearFiles())} className='btn-red flex items-center justify-between relative cursor-pointer'>Remove all</span>
                </div>
                <div className='flex justify-center items-center border-t-2 border-solid border-gray-100 pt-3 sm:pt-5'>
                    {
                        files.length ? (
                            <ul className='grid w-full grid-cols-1 md:grid-cols-2 gap-4'>
                                {
                                    files.map((item, number) => (
                                        <FileItem key={item.id} item={item} number={number + 1} remove={removerFile} />
                                    ))
                                }
                            </ul>
                        ) : (
                            <div className='flex justify-center items-center min-h-[calc(100vh-350px)] max-h-[calc(100vh-350px)]'>
                                <span className='text-[90px] text-slate-600'><Folder /></span>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className='px-3 sm:px-5'>
                <div className='border-t-2 border-solid py-3 sm:py-5 border-gray-100 flex items-center justify-between'>
                    <span className='text-zinc-600 text-[12px] md:text-[13px]'>{files.length} Files</span>
                    <span onClick={goTransitionSetting} className='btn-blue text-[14px] py-[6px] w-fit flex items-center justify-between cursor-pointer'>Next</span>
                </div>
            </div>
        </div>
    )
})


export default UploadFile;