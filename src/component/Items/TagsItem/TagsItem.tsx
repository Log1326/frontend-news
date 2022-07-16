import React, {FC, useMemo} from 'react';
import './tagsitem.css'
import {_url} from "../../../service/api";
import {INews} from "../../../store/news/types";
import {BiLike} from "react-icons/bi";
import {IUser} from "../../../store/user/types";
import {GrView} from "react-icons/gr";
import {ChangeMoment, excerpt} from "../../../utils";
import {Link} from "react-router-dom";
import {AppDispatch} from "../../../store/store";
import {likesNews} from "../../../store/news/newsAction";

interface Props {
    item: INews
    user: IUser | null
    dispatch: AppDispatch
}

const TagsItem: FC<Props> = ({item, user, dispatch}) => {
    const myLikes = useMemo(() => item.likes.find(item => item === user?._id), [item.likes])
    return (
        <div className='containerTagsNewsItem'>
            <div className='itemNewsTags'>
                <div>
                    <span>Title:</span>
                    <Link to={`/news/${item._id}`} className='titleTags'>{item.title}</Link>
                </div>
                <div>
                    <span>description:</span>
                    <span>{item.description.length > 40 ? excerpt(item.description, 40) : item.description}</span>
                </div>

                <div>
                    <span>tags:</span>
                    <span>{item.tags.toString()}</span>
                </div>

                <div>
                    <span>created at: {ChangeMoment(item.createdAt)}</span>
                </div>

                <div className='likesAndViewCountContainer'>
                    <div onClick={() => dispatch(likesNews(user?._id ? user?._id : ''))}>
                        {item.likes.length && !!myLikes ?
                            <p className='likeHaveTags'>
                                <span>{item.likes.length}</span>
                                <BiLike/>
                            </p>
                            :
                            <p>
                                <span>{item.likes.length}</span>
                                <BiLike/>
                            </p>
                        }
                    </div>
                    <div>
                        <p>
                            <span>{item.viewsCount}</span>
                            <GrView/>
                        </p>
                    </div>
                </div>

            </div>
            <div>
                <img className='imgControlTagsItems' src={_url + item.imageUrl} alt=""/>
            </div>
        </div>
    );
};

export default TagsItem;