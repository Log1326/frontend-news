import React, {FC, useEffect, useLayoutEffect} from 'react';
import './newsonebyid.css'
import {useTypeDispatch, useTypeSelector} from "../../store/store";
import {useParams} from "react-router-dom";
import {getOneNewsAction} from "../../store/news/newsAction";
import {SearchLoad} from "../../ui/LoadingUI";
import {toast} from "react-toastify";
import {selectorOneNewsById} from "../../store/news/selectorsNews";
import {ItemOneNews} from "../../component";

const NewsOneById: FC = () => {
    const {items, status, error} = useTypeSelector(selectorOneNewsById)
    const {id} = useParams()
    const dispatch = useTypeDispatch()
    useEffect(() => {
        id && dispatch(getOneNewsAction(id))
    }, [id])
    useLayoutEffect(() => {
        error && toast.error(error)
    }, [error])
    return (
        <div className='containerNewsOneId'>
            {status === 'loading' ?
                <div className='searchLoad'>
                    <SearchLoad/>
                </div>
                :
                <div>
                    {items && items.map(item =>
                        <ItemOneNews item={item} key={item._id + item.createdAt} dispatch={dispatch}/>)}
                </div>
            }

        </div>
    );
};

export default NewsOneById;