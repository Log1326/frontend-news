import React, {FC, lazy, memo, Suspense, useEffect, useMemo} from 'react';
import './layout.css'
import {Outlet} from 'react-router-dom'
import {useTypeDispatch, useTypeSelector} from "../../store/store";
import {selectorAllUsers, selectorUser} from "../../store/user/selectorsUser";
import {selectorAllNews, selectorMyTags} from "../../store/news/selectorsNews";
import {SmallLoad} from "../../ui/LoadingUI";
import {getMyTags} from "../../store/news/newsAction";

const SideBar = lazy(() => import("./Sidebar/SideBar"))
const RightSide = lazy(() => import("./RightSide/RightSide"))


const Layout: FC = memo(() => {
    const users = useTypeSelector(selectorAllUsers)
    const {user} = useTypeSelector(selectorUser)
    const {items} = useTypeSelector(selectorMyTags)
    const dispatch = useTypeDispatch()
    const UsersFiltered = useMemo(() => users.filter(item => item._id !== user?._id).slice(0, 5), [users])
    useEffect(() => {
        user?._id && dispatch(getMyTags(user?._id))
    }, [user?._id])
    return (
        <div className='layoutContainer'>
            <Suspense fallback={<SmallLoad/>}>
                <SideBar/>
            </Suspense>

            <Outlet/>

            <Suspense fallback={<SmallLoad/>}>
                <RightSide UsersFiltered={UsersFiltered} items={items}/>
            </Suspense>
        </div>
    );
})

export default Layout;