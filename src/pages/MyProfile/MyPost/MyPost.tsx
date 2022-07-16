import React, {FC, memo} from 'react';
import {_url} from "../../../service/api";
import {INews} from "../../../store/news/types";

interface Props {
    item: INews
}

const MyPost: FC<Props> = memo(({item}) => {
    return (
        <div>
            <span>My Post</span>
            <div>{item.title}</div>
            <div>{item.description}</div>
            <div>{item.likes.length}</div>
            <div>{item.viewsCount}</div>
            <img className='imgControl' src={_url + item.imageUrl} alt=""/>
        </div>
    );
})

export default MyPost;