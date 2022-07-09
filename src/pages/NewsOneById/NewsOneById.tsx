import React, {FC, useEffect} from 'react';
import './newsonebyid.css'
import {useTypeDispatch, useTypeSelector} from "../../store/store";
import {selectorOneNewsById} from "../../store/news/newsSlice";
import {useParams} from "react-router-dom";
import {getOneNewsAction} from "../../store/news/newsAction";
import ItemOneNews from "../../component/News/ItemOneNews/ItemOneNews";
import {SearchLoad} from "../../ui/LoadingUI";
import {toast} from "react-toastify";

const NewsOneById: FC = () => {
    const {items, status, error} = useTypeSelector(selectorOneNewsById)
    const {id} = useParams()
    const dispatch = useTypeDispatch()
    useEffect(() => {
        id && dispatch(getOneNewsAction(id))
    }, [])
    useEffect(() => {
        error && toast.error(error)
    }, [error])
    return (
        <div className='containerNewsOneId'>
            {status === 'loading' ?
                <SearchLoad/>
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