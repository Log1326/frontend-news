import React, {FC, useEffect} from 'react';
import './updatenews.css'
import {useTypeDispatch, useTypeSelector} from "../../../store/store";
import {selectorUserNewsById} from "../../../store/news/newsSlice";
import {useNavigate, useParams} from "react-router-dom";
import {SubmitHandler} from "react-hook-form";
import {IPublishNews} from "../../../store/news/types";
import {FormUpdate} from "../../../ui";
import {updateNewsAction} from "../../../store/news/newsAction";
import {toast} from "react-toastify";

const UpdateNews: FC = () => {
    const {data: {items, error}} = useTypeSelector(selectorUserNewsById)
    useEffect(() => {
        error && toast.error(error)
    }, [error])
    const {id} = useParams()
    const dispatch = useTypeDispatch()
    const navigate = useNavigate()
    const onSubmitClick: SubmitHandler<IPublishNews> = (newsData) => {
        dispatch(updateNewsAction({newsData, id, navigate, toast}))
    }
    return (
        <div className='containerUpdateNews'>
            <FormUpdate onSubmit={onSubmitClick} id={id} items={items}/>
        </div>
    );
};

export default UpdateNews;