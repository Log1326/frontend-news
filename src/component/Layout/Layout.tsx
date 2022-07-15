import React, {FC, lazy, memo, Suspense, useMemo} from 'react';
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
    const UsersFiltered = useMemo(() => users.filter(item => item._id !== user?._id).slice(0, 5), [users])
    const UserFindItems = useMemo(() =>
            items.filter(item => item.creator === user?._id).map(item => item.tags).flat().slice(0, 5), [items])
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