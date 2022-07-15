import React, {FC, useEffect} from 'react';
import './tagsnews.css'
import {useTypeDispatch, useTypeSelector} from "../../store/store";
import {selectorTags} from "../../store/news/selectorsNews";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import {getTagNewsAction} from "../../store/news/newsAction";
import {_url} from "../../service/api";

const TagsNews: FC = () => {
    const {items, status, error} = useTypeSelector(selectorTags)
    const {tag} = useParams()
    const dispatch = useTypeDispatch()
    useEffect(() => {
        error && toast.error(error)
    }, [error])
    useEffect(() => {
        tag && dispatch(getTagNewsAction(tag))
    }, [tag])
    return (
        <div>
            {status === 'loading' ?
                <div>loading</div>
                :
                <>
                    {items && items.map((item, index) =>
                        <div key={item._id + index + 1 + item.tags}>
                            <span>{item.title}</span>
                            <span>{item.description}</span>
                            <img src={_url + item.imageUrl} alt=""/>
                            <span>{item.tags}</span>
                            <span>{item.likes}</span>
                            <span>{item.createdAt}</span>

                        </div>
                    )}
                </>
            }

        </div>
    );
};

export default TagsNews;