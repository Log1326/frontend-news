import React, {FC} from 'react';
import './itemonenews.css'
import {INews} from "../../../../store/news/types";
import {AppDispatch} from "../../../../store/store";
import {_url} from "../../../../service/api";
import {NavLink} from "react-router-dom";
import moment from "moment";
import {BiLike} from "react-icons/bi";
import {GrView} from "react-icons/gr";
import {likesNews} from "../../../../store/news/newsAction";

interface Props {
    item: INews
    dispatch: AppDispatch
}

const ItemOneNews: FC<Props> = ({item, dispatch}) => {
    const createAt = moment(item.createdAt).format('LLL')

    return (
        <div className='containerNewsOne'>
            <div className='titleNewsOne'>
                <p>Title:</p>
                <span>{item.title}</span>
            </div>
            <hr className='hrOneNews'/>
            <div className='descriptionNewsOne'>
                <p>Description</p>
                <span>{item.description}</span>
            </div>
            <div className='imgNewsOne'>
                <img
                    className='styleImg'
                    src={_url + item.imageUrl} alt={item.title}/>
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
                                to={`/${tag}`}
                                key={index}>
                                {`#${tag}`}
                            </NavLink>
                        )}
                    </p>
                </div>
                <div className='likesAndViewsOneNews'>
                    <p onClick={() => dispatch(likesNews(item._id))}
                       className='styleLikeByOneNews'>
                        {item.likes.length > 0 ?
                            <>
                                <div className='likeHaveByOneNews'>
                                    <span>{item.likes.length}</span>
                                    <BiLike/>
                                </div>
                            </>
                            :
                            <>
                                <span>{item.likes.length}</span>
                                <BiLike/>
                            </>
                        }
                    </p>
                    <p>
                        <span>{item.viewsCount}</span>
                        <GrView/>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ItemOneNews;