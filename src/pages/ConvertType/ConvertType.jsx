import React, { memo, useEffect } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import UploadFile from '../../components/UploadFile/UploadFile';
import { setFiles, clearFiles, setActivePage, reset, removerFile } from '../../redux/features/ConvertType/ConvertTypeSlice';
import Convert from '../../components/Convert/Convert';
import { setNotification } from '../../redux/features/Notification/NotificationSlice';

const ConvertType = memo(() => {
    const dispatch = useDispatch();

    useEffect(() => { dispatch(reset()) }, []);

    const isShowLoading = useSelector(state => state.loading.isShowLoading);
    const activePage = useSelector(state => state.convertType.activePage);
    const files = useSelector(state => state.convertType.files);

    return (
        <>
            <Breadcrumbs path={[{ page: 'Convert type', href: '/convert-type' }]} />
            {isShowLoading && <Loading />}
            {
                activePage == 'AddSubtitle' && <UploadFile
                    files={files}
                    setFiles={setFiles}
                    removerFile={removerFile}
                    clearFiles={clearFiles}
                    setNotification={setNotification}
                    activePage='convert'
                    setActivePage={setActivePage}
                    encode={false}
                />
            }
            {activePage == 'convert' && <Convert />}
        </>
    )
})

export default ConvertType;