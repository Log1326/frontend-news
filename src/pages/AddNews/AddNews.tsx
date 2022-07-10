import React, {FC} from 'react';
import {SubmitHandler} from "react-hook-form";
import {IPublishNews} from "../../store/news/types";
import {useTypeDispatch} from "../../store/store";
import {createNewsAction} from "../../store/news/newsAction";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import './addnews.css'
import {AddFormNews} from "../../component";

const AddNews: FC = () => {
    const dispatch = useTypeDispatch()
    const navigate = useNavigate()
    const onSubmit: SubmitHandler<IPublishNews> = (newsData) => {
        dispatch(createNewsAction({newsData, navigate, toast}))
    }
    return (
        <div className='containerAddNews'>
            <AddFormNews onSubmit={onSubmit}/>
        </div>
    );
};

export default AddNews;