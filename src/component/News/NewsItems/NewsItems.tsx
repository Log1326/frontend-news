import React, {FC, useMemo} from 'react';
import {INews} from "../../../store/news/types";
import './newsitems.css'
import {BiLike} from 'react-icons/bi'
import {GrView} from 'react-icons/gr'
import {Link, NavLink} from "react-router-dom";
import {_url} from "../../../service/api";
import {AppDispatch} from "../../../store/store";
import {likesNews} from "../../../store/news/newsAction";
import {excerpt, foundUser} from "../../../utils";
import {IUsers} from "../../../store/user/types";

interface Props {
    item: INews
    dispatch: AppDispatch
    users: IUsers[]
}

const NewsItems: FC<Props> = ({item, users, dispatch}) => {
    const user = foundUser(users, item.creator)
    useMemo(() => user, [user])
    return (
        <>
            <div className='containerNewsItem'>
                <div className='itemNewsBorder'>
                    <div className='itemHeader'>
                        {user &&
                            <div className='containerAuthorNews'>
                                <div><img className='userImg' src={_url + user.avatar} alt=""/></div>
                                <div className='authorName'>
                                    <span>{user.firstName}</span>
                                </div>
                            </div>
                        }
                        <div className='itemTitleAndDesc'>
                            <p>
                                <Link className='linkStyle' to={`/news/${item._id}`}>
                                    {item.title.length > 10 ?
                                        <span>{excerpt(item.title, 10)}</span>
                                        :
                                        <span>{item.title}</span>
                                    }
                                </Link>
                            </p>
                            <span>{excerpt(item.description, 25)}</span>
                        </div>
                    </div>

                    <div className='itemImage'>
                        <img
                            src={item.imageUrl ? _url + item.imageUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHCXDgjLwDANCC-00sMVgM0YVLVJ-oWNv-kg&usqp=CAU'}
                            alt='img'/>
                    </div>


                    <div className='itemLikesAndCountViews'>
                        <div className='tagsNewsItems'>
                            {item.tags.map((tag, index) =>
                                <NavLink className='ItemNavLink'
                                         to={`/${tag}`} key={index}>{`#${tag}`}</NavLink>
                            )}
                        </div>
                        <div className='likesAndView'>
                            <div
                                onClick={() => dispatch(likesNews(item._id))}
                                className='styleLike'>
                                {item.likes.length > 0 ?
                                    <>
                                        <div className='likeHave'>
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
                            </div>
                            <div>
                                <span>{item.viewsCount}</span>
                                <GrView/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>

    );
};

export default NewsItems;