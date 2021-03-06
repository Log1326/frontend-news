import React, {FC, useLayoutEffect} from 'react';
import './updatenews.css'
import {useTypeDispatch, useTypeSelector} from "../../store/store";
import {useNavigate, useParams} from "react-router-dom";
import {SubmitHandler} from "react-hook-form";
import {IPublishNews, IUpdatePublish} from "../../store/news/types";
import {updateNewsAction} from "../../store/news/newsAction";
import {toast} from "react-toastify";
import {FormUpdate} from "../../component";
import {newsByUserId} from "../../store/news/selectorsNews";

const UpdateNews: FC = () => {
    const {data: {items, error}} = useTypeSelector(newsByUserId)
    const {id} = useParams()
    const dispatch = useTypeDispatch()
    const navigate = useNavigate()
    useLayoutEffect(() => {
        error && toast.error(error)
    }, [error])
    const onSubmitClick: SubmitHandler<IPublishNews> = (newsData) => {
        dispatch(updateNewsAction({newsData, id, navigate, toast} as IUpdatePublish))
    }
    return (
        <div className='containerUpdateNews'>
            <FormUpdate onSubmit={onSubmitClick} id={id} items={items} navigate={navigate}/>
        </div>
    );
};

export default UpdateNews;