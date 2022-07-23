import React, {FC, lazy, memo, Suspense, useEffect, useMemo} from 'react';
import './layout.css'
import {Outlet} from 'react-router-dom'
import {useTypeDispatch, useTypeSelector} from "../../store/store";
import {user, users} from "../../store/user/selectorsUser";
import {myTags} from "../../store/news/selectorsNews";
import {getMyTags} from "../../store/news/newsAction";
import {SmallLoad} from "../../ui/LoadingUI";

const SideBar = lazy(() => import('./Sidebar/SideBar'))
const RightSide = lazy(() => import('./RightSide/RightSide'))

const Layout: FC = memo(() => {
    const userData = useTypeSelector(user)
    const usersData = useTypeSelector(users)
    const {items} = useTypeSelector(myTags)
    const dispatch = useTypeDispatch()

    const UsersFiltered = useMemo(() => usersData.filter(item => item._id !== userData?._id).slice(0, 5), [usersData])
    useEffect(() => {
        userData?._id && dispatch(getMyTags(userData?._id))
    }, [userData?._id])

    return (
        <div className='layoutContainer'>
            <Suspense fallback={<SmallLoad/>}>
                <SideBar user={userData}/>
            </Suspense>

            <Outlet/>

            <Suspense fallback={<SmallLoad/>}>
                <RightSide UsersFiltered={UsersFiltered} items={items}/>
            </Suspense>
        </div>
    );
})

export default Layout;