import {createSlice} from "@reduxjs/toolkit";
import {StateChat, statusLoading} from "./types";
import { createChatActions, findChatActions, getMessageAction, userChatActions} from "./chat-actions";

const initialState: StateChat = {
    chat: {
        chat: [],
        status: null,
        error: null,
    },
    message: {
        message: [],
        status: null,
        error: null,
    },
    chatUsers: {
        chatUsers: [],
        status: null,
        error: null,
    },
    onlineUsers: {
        onlineUsers: [],
        status: null,
        error: null,
    },
    currentChat: {
        currentChat: null,
        status: null,
        error: null,
    },
    sendMessage: null,
    receivedMessage: null,
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setCurrentChat: (state, action) => {
            state.currentChat.currentChat = action.payload
        },
        setSendMessage: (state, action) => {
            state.sendMessage = action.payload
        },
        setReceivedMessage:(state, action) => {
            state.receivedMessage = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(createChatActions.pending, ({chat}) => {
                chat.status = statusLoading.loading
                chat.error = null
            })
            .addCase(createChatActions.fulfilled, ({chat}, action) => {
                chat.status = statusLoading.loaded
                chat.chat = action.payload
                chat.error = null
            })
            .addCase(createChatActions.rejected, ({chat}, action) => {
                chat.status = statusLoading.wrong
                chat.error = String(action.payload)
            })
            .addCase(userChatActions.pending, ({chat}) => {
                chat.status = statusLoading.loading
                chat.error = null
            })
            .addCase(userChatActions.fulfilled, ({chat}, action) => {
                chat.status = statusLoading.loaded
                chat.chat = action.payload
                chat.error = null
            })
            .addCase(userChatActions.rejected, ({chat}, action) => {
                chat.status = statusLoading.wrong
                chat.error = String(action.payload)
            })
            .addCase(findChatActions.pending, ({chat}) => {
                chat.status = statusLoading.loading
                chat.error = null
            })
            .addCase(findChatActions.fulfilled, ({chat}, action) => {
                chat.status = statusLoading.loaded
                chat.chat = action.payload
                chat.error = null
            })
            .addCase(findChatActions.rejected, ({chat}, action) => {
                chat.status = statusLoading.wrong
                chat.error = String(action.payload)
            })
            // .addCase(addMessageActions.pending, ({message}) => {
            //     message.status = statusLoading.loading
            //     message.error = null
            // })
            // .addCase(addMessageActions.fulfilled, ({message}, action) => {
            //     message.status = statusLoading.loaded
            //     message.message = action.payload
            //     message.error = null
            // })
            // .addCase(addMessageActions.rejected, ({message}, action) => {
            //     message.status = statusLoading.wrong
            //     message.error = String(action.payload)
            // })
            .addCase(getMessageAction.pending, ({message}) => {
                message.status = statusLoading.loading
                message.error = null
            })
            .addCase(getMessageAction.fulfilled, ({message}, action) => {
                message.status = statusLoading.loaded
                message.message = action.payload
                message.error = null
            })
            .addCase(getMessageAction.rejected, ({message}, action) => {
                message.status = statusLoading.wrong
                message.error = String(action.payload)
            })
    }
})

export const {setCurrentChat,setSendMessage,setReceivedMessage} = chatSlice.actions

export default chatSlice.reducer