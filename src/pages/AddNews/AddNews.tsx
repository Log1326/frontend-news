import React, {FC, Suspense, lazy} from 'react';
import {SubmitHandler} from "react-hook-form";
import {IPublishNews} from "../../store/news/types";
import {useTypeDispatch} from "../../store/store";
import {createNewsAction} from "../../store/news/newsAction";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import './addnews.css'
import {BigLoad} from "../../ui/LoadingUI";

const AddFormNews = lazy(() => import('../../component/AddFormNews/AddFormNews'))
const AddNews: FC = () => {
    const dispatch = useTypeDispatch()
    const navigate = useNavigate()
    const onSubmit: SubmitHandler<IPublishNews> = (newsData) => {
        dispatch(createNewsAction({newsData, navigate, toast}))
    }
    return (
        <div className='containerAddNews'>
            <Suspense fallback={<BigLoad/>}>
                <AddFormNews onSubmit={onSubmit}/>
            </Suspense>
        </div>
    );
}

export default AddNews;