import React, {FC} from 'react';
import './layout.css'
import SideBar from "./Sidebar/SideBar";
import {Outlet} from 'react-router-dom'


const Layout: FC = () => {

    return (
        <div className='layoutContainer'>
            <SideBar/>
            <Outlet/>
        </div>
    );
};

export default Layout;