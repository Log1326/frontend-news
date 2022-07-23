import React, {FC, useEffect, useState} from 'react';
import {IUser} from "../../../store/user/types";
import {_url, getUserById} from "../../../service/api";
import './followers.css'

interface Props {
    item: string
}

const Followers: FC<Props> = ({item}) => {
    const [followers, setFollowers] = useState<IUser>()
    useEffect(() => {
        const getUsers = async () => {
            const {data} = await getUserById(item)
            setFollowers(data)
        }
        item && getUsers()
    }, [item])
    return (
        <div className='containerFollowers'>
            <div>
                <div>{followers?.firstName}</div>
                <div>{followers?.lastName}</div>
            </div>
            <img className='imgFollowers' src={_url + followers?.avatar} alt=""/>
        </div>
    );
};

export default Followers;
