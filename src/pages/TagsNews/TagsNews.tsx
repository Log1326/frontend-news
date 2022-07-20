import React, {FC, useEffect} from 'react';
import './tagsnews.css'
import {useTypeDispatch, useTypeSelector} from "../../store/store";
import {tags} from "../../store/news/selectorsNews";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import {getTagNewsAction} from "../../store/news/newsAction";
import {TagsItem} from "../../component";
import {SearchLoad} from "../../ui/LoadingUI";
import {user} from "../../store/user/selectorsUser";

const TagsNews: FC = () => {
    const userData = useTypeSelector(user)
    const {items, status, error} = useTypeSelector(tags)
    const {tag} = useParams()
    const dispatch = useTypeDispatch()
    useEffect(() => {
        error && toast.error(error)
    }, [error])
    useEffect(() => {
        tag && dispatch(getTagNewsAction(tag))
    }, [tag])
    return (
        <div className='containerNewsTags'>
            {status === 'loading' ?
                <SearchLoad/>
                :
                <div className='text'>
                    {items && items.map((item, index) =>
                        <TagsItem item={item} user={userData} dispatch={dispatch} key={`${item._id}__${index + 120}`}/>
                    )}
                </div>
            }

        </div>
    );
};

export default TagsNews;