import React, {FC} from 'react';
import './layout.css'
import SideBar from "./Sidebar/SideBar";
import {Outlet} from 'react-router-dom'
import RightSide from "./RightSide/RightSide";


const Layout: FC = () => {
    return (
        <div className='layoutContainer'>
            <SideBar/>
            <Outlet/>
            <RightSide/>
        </div>
    );
};

export default Layout;