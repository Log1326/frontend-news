import React, {FC, useEffect, useRef, useState} from 'react';
import './chat.css'
import {useTypeDispatch, useTypeSelector} from "../../store/store";
import Conversation from "./Conversation/Conversation";
import {user} from "../../store/user/selectorsUser";
import ChatBox from "./ChatBox/ChatBox";
import {io, Socket} from "socket.io-client";
import {IOtherData} from "../../store/chat/types";
import {IUsers} from '../../store/user/types'
import {user_chat} from "../../service/api";
interface IOnline{
    socketId: string
    userId: string
}
const Chat: FC = () => {
    const userData = useTypeSelector(user)
    const [chats, setChats] = useState<IOtherData[]>([]);
    const [currentChat, setCurrentChat] = useState<IOtherData | null>(null);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState<IUsers[]>([]);

    const socket = useRef<Socket>();
    const dispatch = useTypeDispatch()
    useEffect(() => {
        const getChats = async () => {
            try {
                if (userData?._id) {
                    const {data} = await user_chat(userData?._id);
                    setChats(data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        chats && getChats();
    }, [userData])

    useEffect(() => {
        socket.current = io("http://localhost:4500");
        socket.current.emit("new-user-add", userData?._id);
        socket.current.on("get-users", (users: any) => {
            console.log(users)
            setOnlineUsers(users);
        });
    }, [userData]);

// Отправить сообщение на сервер сокетов
    useEffect(() => {
        sendMessage && socket?.current?.emit("send-message", sendMessage);
    }, [sendMessage]);

// Получаем сообщение от сокет-сервера
    useEffect(() => {
        socket?.current?.on("recieve-message", (data) => {
            console.log(data)
            setReceivedMessage(data)
        })
    }, [sendMessage]);

    const checkOnlineStatus = (item: any) => {
        const chatMember = item.members.find((member:any) => member !== userData?._id);
        const online = onlineUsers.find((user: any) => user.userId === chatMember);
        return !!online;
    };

    return (
        <div className='containerChat'>
            {/*Chats People*/}
            <div className='chatConversation'>
                {chats && chats.map((item, index) =>
                    <div onClick={() => setCurrentChat(item)} className='itemConversation'
                         key={item._id + index + 342}>
                        <Conversation data={item} online={checkOnlineStatus(item)} currentUser={userData?._id}/>
                        <hr/>
                    </div>
                )}
            </div>
            {/*Chats People*/}

            {/*block message*/}
            <div className='containerMessageAndTextButton'>
                <div className='containerMessage'>
                    <ChatBox
                        setSendMessage={setSendMessage}
                        dispatch={dispatch}
                        receivedMessage={receivedMessage}
                        chat={currentChat}
                        currentUser={userData?._id}/>
                </div>
                {/*block message*/}

            </div>
        </div>
    );
};

export default Chat;