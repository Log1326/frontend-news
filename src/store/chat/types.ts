import {NavigateFunction} from "react-router-dom";

export interface StateChat {
    chat: IChat
    message: IMessage
    sendMessage: ISendMessage | null
    receivedMessage: ISendMessage | null
    chatUsers: IChatUsers
    onlineUsers: IOnlineUsers
    currentChat: ICurrentChat
}

export interface ICurrentChat extends IOptions {
    currentChat: IOtherData | null
}

export interface IOnlineUsers extends IOptions {
    onlineUsers: []
}

export interface IChatUsers extends IOptions {
    chatUsers: []
}

export interface IMessage extends IOptions {
    message: [] | null
}

export interface IChat extends IOptions {
    chat: IOtherData[] | null,
}

export interface ISendMessage {
    chatId: string
    sendId: string
    text: string
}

export interface IOtherData{
    createdAt:string
    updatedAt:string
    members: []
    _id: string
}

export interface IOptions {
    status: statusLoading | null,
    error: string | null,
}

export enum statusLoading {
    loading = 'loading',
    loaded = 'completed',
    wrong = 'wrong'
}

export interface KnowError {
    error: string
}

export interface IChatData {
    sendId: string
    receiveId: string
}

export interface IChatDataAction {
    chatData: {
        sendId: string
        receiveId: string
    }
    navigate: NavigateFunction
}


export interface IMessageData {
    chatId: string | null
    sendId: string | null
    text: string
    createdAt?:string
}

export interface IFindChat {
    firstId: string
    secondId: string
}


export interface IOnline {
    socketId: string
    userId: string
}

export interface IReceiveMessage {
    chatId: string
    receiveId: string
    sendId: string
    text: string
}
