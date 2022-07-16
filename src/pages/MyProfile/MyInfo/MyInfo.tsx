import React, {FC} from 'react';
import {IUser} from "../../../store/user/types";
import {_url} from "../../../service/api";
interface Props{
    user:IUser | null
}
const MyInfo:FC<Props> = ({user}) => {
    return (
        <div>
            <span> My Profile</span>
            <div>{user?.firstName}</div>
            <div>{user?.lastName}</div>
            <div>{user?.email}</div>
            <div>{user?.phone}</div>
            <img className='imgControl' src={_url + user?.avatar} alt=""/>
        </div>
    );
};

export default MyInfo;