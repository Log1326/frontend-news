import React, {FC, useEffect, useState} from 'react';
import {IUser} from "../../../store/user/types";
import {_url, getUserById} from "../../../service/api";
import './following.css'
interface Props {
    item: string
}

const Following: FC<Props> = ({item}) => {
    const [following, setFollowing] = useState<IUser>()
    useEffect(() => {
        const getUsers = async () => {
            const {data} = await getUserById(item)
            setFollowing(data)
        }
        item && getUsers()
    }, [item])
    return (
        <div className='containerFollowing'>
            <div>
                <div>{following?.firstName}</div>
                <div>{following?.lastName}</div>
            </div>
            <img className='imgFollowing' src={_url + following?.avatar} alt=""/>
        </div>
    );
};

export default Following;