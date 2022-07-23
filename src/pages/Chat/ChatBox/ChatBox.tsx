import React, {FC, FormEvent, useEffect, useRef, useState} from 'react';
import {useTypeSelector} from "../../../store/store";
import {IMessageData, IOtherData, ISendMessage} from "../../../store/chat/types";
import {_url, add_message, get_message, getUserById} from "../../../service/api";
import {IUser} from "../../../store/user/types";
import {IoMdSend} from "react-icons/io";
import {user} from "../../../store/user/selectorsUser";
import {ChangeMoment} from "../../../utils";
import './chatbox.css'

interface Props {
    chat: IOtherData | null
    currentUser?: string
    receivedMessage: ISendMessage | null
    setSendMessage: ({}:any) => void
}


const ChatBox: FC<Props> = ({currentUser, chat, receivedMessage, setSendMessage}) => {
    const userCurrent = useTypeSelector(user)
    const [userData, setUserData] = useState<IUser | null>(null)
    const [messages, setMessages] = useState<IMessageData[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const scroll = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
        const id = chat?.members.find(id => id !== currentUser)
        const getUserData = async () => {
            try {
                if (id) {
                    const {data} = await getUserById(id)
                    setUserData(data)
                }
            } catch (e) {
                console.log(e)
            }
        }
        chat && getUserData()
    }, [chat, currentUser])


    useEffect(() => {
        const chatId = chat?._id
        const getMessage = async () => {
            const {data} = await get_message(chatId ? chatId : '')
            setMessages(data)
        }
        chat && getMessage()
    }, [chat])

    useEffect(() => {
        if (scroll.current !== null) {
            scroll.current?.scrollIntoView({behavior: "smooth"});
        }
    }, [messages])


    const handleSend = async (e: FormEvent) => {
        e.preventDefault()
        const message = {chatId: chat?._id, sendId: currentUser, text: newMessage,}
        const receiveId = chat?.members.find((id) => id !== currentUser);
        setSendMessage({...message, receiveId})
        try {
            const {data} = await add_message(message);
            setMessages([...messages, data]);
            setNewMessage("");
        } catch {
            console.log("error")
        }
    }
    useEffect(() => {
        receivedMessage && receivedMessage.chatId === chat?._id && setMessages([...messages, receivedMessage]);
    }, [receivedMessage])
    return (
        <div className='containerMyMessage'>
            {chat ?
                <>
                    <div>
                        <div>
                            {userData && userCurrent &&
                                <div className={'avatarControl'}>
                                    <div>
                                        <img className='imgControlChatBox' src={_url + userData.avatar} alt=""/>
                                    </div>
                                    <div>
                                        <img className='imgControlChatBox' src={_url + userCurrent.avatar} alt=""/>
                                    </div>
                                </div>
                            }
                        </div>

                        <div>
                            {messages.map((message) => (
                                <div key={`${message.chatId}__${message.createdAt}`}>
                                    <div
                                        className={message.sendId === currentUser ? "message" : "message own"}>
                                        <div ref={scroll}>{message.text}</div>
                                        <p>{ChangeMoment(String(message.createdAt))}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='containerTextAndButton'>
                        <div className='chatText'>
                            <input
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className='chatInputText'
                                type="text"
                            />
                            <span className='spanIcon'><IoMdSend/></span>
                        </div>
                        <div onClick={handleSend} className='chatButton'>
                            send
                        </div>
                    </div>
                </>
                :
                <div>
                    no chat
                </div>
            }
        </div>
    );
};

export default ChatBox;