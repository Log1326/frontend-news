import React, {FC, useEffect} from 'react';
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './mainrouter.css'
import {Route, Routes, useNavigate} from 'react-router-dom'
import {useTypeDispatch, useTypeSelector} from "../store/store";
import {get_current_user} from "../store/user/userAction";
import {selectorAllOptionsUser, user} from "../store/user/selectorsUser";
import {logout, setUser} from "../store/user/userSlice";
import {Footer, Header, TagsRelatedNews} from "../component";
import {
    AddNews,
    AllNews,
    Layout,
    Login,
    MyNewsDesk,
    MyProfile,
    NewsOneById,
    Registration,
    TagsNews,
    UpdateNews,
    UpdateProfile
} from "../pages";
import jwt_decode from "jwt-decode";
import Chat from "../pages/Chat/Chat";


const MainRouter: FC = () => {
    const {error, status} = useTypeSelector(selectorAllOptionsUser)
    const userData = useTypeSelector(user)
    const dispatch = useTypeDispatch()
    const navigate = useNavigate()
    const getUser = localStorage.getItem('user')
    if (localStorage.getItem('token')) {
        const decodedToken = jwt_decode(JSON.parse(JSON.stringify(localStorage.getItem('token'))));
        if (decodedToken.exp * 1000 < new Date().getTime()) {
            dispatch(logout())
        }
    }
    useEffect(() => {
        getUser ? dispatch(setUser(getUser)) : dispatch(get_current_user())
    }, [])
    useEffect(() => {
        error && toast.error(error + ' //auth')
    }, [error])
    return (
        <div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false}
                            newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
            <div className='containerRouter'>
                <Header status={status} user={userData} dispatch={dispatch} navigate={navigate}/>
                <Routes>
                    <Route path={'/'} element={<Layout/>}>
                        <Route index element={<AllNews/>}/>
                        <Route path={'search'} element={<AllNews/>}/>
                        <Route path={'news/:id'} element={<NewsOneById/>}/>
                        <Route path={'news/tags/:tag'} element={<TagsNews/>}/>
                        <Route path={'news/related_tags'} element={<TagsRelatedNews/>}/>
                        {userData &&
                            <>
                                <Route path={'add_news'} element={<AddNews/>}/>
                                <Route path={'my_news/:userId'} element={<MyNewsDesk/>}/>
                                <Route path={'update/:id'} element={<UpdateNews/>}/>
                                <Route path={'user/:id/update'} element={<UpdateProfile/>}/>
                                <Route path={'profile'} element={<MyProfile/>}/>
                                <Route path={'chat'} element={<Chat/>}/>
                            </>
                        }
                    </Route>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/register'} element={<Registration/>}/>
                    <Route path={'*'} element={'ops...not found this page'}/>
                </Routes>
                <Footer/>
            </div>
        </div>
    );
}

export default MainRouter;