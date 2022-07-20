import {createAsyncThunk} from "@reduxjs/toolkit";
import * as api from '../../service/api'
import {IChatDataAction, IFindChat, IMessageData, KnowError} from "./types";


export const createChatActions = createAsyncThunk<null, IChatDataAction, { rejectValue: KnowError }>(
    'chat/createChat', async ({chatData, navigate}, {rejectWithValue}) => {
        try {
            const {data} = await api.create_chat(chatData)
            return data
        } catch (err: any) {
            const error = err.request.response.replace(/['"{}]+/g, '')
            return rejectWithValue(error)
        }
    }
)

export const userChatActions = createAsyncThunk<null, string, { rejectValue: KnowError }>(
    'chat/userChat', async (userId, {rejectWithValue}) => {
        try {
            const {data} = await api.user_chat(userId)
            return data
        } catch (err: any) {
            const error = err.request.response.replace(/['"{}]+/g, '')
            return rejectWithValue(error)
        }
    }
)

export const findChatActions = createAsyncThunk<null, IFindChat, { rejectValue: KnowError }>(
    'chat/findChat', async ({firstId, secondId}, {rejectWithValue}) => {
        try {
            const {data} = await api.find_chat({firstId, secondId})
            return data
        } catch (err: any) {
            const error = err.request.response.replace(/['"{}]+/g, '')
            return rejectWithValue(error)
        }
    }
)

// export const addMessageActions = createAsyncThunk<null, IMessageData, { rejectValue: KnowError }>(
//     'chat/addMessage', async (messageData, {rejectWithValue}) => {
//         try {
//             const {data} = await api.add_message(messageData)
//             return data
//         } catch (err: any) {
//             const error = err.request.response.replace(/['"{}]+/g, '')
//             return rejectWithValue(error)
//         }
//     }
// )
export const getMessageAction = createAsyncThunk<null, string, { rejectValue: KnowError }>(
    'chat/getMessage', async (chatId, {rejectWithValue}) => {
        try {
            const {data} = await api.get_message(chatId)
            return data
        } catch (err: any) {
            const error = err.request.response.replace(/['"{}]+/g, '')
            return rejectWithValue(error)
        }
    }
)