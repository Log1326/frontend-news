import React, {FC} from 'react';
import {_url} from "../../../service/api";
import {INews} from "../../../store/news/types";

interface Props {
    item: INews
}

const MyLikePost: FC<Props> = ({item}) => {
    return (
        <div>
            <span>My Like post</span>
            <span>{item.title}</span>
            <span>{item.description}</span>
            <span>{item.creator}</span>
            <span>{item.tags}</span>
            <img className='imgControl' src={_url + item.imageUrl} alt={item.imageUrl}/>
        </div>
    );
};

export default MyLikePost;