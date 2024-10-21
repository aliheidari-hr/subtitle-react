import React, { memo, useEffect } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import UploadFile from '../../components/UploadFile/UploadFile';
import TransitionSetting from '../../components/TransitionSetting/TransitionSetting';
import Translate from '../../components/Translate/Translate';
import { setFiles, clearFiles, reset, setActivePage, removerFile } from '../../redux/features/Translate/TranslateSlice';
import { setNotification } from '../../redux/features/Notification/NotificationSlice';

const Translation = memo(() => {
    const dispatch = useDispatch();
    useEffect(() => { dispatch(reset()) }, []);
    const isShowLoading = useSelector(state => state.loading.isShowLoading);
    const activePage = useSelector(state => state.translate.activePage);
    const files = useSelector(state => state.translate.files);

    return (
        <>
            <Breadcrumbs path={[{ page: 'Translation', href: '/translation' }]} />
            {isShowLoading && <Loading />}
            {
                activePage == 'AddSubtitle' && <UploadFile
                    files={files}
                    removerFile={removerFile}
                    clearFiles={clearFiles}
                    setFiles={setFiles}
                    setNotification={setNotification}
                    activePage='transitionSetting'
                    setActivePage={setActivePage}
                    encode={true}
                />
            }
            {activePage == 'transitionSetting' && <TransitionSetting />}
            {activePage == 'translate' && <Translate />}
        </>
    )
})

export default Translation;