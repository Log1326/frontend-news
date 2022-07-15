import React, {FC, useEffect} from 'react';
import './myprofile.css'
import {useTypeSelector} from "../../store/store";
import {selectorUser} from "../../store/user/selectorsUser";
import {selectorAllNews, selectorUserNewsById} from "../../store/news/selectorsNews";
import {_url} from "../../service/api";
import {toast} from "react-toastify";

const MyProfile: FC = () => {
    const {user, status: userLoad, error} = useTypeSelector(selectorUser)
    const {data: {items: myPost, status: myPostLoad, error: errorMyPost}} = useTypeSelector(selectorUserNewsById)
    const {items: allPost, status: allLoadPosts, error: errorAllPosts} = useTypeSelector(selectorAllNews)
    useEffect(() => {
        error && toast.error(error)
        errorMyPost && toast.error(errorMyPost)
        errorAllPosts && toast.error(errorAllPosts)
    }, [error, errorMyPost, errorAllPosts])

    const myLikesPost = allPost.filter(item => item.likes.toString() === user?._id)
    return (
        <div>
            My Profile
            <div>
                {userLoad === 'loading' ? <div>user loading</div>
                    :
                    <>
                        <div>{user?.firstName}</div>
                        <div>{user?.lastName}</div>
                        <div>{user?.email}</div>
                        <div>{user?.phone}</div>
                        <img src={_url + user?.avatar} alt=""/>
                    </>
                }
            </div>
            <div>
                My Post
                {myPostLoad === 'loading' ? <div>loading</div>
                    :
                    <>
                        {myPost.map(item =>
                            <div key={item._id + item.creator + `index__`}>
                                <div>{item.title}</div>
                                <div>{item.description}</div>
                                <div>{item.likes.length}</div>
                                <div>{item.viewsCount}</div>
                            </div>
                        )}
                    </>
                }

            </div>
            <div>
                My Like post
                {allLoadPosts === 'loading' ? <div>'loading likes post</div>
                    :
                    <>
                        {myLikesPost?.map((item, index) =>
                            <div key={item._id + index}>
                                <span>{item.title}</span>
                                <span>{item.description}</span>
                                <span>{item.creator}</span>
                                <span>{item.tags}</span>
                                <img src={_url + item.imageUrl} alt={item.imageUrl}/>
                            </div>
                        )}
                    </>
                }
            </div>
        </div>
    );
};

export default MyProfile;