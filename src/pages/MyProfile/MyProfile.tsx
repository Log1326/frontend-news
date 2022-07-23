import React, {FC, useEffect} from 'react';
import './myprofile.css'
import {useTypeDispatch, useTypeSelector} from "../../store/store";
import {selectorAllOptionsUser} from "../../store/user/selectorsUser";
import {likes, newsByUserId} from "../../store/news/selectorsNews";
import {toast} from "react-toastify";
import {findLikes, getNewsByUserIdAction} from "../../store/news/newsAction";
import MyPost from "./MyPost/MyPost";
import MyInfo from "./MyInfo/MyInfo";
import {SmallLoad} from "../../ui/LoadingUI";
import Followers from "./Followers/Followers";
import Following from "./Following/Following";

const MyProfile: FC = () => {
    const {user, status: userLoad, error} = useTypeSelector(selectorAllOptionsUser)
    const {data: {items: myPost, status: myPostLoad, error: errorMyPost}} = useTypeSelector(newsByUserId)
    const {items: myLikesPost, status: likeStatus, error: likeError} = useTypeSelector(likes)
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
            <div>{userLoad === 'loading' ?
                <SmallLoad/>
                :
                <div>
                    <MyInfo user={user}/>
                </div>
            }
            </div>
            <div>
                {myPostLoad === 'loading' ? <SmallLoad/>
                    :
                    <div>
                        <span className='activityProfileTitle'>My Post</span>
                        {myPost && myPost.map((item, index) =>
                            <MyPost item={item} key={`${item._id}__${index + 123}`}/>)}
                    </div>
                }
            </div>
            <div>
                {likeStatus === 'loading' ? <SmallLoad/>
                    :
                    <div>
                        <span className='activityProfileTitle'>My Like Posts</span>
                        {myLikesPost && myLikesPost?.map((item, index) =>
                            <MyPost item={item} key={item._id + index}/>)}
                    </div>
                }
            </div>
            <div>
                {userLoad === 'loading' ? <SmallLoad/>
                    :
                    <div>
                        <div>
                            <span>My Followers</span>
                            <div>
                                {user?.followers && user?.followers.map(item =>
                                    <Followers item={item}/>
                                )}
                            </div>
                        </div>
                        <div>
                            <span>My Following</span>
                            <div>
                                {user?.following && user?.following.map(item =>
                                    <Following item={item}/>
                                )}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default MyProfile;