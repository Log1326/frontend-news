import React, {FC, useEffect} from 'react';
import './myprofile.css'
import {useTypeDispatch, useTypeSelector} from "../../store/store";
import {selectorUser} from "../../store/user/selectorsUser";
import {selectorLikes, selectorUserNewsById} from "../../store/news/selectorsNews";
import {_url} from "../../service/api";
import {toast} from "react-toastify";
import {findLikes, getNewsByUserIdAction} from "../../store/news/newsAction";

const MyProfile: FC = () => {
    const {user, status: userLoad, error} = useTypeSelector(selectorUser)
    const {data: {items: myPost, status: myPostLoad, error: errorMyPost}} = useTypeSelector(selectorUserNewsById)
    const {items: myLikesPost, status: likeStatus, error: likeError} = useTypeSelector(selectorLikes)
    const dispatch = useTypeDispatch()
    useEffect(() => {
        error && toast.error(error)
        errorMyPost && toast.error(errorMyPost)
        likeError && toast.error(likeError)
    }, [error, errorMyPost, likeError])
    useEffect(() => {
        user?._id && dispatch(getNewsByUserIdAction({userId: user?._id}))
        user?._id && dispatch(findLikes({userId: user?._id}))
    }, [user?._id])
    return (
        <div className='container'>
            My Profile
            <div>
                {userLoad === 'loading' ? <div>user loading</div>
                    :
                    <>
                        <div>{user?.firstName}</div>
                        <div>{user?.lastName}</div>
                        <div>{user?.email}</div>
                        <div>{user?.phone}</div>
                        <img className='imgControl' src={_url + user?.avatar} alt=""/>
                    </>
                }
            </div>
            <div>
                My Post
                {myPostLoad === 'loading' ? <div>loading</div>
                    :
                    <>
                        {myPost && myPost.map(item =>
                            <div key={item._id + item.creator + `index__`}>
                                <div>{item.title}</div>
                                <div>{item.description}</div>
                                <div>{item.likes.length}</div>
                                <div>{item.viewsCount}</div>
                                <img className='imgControl' src={_url + item.imageUrl} alt=""/>
                            </div>
                        )}
                    </>
                }

            </div>
            <div>
                My Like post
                {likeStatus === 'loading' ? <div>'loading likes post</div>
                    :
                    <>
                        {myLikesPost?.map((item, index) =>
                            <div key={item._id + index}>
                                <span>{item.title}</span>
                                <span>{item.description}</span>
                                <span>{item.creator}</span>
                                <span>{item.tags}</span>
                                <img className='imgControl' src={_url + item.imageUrl} alt={item.imageUrl}/>
                            </div>
                        )}
                    </>
                }
            </div>
        </div>
    );
};

export default MyProfile;