import React, {FC, memo, useCallback, useMemo} from 'react';
import './itemonenews.css'
import {INews} from "../../../store/news/types";
import {AppDispatch} from "../../../store/store";
import {_url} from "../../../service/api";
import {NavLink} from "react-router-dom";
import moment from "moment";
import {BiLike} from "react-icons/bi";
import {GrView} from "react-icons/gr";
import {likesNews} from "../../../store/news/newsAction";
import {IUser} from "../../../store/user/types";

interface Props {
    item: INews
    dispatch: AppDispatch
    user: IUser | null
}

const ItemOneNews: FC<Props> = memo(({item, user, dispatch}) => {
    const createAt = useMemo(() => moment(item.createdAt).format('LLL'), [item.createdAt])
    const send = useCallback(() => dispatch(likesNews(item._id)), [item._id])
    const myLikes = useMemo(() => item.likes.find(item => item === user?._id), [item.likes])
    return (
        <div className='containerNewsOne'>
            <div className='titleNewsOne'>
                <p>Title</p>
                <span>{item.title}</span>
            </div>
            <hr className='hrOneNews'/>
            <div className='containerDescription'>
                <h1>Description</h1>
                <div className='descriptionAndTextAndImgContainer'>
                    <p>{item.description}</p>
                    <img
                        className='imgStyle'
                        src={_url + item.imageUrl} alt={item.title}/>
                </div>
            </div>
            <div className='createdAtNewsOne'>
                <p>Created at: </p>
                <span>{createAt}</span>
            </div>
            <div className='containerTagsAndLikeCount'>
                <div>
                    <p>
                        {item.tags.map((tag, index) =>
                            <NavLink
                                className='linKStyleOneNews'
                                to={`news/tags/${tag}`}
                                key={index}>
                                {`#${tag}`}
                            </NavLink>
                        )}
                    </p>
                </div>
                <div className='likesAndViewsOneNews'>
                    <div onClick={send}
                         className='styleLikeByOneNews'>
                        {item.likes.length && !!myLikes ?
                            <div className='likeHaveByOneNews'>
                                <span>{item.likes.length}</span>
                                <BiLike/>
                            </div>
                            :
                            <div className='unLikeHaveByOneNews'>
                                <span>{item.likes.length}</span>
                                <BiLike/>
                            </div>
                        }
                    </div>
                    <p>
                        <span>{item.viewsCount}</span>
                        <GrView/>
                    </p>
                </div>
            </div>
        </div>
    );
})

export default ItemOneNews;