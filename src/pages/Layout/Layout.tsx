import React, {FC, memo, useEffect, useMemo} from 'react';
import './layout.css'
import {Outlet} from 'react-router-dom'
import {useTypeDispatch, useTypeSelector} from "../../store/store";
import {selectorAllUsers, selectorUser} from "../../store/user/selectorsUser";
import {selectorMyTags} from "../../store/news/selectorsNews";
import {getMyTags} from "../../store/news/newsAction";
import SideBar from "./Sidebar/SideBar";
import RightSide from "./RightSide/RightSide";


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
            <SideBar user={user}/>
            <Outlet/>
            <RightSide UsersFiltered={UsersFiltered} items={items}/>
        </div>
    );
})

export default Layout;