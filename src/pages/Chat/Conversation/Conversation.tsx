import React, {FC, useEffect, useState} from 'react';
import './conversation.css'
import {_url, getUserById} from "../../../service/api";
import {IOtherData} from "../../../store/chat/types";
import {IUser} from "../../../store/user/types";

interface Props {
    data: IOtherData
    currentUser?: string
    online: boolean
}

const Conversation: FC<Props> = ({currentUser, data, online}) => {
    const [userFind, setUserFind] = useState<IUser | null>(null)
    useEffect(() => {
        const id = data?.members.find(id => id !== currentUser)
        const getUserData = async () => {
            if (id) {
                const {data} = await getUserById(id)
                setUserFind(data)
            }
        }
        id && getUserData()
    }, [data])
    return (
        <>
            <div className='containerConversation'>
                <div className='imgAndIconOnline'>
                    <img className='imgConversation' src={_url + userFind?.avatar} alt={String(userFind?.avatar)}/>
                    <div className={online ? 'imgConversationOnline' : 'imgConversationOffline'}/>
                </div>
                <div className='nameConversation'>
                    <div className='firstAndLastNameConversation'>
                        <div>{userFind?.firstName}</div>
                        <div>{userFind?.lastName}</div>
                    </div>
                    <div className='onlineConversation'>
                        {online ? 'online' : 'offline'}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Conversation;