import React, {FC, useEffect, useRef, useState} from 'react';
import './chat.css'
import {useTypeSelector} from "../../store/store";
import Conversation from "./Conversation/Conversation";
import {user} from "../../store/user/selectorsUser";
import ChatBox from "./ChatBox/ChatBox";
import {io, Socket} from "socket.io-client";
import {IMessageData, IOnline, IOtherData, IReceiveMessage} from "../../store/chat/types";
import {user_chat} from "../../service/api";


const Chat: FC = () => {
    const userData = useTypeSelector(user)
    const socket = useRef<Socket>();


    const [chats, setChats] = useState<IOtherData[]>([]);
    const [currentChat, setCurrentChat] = useState<IOtherData | null>(null);
    const [sendMessage, setSendMessage] = useState<IMessageData | null>(null);
    const [receivedMessage, setReceivedMessage] = useState<IReceiveMessage | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<IOnline[]>([]);

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
        socket.current.on("get-users", (users) => {
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
            setReceivedMessage(data)
        })
    }, [sendMessage]);

    const checkOnlineStatus = (item: IOtherData): boolean => {
        const chatMember = item.members.find((member: string) => member !== userData?._id);
        const online = onlineUsers.find((user) => user.userId === chatMember);
        return !!online;
    };
    console.log(sendMessage)
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