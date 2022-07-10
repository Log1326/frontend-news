import React, {FC, useEffect} from 'react';
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './mainrouter.css'
import {Route, Routes} from 'react-router-dom'
import {useTypeDispatch, useTypeSelector} from "../store/store";
import {get_current_user} from "../store/user/userAction";
import {Login, Registration} from "../pages/Auth";
import {AddNews, AllNews, MyNewsDesk, NewsOneById, UpdateNews} from "../pages";
import {Footer, Header, Layout} from "../component";
import {selectorUser} from "../store/user/selectorsUser";

const MainRouter: FC = () => {
    const {user, error} = useTypeSelector(selectorUser)
    const dispatch = useTypeDispatch()
    useEffect(() => {
        dispatch(get_current_user())
    }, [])
    useEffect(() => {
        error && toast.error(error + ' //auth')
    }, [error])
    return (
        <div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false}
                            newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
            <div className='containerRouter'>
                <Header/>
                <Routes>
                    <Route path={'/'} element={<Layout/>}>
                        <Route index element={<AllNews/>}/>
                        <Route path={'/search'} element={<AllNews/>}/>
                        <Route path={'/news/:id'} element={<NewsOneById/>}/>
                        {user && <>
                            <Route path={'add_news'} element={<AddNews/>}/>
                            <Route path={'my_news/:userId'} element={<MyNewsDesk/>}/>
                            <Route path={'update/:id'} element={<UpdateNews/>}/>
                        </>}
                    </Route>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/register'} element={<Registration/>}/>
                    <Route path={'*'} element={'ops...not found this page'}/>
                </Routes>
                <Footer/>
            </div>
        </div>
    );
};

export default MainRouter;