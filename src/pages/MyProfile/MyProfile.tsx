import React, {FC, useEffect} from 'react';
import './myprofile.css'
import {useTypeDispatch, useTypeSelector} from "../../store/store";
import {selectorAllOptionsUser} from "../../store/user/selectorsUser";
import {likes, newsByUserId} from "../../store/news/selectorsNews";
import {toast} from "react-toastify";
import {findLikes, getNewsByUserIdAction} from "../../store/news/newsAction";
import MyPost from "./MyPost/MyPost";
import MyInfo from "./MyInfo/MyInfo";
import MyLikePost from "./MyLikePost/MyLikePost";
import MyFollow from "./MyFollow/MyFollow";
import {SmallLoad} from "../../ui/LoadingUI";

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
            <div>{userLoad === 'loading' ? <SmallLoad/> : <MyInfo user={user}/>}</div>
            <div>
                {myPostLoad === 'loading' ? <SmallLoad/>
                    :
                    <div>
                        {myPost && myPost.map((item, index) =>
                            <MyPost item={item} key={`${item._id}__${index + 123}`}/>)}
                    </div>
                }
            </div>
            <div>
                {likeStatus === 'loading' ? <SmallLoad/>
                    :
                    <div>
                        {myLikesPost && myLikesPost?.map((item, index) =>
                            <MyLikePost item={item} key={item._id + index}/>)}
                    </div>
                }
            </div>
            <div>
                {userLoad === 'loading' ? <SmallLoad/>
                    :
                    <div>
                        {user?.followers && user?.followers.map(item =>
                            <MyFollow item={item} follow={true}/>
                        )}
                    </div>
                }
            </div>
            <div>
                {userLoad === 'loading' ? <SmallLoad/>
                    :
                    <div>
                        {user?.following && user?.following.map(item =>
                            <MyFollow item={item} follow={false}/>
                        )}
                    </div>
                }
            </div>
        </div>
    );
}

export default MyProfile;