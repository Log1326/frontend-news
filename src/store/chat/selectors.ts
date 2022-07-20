import {RootState} from "../store";
import {createSelector} from "@reduxjs/toolkit";


export const selectorChat = (state: RootState) => state.chat.chat
export const chatSelector = createSelector(
    [selectorChat],
    (chat) => chat
)
export const selectorMessage = (state: RootState) => state.chat.message
export const messageSelector = createSelector(
    [selectorMessage],
    (message) => message
)
export const selectorChatUsers = (state:RootState) => state.chat.chatUsers
export const chatUsersSelector = createSelector(
    [selectorChatUsers],
    (chatUsers) => chatUsers
)


export const selectorOnlineUsers = (state:RootState) => state.chat.onlineUsers
export const onlineUsersSelector = createSelector(
    [selectorOnlineUsers],
    (onlineUsers) => onlineUsers
)



export const selectorCurrentChat = (state:RootState) => state.chat.currentChat
export const currentChatSelector = createSelector(
    [selectorCurrentChat],
    (currentChat) => currentChat
)


export const selectorSendMessage = (state:RootState) => state.chat.sendMessage
export const sendMessageSelector = createSelector(
    [selectorSendMessage],
    (sendMessage) => sendMessage
)


export const selectorReceivedMessage = (state:RootState) => state.chat.receivedMessage
export const receivedMessageSelector = createSelector(
    [selectorReceivedMessage],
    (receivedMessage) => receivedMessage
)