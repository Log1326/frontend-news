import React, {FC, lazy, memo, Suspense} from 'react';
import './layout.css'
import {Outlet} from 'react-router-dom'
import {useTypeSelector} from "../../store/store";
import {selectorAllUsers, selectorUser} from "../../store/user/selectorsUser";
import {selectorAllNews} from "../../store/news/selectorsNews";
import {SmallLoad} from "../../ui/LoadingUI";

const SideBar = lazy(() => import("./Sidebar/SideBar"))
const RightSide = lazy(() => import("./RightSide/RightSide"))


const Layout: FC = memo(() => {
    const users = useTypeSelector(selectorAllUsers)
    const {user} = useTypeSelector(selectorUser)
    const {items} = useTypeSelector(selectorAllNews)
    const UsersFiltered = users.filter(item => item._id !== user?._id).slice(0, 5)
    const UserFindItems = items.filter(item => item.creator === user?._id).map(item => item.tags).flat().slice(0, 5)
    return (
        <div className='layoutContainer'>
            <Suspense fallback={<SmallLoad/>}>
                <SideBar/>
            </Suspense>

            <Outlet/>
            <Suspense fallback={<SmallLoad/>}>
                <RightSide UsersFiltered={UsersFiltered} UserFindItems={UserFindItems}/>
            </Suspense>
        </div>
    );
})

export default Layout;