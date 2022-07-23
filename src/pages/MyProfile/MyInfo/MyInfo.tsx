import React, {FC} from 'react';
import {IUser} from "../../../store/user/types";
import {_url} from "../../../service/api";
import './myinfo.css'

interface Props {
    user: IUser | null
}

const MyInfo: FC<Props> = ({user}) => {
    return (
        <div className='containerMyInfo'>
            <span> My Profile</span>
            <div className='itemMyInfo'>
                <div>
                    <div>{user?.firstName}</div>
                    <div>{user?.lastName}</div>
                    <div>{user?.email}</div>
                    <div>{user?.phone}</div>
                </div>
                <img className='imgControl' src={_url + user?.avatar} alt=""/>
            </div>
        </div>
    );
};

export default MyInfo;