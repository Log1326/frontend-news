import React, {FC, useEffect} from 'react';
import './tagsrelatednews.css'
import {useTypeSelector} from "../../store/store";
import {tagsRelated} from "../../store/news/selectorsNews";
import {toast} from "react-toastify";
import {_url} from "../../service/api";

const TagsRelatedNews: FC = () => {
    const {items, status, error} = useTypeSelector(tagsRelated)
    useEffect(() => {
        error && toast.error(error)
    }, [error])

    return (
        <div>
            {status === 'loading' ?
                <div>loading</div>
                :
                <>
                    {items && items.map((item, index) =>
                        <div key={item._id + 421 + index}>
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

export default TagsRelatedNews;